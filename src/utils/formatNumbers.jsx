import React from "react";

/**
 * Highlights any number, percentage, currency ($50K), or fraction (98/100)
 * in a distinctive highlight color.
 */
export function formatNumbers(text) {
  if (typeof text !== "string") return text;

  // Regex to match digits (Western 0-9 and Arabic-Indic ٠-٩), currencies ($50K), fractions (98/100), and comma-separated numbers (50,000)
  const regex = /([0-9\u0660-\u0669]+(?:[,\.][0-9\u0660-\u0669]+)*(?:\/[0-9\u0660-\u0669]+)*%?|\$[0-9\u0660-\u0669]+[kK]?)/g;

  const parts = text.split(regex);
  if (parts.length <= 1) return text;

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} className="number-highlight">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default formatNumbers;
