"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bolt as BoltIcon } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import styled from "styled-components";
import { Genres } from "@/components/AnimeDetails/Genres";
import { ErrorSection } from "@/components/ui/ErrorSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { SearchSection } from "@/components/ui/SearchSection";
import { TrendingSection } from "@/components/ui/TrendingSection";
import { hardCodedGenres } from "@/constants/genres";
import { text } from "@/constants/text";
import { useTrendingAnime } from "@/hooks/api/useTrendingAnime";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { sanitizeUserInput } from "@/utils";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { navigateToAnime } = useAppNavigation();

  const { data, loading, error, refetch } = useTrendingAnime(1, 4);

  // Get anime list from API response, defaulting to empty array
  const rawAnimeList = data?.Page?.media || [];
  const animeList = rawAnimeList.filter(anime => anime !== null);

  return (
    <PageContainer>
      <HeroSection />

      <ContentContainer maxWidth="lg">
        <SearchSection
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearch={handleSearch}
        />

        <GenreSection>
          <SectionTitle
            variant="h6"
            gutterBottom
          >
            <TitleIcon />
            {text.common.findAnimeByGenre}
          </SectionTitle>
          <Genres
            handleGenreClick={handleGenreClick}
            genres={hardCodedGenres.map(
              genre => `${genre.emoji} ${genre.text}`
            )}
          />
        </GenreSection>

        {error ? (
          <ErrorSection
            title={text.errors.trendingAnime.title}
            message={text.errors.trendingAnime.message}
            onRetry={handleRetry}
          />
        ) : (
          <TrendingSection
            isLoading={loading}
            animeList={animeList}
            onCardClick={handleCardClick}
          />
        )}
      </ContentContainer>
    </PageContainer>
  );

  function handleSearch(query?: string) {
    // Use the provided query or fall back to the current searchQuery state
    const queryToUse = query ?? searchQuery;
    const sanitizedQuery = sanitizeUserInput(queryToUse);
    if (sanitizedQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(sanitizedQuery.trim())}`);
    } else {
      router.push("/search");
    }
  }

  function handleSearchQueryChange(query: string) {
    // Allow free typing, only basic validation
    const validatedQuery = query.length > 500 ? query.substring(0, 500) : query;
    setSearchQuery(validatedQuery);
  }

  function handleGenreClick(genreWithEmoji: string) {
    // Find the matching genre from our hardcoded list to get the proper search term
    const genre = hardCodedGenres.find(
      g => `${g.emoji} ${g.text}` === genreWithEmoji
    );
    if (genre) {
      router.push(`/search?genre=${encodeURIComponent(genre.text)}`);
    }
  }

  function handleCardClick(anime: NonNullable<(typeof animeList)[number]>) {
    navigateToAnime(anime.id);
  }

  function handleRetry() {
    refetch();
  }
}

const PageContainer = styled(Box)`
  min-height: 100vh;
`;

const ContentContainer = styled(Container)`
  padding: 32px 0;
`;

const GenreSection = styled(Box)`
  margin-bottom: 48px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 600;
`;

const TitleIcon = styled(BoltIcon)`
  margin-right: 16px;
  vertical-align: middle;
  color: ${({ theme }) => theme.palette.primary.main};
`;
