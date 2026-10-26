import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// OpenWeather gives a UTC offset in seconds; shift and format as UTC to get the city's wall clock.
export function cityTime(
  dt: number,
  tz: number,
  opts: Intl.DateTimeFormatOptions
) {
  return new Date((dt + tz) * 1000).toLocaleString("en-GB", {
    ...opts,
    timeZone: "UTC",
  });
}
