"use client";

import React from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { TrendingUp as TrendingIcon } from "@mui/icons-material";
import { AnimeCard } from "@/components/AnimeCard/AnimeCard";
import { Anime } from "@/types/anime";
import { text } from "@/constants/text";
import styled from "styled-components";

type TrendingSectionProps = {
  isLoading: boolean;
  animeList: Anime[];
  onCardClick: (anime: Anime) => void;
  onAddToList: (anime: Anime) => void;
  onAddToComparison: (anime: Anime) => void;
};

export function TrendingSection({
  isLoading,
  animeList,
  onCardClick,
  onAddToList,
  onAddToComparison,
}: Readonly<TrendingSectionProps>) {
  const skeletonItems = Array.from(new Array(4), (_, index) => ({
    id: `skeleton-${index}-${Date.now()}`,
  }));

  return (
    <SectionContainer>
      <SectionTitle variant="h5">
        <TitleIcon />
        {text.trending.title}
      </SectionTitle>
      <ContentGrid>
        {isLoading
          ? skeletonItems.map((item) => (
              <GridItem key={item.id}>
                <StyledSkeleton variant="rectangular" height={400} />
              </GridItem>
            ))
          : animeList.map((anime) => (
              <GridItem key={anime.id}>
                <AnimeCard
                  anime={anime}
                  onCardClick={onCardClick}
                  onAddToList={onAddToList}
                  onAddToComparison={onAddToComparison}
                />
              </GridItem>
            ))}
      </ContentGrid>
    </SectionContainer>
  );
}

const SectionContainer = styled(Box)`
  margin-bottom: 48px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 600;
`;

const TitleIcon = styled(TrendingIcon)`
  margin-right: 16px;
  vertical-align: middle;
`;

const ContentGrid = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const GridItem = styled(Box)<{ $isLoading?: boolean }>`
  flex: 1 0 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex: 1 0 45%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex: 1 0 22%;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  border-radius: 16px;
`;
