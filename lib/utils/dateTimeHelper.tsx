import { toZonedTime } from "date-fns-tz";
import { isValid, format } from "date-fns";

// format UTC date to timezone date
function formatDateToTimezone(date: string | Date, dateFormat = "dd MMM yyyy"):string {
  if (!date || !isValid(new Date(date))) {
    return "";
  }
  // Get the current timezone from the browser
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(new Date(date), timeZone);
  if(isValid(zonedDate)){
      const formattedDate = format(zonedDate, dateFormat);
  return formattedDate;
  }
  return ""

}

// compare expiry date with current date, return whether expiry
function checkIfExpiry(date: string | Date): boolean {
  const now = new Date();
  if (!date || !isValid(new Date(date))) {
    return true;
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert UTC time to NZT
  const zonedDate = toZonedTime(now, timeZone);
  const zonedEndDate = toZonedTime(date, timeZone);
  zonedEndDate.setMonth(zonedEndDate.getMonth() - 1);
  return zonedEndDate <= zonedDate;
}

export { formatDateToTimezone, checkIfExpiry };
