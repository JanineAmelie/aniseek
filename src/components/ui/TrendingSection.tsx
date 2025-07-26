"use client";

import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { TrendingUp as TrendingIcon } from "@mui/icons-material";
import { AnimeCard } from "@/components/anime/AnimeCard";
import { Anime } from "@/types/anime";
import { text } from "@/constants/text";

type TrendingSectionProps = {
  isLoading: boolean;
  animeList: Anime[];
  onCardClick: (anime: Anime) => void;
  onAddToList: (anime: Anime) => void;
  onAddToComparison: (anime: Anime) => void;
};

export const TrendingSection = ({
  isLoading,
  animeList,
  onCardClick,
  onAddToList,
  onAddToComparison,
}: TrendingSectionProps) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        <TrendingIcon sx={{ mr: 2, verticalAlign: "middle" }} />
        {text.trending.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {isLoading
          ? Array.from(new Array(4)).map((_, index) => (
              <Box
                key={`trending-skeleton-${index}`}
                sx={{ flex: { xs: "1 0 100%", sm: "1 0 45%", md: "1 0 22%" } }}
              >
                <Skeleton
                  variant="rectangular"
                  height={400}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
            ))
          : animeList.map((anime) => (
              <Box
                key={anime.id}
                sx={{ flex: { xs: "1 0 100%", sm: "1 0 45%", md: "1 0 22%" } }}
              >
                <AnimeCard
                  anime={anime}
                  onCardClick={onCardClick}
                  onAddToList={onAddToList}
                  onAddToComparison={onAddToComparison}
                />
              </Box>
            ))}
      </Box>
    </Box>
  );
};
