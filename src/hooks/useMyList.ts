import { useState, useEffect, useCallback } from "react";
import { MyListStorage } from "@/utils/localStorage";
import { Anime, UserAnimeEntry } from "@/types/anime";

export const useMyList = () => {
  const [myList, setMyList] = useState<UserAnimeEntry[]>([]);

  useEffect(() => {
    setMyList(MyListStorage.getMyList());
  }, []);

  const addToMyList = useCallback(
    (anime: Anime, userScore?: number, status?: UserAnimeEntry["status"]) => {
      MyListStorage.addToMyList(anime, userScore, status);
      setMyList(MyListStorage.getMyList());
    },
    []
  );

  const removeFromMyList = useCallback((animeId: number) => {
    MyListStorage.removeFromMyList(animeId);
    setMyList(MyListStorage.getMyList());
  }, []);

  const updateMyListEntry = useCallback(
    (animeId: number, updates: Partial<UserAnimeEntry>) => {
      MyListStorage.updateMyListEntry(animeId, updates);
      setMyList(MyListStorage.getMyList());
    },
    []
  );

  const isInMyList = useCallback((animeId: number): boolean => {
    return MyListStorage.isInMyList(animeId);
  }, []);

  const getUserRating = useCallback((animeId: number): number | undefined => {
    return MyListStorage.getUserRating(animeId);
  }, []);

  const updateUserRating = useCallback(
    (animeId: number, rating: number) => {
      updateMyListEntry(animeId, { userScore: rating });
    },
    [updateMyListEntry]
  );

  return {
    myList,
    addToMyList,
    removeFromMyList,
    updateMyListEntry,
    isInMyList,
    getUserRating,
    updateUserRating,
  };
};
