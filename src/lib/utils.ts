export const parseDate = (date: Date, is24Hours = false): string => {
  const hours = is24Hours
    ? date.getHours().toString().padStart(2, "0")
    : (date.getHours() % 12 || 12).toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = is24Hours ? "" : date.getHours() >= 12 ? " PM" : " AM";

  return `${hours}:${minutes}:${seconds}${ampm}`;
};
