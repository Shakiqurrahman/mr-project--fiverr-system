import { useState, useEffect } from 'react';

// Custom hook to return formatted local date and time
const useLocalDateTime = (dateOptions = {}, timeOptions = {}) => {
  const [localDate, setLocalDate] = useState('');
  const [localTime, setLocalTime] = useState('');

  // Function to update date and time
  const updateDateTime = () => {
    const date = new Date();

    // Format the date using provided options
    const formattedDate = date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...dateOptions,
    });

    // Format the time using provided options
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...timeOptions,
    });

    setLocalDate(formattedDate);
    setLocalTime(formattedTime);
  };

  // Update every minute using setInterval
  useEffect(() => {
    updateDateTime();

    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dateOptions, timeOptions]);

  return { localDate, localTime };
};

export default useLocalDateTime;
