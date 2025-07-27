// Quick test to verify sanitization behavior
import { sanitizeUserInput, validateUserInput } from "./src/utils/sanitizeHtml";

console.log("=== Testing sanitization behavior ===");

// Test cases with potentially problematic input
const testCases = [
  "normal search query",
  "<script>alert('xss')</script>search",
  "search with   multiple   spaces",
  "<img src=x onerror=alert(1)>anime",
  "very    long    query   " + "a".repeat(600),
  "<b>bold</b> text with <i>italics</i>",
  "&lt;script&gt;safe&lt;/script&gt;",
];

console.log("\n1. validateUserInput (for real-time typing):");
testCases.forEach((input, i) => {
  const result = validateUserInput(input);
  console.log(
    `${i + 1}. "${input.substring(0, 50)}..." -> "${result.substring(0, 50)}..."`
  );
});

console.log("\n2. sanitizeUserInput (for onBlur/submit):");
testCases.forEach((input, i) => {
  const result = sanitizeUserInput(input);
  console.log(
    `${i + 1}. "${input.substring(0, 50)}..." -> "${result.substring(0, 50)}..."`
  );
});

console.log("\n=== Performance comparison ===");
const longInput =
  "<script>alert('test')</script>" + "search query ".repeat(100);

console.time("validateUserInput (lightweight)");
for (let i = 0; i < 1000; i++) {
  validateUserInput(longInput);
}
console.timeEnd("validateUserInput (lightweight)");

console.time("sanitizeUserInput (heavy)");
for (let i = 0; i < 1000; i++) {
  sanitizeUserInput(longInput);
}
console.timeEnd("sanitizeUserInput (heavy)");
