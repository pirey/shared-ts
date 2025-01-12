import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistanceToNow,
  isToday,
  set,
} from "date-fns";
import { id } from "date-fns/locale";

export function formatDistance(date?: Date) {
  try {
    return formatDistanceToNow(date ?? new Date(), { locale: id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return date?.toLocaleDateString();
  }
}

export function formatDate(date?: Date) {
  try {
    return format(date ?? new Date(), "P", { locale: id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return date?.toLocaleDateString();
  }
}

export function formatTime(date?: Date) {
  try {
    return format(date ?? new Date(), "H:mm:ss", { locale: id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return date?.toLocaleTimeString();
  }
}

/**
 * return time only if it is today
 */
export function formatTimeOrDate(date?: Date) {
  if (isToday(date ?? new Date())) {
    return formatTime(date);
  }
  return formatDate(date);
}

export function formatDateTime(date?: Date) {
  try {
    return format(date ?? new Date(), "P H:mm", { locale: id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return date?.toLocaleString();
  }
}

export function setTime(date: Date, time: string) {
  const timeValue = time.split(":");
  if (timeValue.length < 2)
    throw Error("Invalid: time value must be in this format 'hours:minutes'");
  const [hours, minutes, milliseconds] = timeValue;
  return set(date, {
    hours: hours ? Number(hours) : undefined,
    minutes: minutes ? Number(minutes) : undefined,
    milliseconds: milliseconds ? Number(milliseconds) : undefined,
  });
}

export function getRemainingTime(targetDate: Date) {
  const now = new Date();
  const hours = String(differenceInHours(targetDate, now)).padStart(2, "0");
  const minutes = String(differenceInMinutes(targetDate, now) % 60).padStart(
    2,
    "0",
  );
  const seconds = String(differenceInSeconds(targetDate, now) % 60).padStart(
    2,
    "0",
  );
  return {
    hours,
    minutes,
    seconds,
  };
}
