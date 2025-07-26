"use client";

import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { HeroSection } from "@/components/ui/HeroSection";
import { SearchSection } from "@/components/ui/SearchSection";
import { GenreSection } from "@/components/ui/GenreSection";
import { TrendingSection } from "@/components/ui/TrendingSection";
import { Anime } from "@/types/anime";
import { mockPopularAnime, genres } from "@/constants/mockData";

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

  const handleAddToList = (anime: Anime) => {
    console.log("Added to list:", anime.title.english);
    // TODO: Implement add to list functionality
  };

  const handleAddToComparison = (anime: Anime) => {
    console.log("Added to comparison:", anime.title.english);
    // TODO: Implement add to comparison functionality
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
          onAddToList={handleAddToList}
          onAddToComparison={handleAddToComparison}
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
