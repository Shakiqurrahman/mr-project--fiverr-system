import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  isPast,
  parseISO,
} from "date-fns";

// Function to get time status
export const getTimeStatus = (deadline) => {
  const now = new Date();
  const eventDate = parseISO(deadline); // Convert string to date

  if (isPast(eventDate)) {
    // time is late
    const yearsLate = differenceInYears(now, eventDate);
    const monthsLate = differenceInMonths(now, eventDate) % 12;
    const daysLate = differenceInDays(now, eventDate) % 30;
    const hoursLate = differenceInHours(now, eventDate) % 24;
    const minutesLate = differenceInMinutes(now, eventDate) % 60;

    let overdueText = "";

    if (yearsLate >= 1) {
      overdueText = `${yearsLate} year${yearsLate > 1 ? "s" : ""} late`;
    } else if (monthsLate >= 1) {
      overdueText = `${monthsLate} month${monthsLate > 1 ? "s" : ""} late`;
    } else if (daysLate >= 1) {
      overdueText = `${daysLate} day${daysLate > 1 ? "s" : ""} late`;
    } else if (hoursLate >= 1) {
      overdueText = `${hoursLate}h ${minutesLate}min late`;
    } else {
      overdueText = `${minutesLate}min late`;
    }

    return {
      time: overdueText,
      color: "red",
    };
  } else {
    // time is remaining
    const timeRemaining = eventDate - now;

    const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60)); // Total hours remaining
    const days = Math.floor(totalHours / 24); // Calculate remaining days
    const hours = totalHours % 24; // Remaining hours
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    ); // Remaining minutes

    let displayTime;
    if (days > 0) {
      displayTime = `${days}d - ${hours}h`;
    } else {
      displayTime = `${hours}h - ${minutes} min`;
    }

    const color = totalHours < 12 ? "red" : "black"; // Red if less than 12 hours

    return {
      time: displayTime,
      color: color,
    };
  }
};
