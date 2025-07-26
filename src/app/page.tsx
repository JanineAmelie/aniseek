"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import styled from "styled-components";
import { GenreSection } from "@/components/ui/GenreSection";
import { HeroSection } from "@/components/ui/HeroSection";
import { SearchSection } from "@/components/ui/SearchSection";
import { TrendingSection } from "@/components/ui/TrendingSection";
import { genres, mockPopularAnime } from "@/constants/mockData";
import { Anime } from "@/types/anime";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGenreClick = (genreName: string) => {
    const newSelectedGenre = selectedGenre === genreName ? null : genreName;
    setSelectedGenre(newSelectedGenre);
    // TODO: Implement genre filtering
  };

  const handleSearch = () => {
    setIsLoading(true);
    // TODO: Implement search functionality
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleCardClick = (anime: Anime) => {
    router.push(`/anime/${anime.id}`);
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

        <GenreSection
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreClick={handleGenreClick}
        />

        <TrendingSection
          isLoading={isLoading}
          animeList={mockPopularAnime}
          onCardClick={handleCardClick}
        />
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
