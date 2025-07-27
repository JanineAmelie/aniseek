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
 * Sanitize user input for search queries and other user-provided text
 * Removes HTML tags, dangerous characters, and excessive whitespace
 * Use this function on blur or form submission, not on every keystroke
 */
export const sanitizeUserInput = (input: string): string => {
  if (!input || typeof input !== "string") {
    return "";
  }

  // First strip any HTML tags
  let sanitized = sanitizeHtml(input, {
    allowedTags: [], // No HTML tags allowed
    allowedAttributes: {}, // No attributes allowed
  });

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, " ");

  // Limit length to prevent extremely long inputs
  if (sanitized.length > 500) {
    sanitized = sanitized.substring(0, 500).trim();
  }

  return sanitized.trim();
};

/**
 * Basic input validation for real-time typing
 * Only performs basic length checks without heavy sanitization
 */
export const validateUserInput = (input: string): string => {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Only limit length for real-time validation
  if (input.length > 500) {
    return input.substring(0, 500);
  }

  return input;
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
