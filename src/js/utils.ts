/** Converts seconds to a formatted time string (e.g., "mm:ss"). */
export function convertToMin(seconds: number | string) {
  const secs = typeof seconds === "number" 
    ? seconds 
    : parseFloat(seconds);

  if (isNaN(secs) || secs < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(secs / 60);
  const remainingSeconds = Math.round(secs % 60); // Round to the nearest second

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

/** Truncates a text string to a specified length with an ellipsis. */
export function textAbstract(text: string, length: number, ellipsis = "...") {
  if (text.length <= length) return text;
  if (text === null) return "";

  let abstractedText = text.substring(0, length);
  const lastWord = abstractedText.lastIndexOf(" "); // Check if any word was cut in between

  abstractedText = abstractedText.substring(0, lastWord) + ellipsis;

  return abstractedText;
}
