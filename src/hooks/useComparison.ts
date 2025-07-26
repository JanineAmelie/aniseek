import { useState, useEffect, useCallback } from "react";
import { ComparisonStorage } from "@/utils/localStorage";

export const useComparison = () => {
  const [comparisonList, setComparisonList] = useState<number[]>([]);

  useEffect(() => {
    setComparisonList(ComparisonStorage.getComparisonList());
  }, []);

  const addToComparison = useCallback((animeId: number): boolean => {
    const success = ComparisonStorage.addToComparison(animeId);
    if (success) {
      setComparisonList(ComparisonStorage.getComparisonList());
    }
    return success;
  }, []);

  const removeFromComparison = useCallback((animeId: number) => {
    ComparisonStorage.removeFromComparison(animeId);
    setComparisonList(ComparisonStorage.getComparisonList());
  }, []);

  const clearComparison = useCallback(() => {
    ComparisonStorage.clearComparison();
    setComparisonList([]);
  }, []);

  const isInComparison = useCallback((animeId: number): boolean => {
    return ComparisonStorage.isInComparison(animeId);
  }, []);

  const canAddToComparison = useCallback((): boolean => {
    return ComparisonStorage.canAddToComparison();
  }, []);

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddToComparison,
  };
};
