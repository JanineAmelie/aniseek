"use client";

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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { navigateToAnime } = useAppNavigation();

  const { data, loading, error, refetch } = useTrendingAnime(1, 4);

  // Extract anime list from the GraphQL response and filter out null values
  const animeList = (data?.Page?.media || []).filter(
    (anime): anime is NonNullable<typeof anime> => anime !== null
  );

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleCardClick = (anime: NonNullable<typeof animeList>[number]) => {
    navigateToAnime(anime.id);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <PageContainer>
      <HeroSection />

      <ContentContainer maxWidth="lg">
        <SearchSection
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
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
