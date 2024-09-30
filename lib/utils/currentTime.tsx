'use client'

import { useState, useEffect } from "react";
import { formatDateToTimezone} from "./dateTimeHelper";
//get current time
export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format date and time
      const formattedTime = formatDateToTimezone(now, "dd MMM yyyy, HH:mm");
      // let timezoneAbbr = Intl.DateTimeFormat('en', {timeZoneName: 'short'})?.formatToParts()?.find(p => p.type === 'timeZoneName')?.value
      setCurrentTime(`Current time ${formattedTime}`);
    };

    // Update the time immediately and set an interval to update every minute
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { currentTime };
};
