import { getAllCountries } from "countries-and-timezones";
import { DateTime } from "luxon";

export const TimeZoneConverter = (country) => {
  try {
    // Get country information based on the country name
    const allCountries = getAllCountries();
    const countriesArray = Object.values(allCountries);
    const countryInfo = countriesArray.find(
      (c) => c.name.toLowerCase() === country?.toLowerCase(),
    );
    if (countryInfo && countryInfo.timezones) {
      // Use the first timezone if there are multiple
      const timezone = countryInfo.timezones[0];

      // Get current UTC time
      const currentDateTimeUTC = DateTime.utc();

      // Convert UTC time to the country's local time
      const localTime = currentDateTimeUTC.setZone(timezone);

      // Format time and date separately, including the year in the date
      const time = localTime.toFormat("hh:mm a"); // e.g., '07:13 PM'
      const date = localTime.toFormat("MMM d, yyyy"); // e.g., 'Nov 7, 2024'

      // Return an object with time and date separately
      return { time, date };
    } else {
      throw new Error("Could not find timezone for this country");
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
};
