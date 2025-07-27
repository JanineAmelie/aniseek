import { text } from "@/constants/text";
import { Media } from "@/types/anime";
import { formatYear } from "./formatYear";

// Test data builders for better maintainability and readability
const createAnimeWithDates = (
  startYear?: number | null | undefined,
  endYear?: number | null | undefined
): Media => ({
  id: 1,
  isFavourite: false,
  isFavouriteBlocked: false,
  startDate:
    startYear !== undefined
      ? {
          year: startYear,
          month: null,
          day: null,
        }
      : null,
  endDate:
    endYear !== undefined
      ? {
          year: endYear,
          month: null,
          day: null,
        }
      : null,
});

const createAnimeWithNoDate = (): Media => ({
  id: 1,
  isFavourite: false,
  isFavouriteBlocked: false,
  startDate: null,
  endDate: null,
});

describe("formatYear", () => {
  describe("when anime has valid year data", () => {
    it("should return single year when only start year exists", () => {
      // Arrange
      const anime = createAnimeWithDates(2023);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2023");
    });

    it("should return single year when start and end years are identical", () => {
      // Arrange
      const anime = createAnimeWithDates(2023, 2023);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2023");
    });

    it("should return year range when start and end years differ", () => {
      // Arrange
      const anime = createAnimeWithDates(2020, 2024);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2020 - 2024");
    });

    it("should treat year zero as valid and return it", () => {
      // Arrange
      const anime = createAnimeWithDates(0);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("0");
    });

    it("should handle negative years correctly", () => {
      // Arrange
      const anime = createAnimeWithDates(-100);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("-100");
    });

    it("should handle large year values", () => {
      // Arrange
      const anime = createAnimeWithDates(9999, 10000);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("9999 - 10000");
    });

    it("should ignore null end year and return start year only", () => {
      // Arrange
      const anime = createAnimeWithDates(2023, null);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2023");
    });

    it("should ignore undefined end year and return start year only", () => {
      // Arrange
      const anime = createAnimeWithDates(2023);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2023");
    });

    it("should handle edge case of year 0 in both start and end dates", () => {
      // Arrange
      const anime = createAnimeWithDates(0, 0);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("0");
    });

    it("should handle range including year 0", () => {
      // Arrange
      const anime = createAnimeWithDates(1, 0);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("1 - 0");
    });
  });

  describe("when anime has invalid or missing year data", () => {
    it("should return unknown text when start year is null", () => {
      // Arrange
      const anime = createAnimeWithDates(null);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe(text.common.unknown);
    });

    it("should return unknown text when start year is undefined", () => {
      // Arrange
      const anime = createAnimeWithDates();

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe(text.common.unknown);
    });

    it("should return unknown text when no date information exists", () => {
      // Arrange
      const anime = createAnimeWithNoDate();

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe(text.common.unknown);
    });
  });

  describe("realistic anime scenarios", () => {
    it("should format ongoing anime (One Piece example)", () => {
      // Arrange - One Piece started in 1999 and is still ongoing
      const anime = createAnimeWithDates(1999);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("1999");
    });

    it("should format completed multi-year anime (Dragon Ball Z example)", () => {
      // Arrange - Dragon Ball Z aired from 1989 to 1996
      const anime = createAnimeWithDates(1989, 1996);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("1989 - 1996");
    });

    it("should format single-season anime", () => {
      // Arrange - Typical seasonal anime that aired within one year
      const anime = createAnimeWithDates(2019, 2019);

      // Act
      const result = formatYear(anime);

      // Assert
      expect(result).toBe("2019");
    });
  });
});
