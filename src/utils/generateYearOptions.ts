// Helper function to generate year options
export function generateYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear + 1;
  const endYear = 1960;

  return Array.from(
    { length: startYear - endYear + 1 },
    (_, i) => startYear - i
  );
}
