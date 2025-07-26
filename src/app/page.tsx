"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import styled from "styled-components";
import { ErrorSection } from "@/components/ui/ErrorSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { SearchSection } from "@/components/ui/SearchSection";
import { TrendingSection } from "@/components/ui/TrendingSection";
import { useTrendingAnime } from "@/hooks/api/useTrendingAnime";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Use the trending anime hook
  const { data, loading, error, refetch } = useTrendingAnime(1, 6);

  // Extract anime list from the GraphQL response and filter out null values
  const animeList = (data?.Page?.media || []).filter(
    (anime): anime is NonNullable<typeof anime> => anime !== null
  );

  const handleSearch = () => {
    // TODO: Implement search functionality
  };

  const handleCardClick = (anime: NonNullable<typeof animeList>[number]) => {
    router.push(`/anime/${anime.id}`);
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

        {error ? (
          <ErrorSection
            title="Failed to load trending anime"
            message="We couldn't fetch the latest trending anime. Please check your connection and try again."
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
