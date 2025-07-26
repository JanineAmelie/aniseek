import React from "react";
import { SearchOff as NoResultsIcon } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "styled-components";
import { AnimeCard } from "@/components/AnimeCard";
import { text } from "@/constants/text";
import { SearchAnimeQuery } from "@/types/anime";

type AnimeFromSearchQuery = NonNullable<
  NonNullable<SearchAnimeQuery["Page"]>["media"]
>[number];

type SearchResultsProps = {
  isLoading: boolean;
  results: NonNullable<NonNullable<SearchAnimeQuery["Page"]>["media"]>;
  onAnimeClick: (anime: NonNullable<AnimeFromSearchQuery>) => void;
  hasQuery: boolean;
  totalResults: number;
};

export function SearchResults({
  isLoading,
  results,
  onAnimeClick,
  hasQuery,
  totalResults,
}: Readonly<SearchResultsProps>) {
  // Loading state
  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress size={40} />
        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          Searching...
        </Typography>
      </LoadingContainer>
    );
  }

  // No search query
  if (!hasQuery) {
    return (
      <EmptyStateContainer>
        <NoResultsIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
        <Typography
          variant="h6"
          color="text.secondary"
        >
          {text.search.results.noQuery}
        </Typography>
      </EmptyStateContainer>
    );
  }

  // No results found
  if (results.length === 0) {
    return (
      <EmptyStateContainer>
        <NoResultsIcon sx={{ fontSize: 64, opacity: 0.3, mb: 2 }} />
        <Typography
          variant="h6"
          color="text.secondary"
        >
          {text.search.results.noResults}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Try adjusting your search terms or filters
        </Typography>
      </EmptyStateContainer>
    );
  }

  // Format results count
  const resultsCountText =
    totalResults === 1
      ? text.search.results.resultsCount.single
      : text.search.results.resultsCount.multiple.replace(
          "{count}",
          totalResults.toLocaleString()
        );

  return (
    <ResultsContainer>
      <ResultsHeader>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          {resultsCountText}
        </Typography>
      </ResultsHeader>

      <AnimeGrid>
        {results.map(anime => {
          if (!anime) {
            return null;
          }

          return (
            <GridItem key={anime.id}>
              <AnimeCard
                anime={anime}
                onCardClick={onAnimeClick}
              />
            </GridItem>
          );
        })}
      </AnimeGrid>
    </ResultsContainer>
  );
}

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
`;

const EmptyStateContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  text-align: center;
`;

const ResultsContainer = styled(Box)`
  width: 100%;
`;

const ResultsHeader = styled(Box)`
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;

const AnimeGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.lg}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GridItem = styled(Box)`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;
