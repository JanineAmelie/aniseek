import sanitizeHtml from "sanitize-html";
import { text } from "@/constants/text";

/**
 * Strip all HTML tags and return clean plain text
 * Uses sanitize-html to safely remove all HTML tags
 * Works on both client and server side (Next.js SSR compatible)
 */
export const stripHtmlToText = (html: string): string => {
  if (!html) {
    return "";
  }

  return sanitizeHtml(html, {
    allowedTags: [], // No HTML tags allowed
    allowedAttributes: {}, // No attributes allowed
  }).trim();
};

/**
 * Strip HTML and truncate text content
 */
export const stripHtmlAndTruncate = (
  html: string,
  maxLength: number = 150
): string => {
  if (!html) {
    return "";
  }

  const plainText = stripHtmlToText(html);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? `${truncated.substring(0, lastSpaceIndex)}${text.common.ellipsis}`
    : `${truncated}${text.common.ellipsis}`;
};
