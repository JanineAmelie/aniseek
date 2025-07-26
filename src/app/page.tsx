'use client';

import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { HeroSection } from '@/components/ui/HeroSection';
import { SearchSection } from '@/components/ui/SearchSection';
import { GenreSection } from '@/components/ui/GenreSection';
import { StatsSection } from '@/components/ui/StatsSection';
import { TrendingSection } from '@/components/ui/TrendingSection';
import { CallToActionSection } from '@/components/ui/CallToActionSection';
import { Anime } from '@/types/anime';
import { mockPopularAnime, genres } from '@/constants/mockData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenreClick = (genreName: string) => {
    setSelectedGenre(selectedGenre === genreName ? null : genreName);
    // TODO: Implement genre filtering
  };

  const handleSearch = () => {
    setIsLoading(true);
    // TODO: Implement search functionality
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleCardClick = (anime: Anime) => {
    console.log('Clicked:', anime.title.english);
    // TODO: Navigate to anime details page
  };

  const handleAddToList = (anime: Anime) => {
    console.log('Added to list:', anime.title.english);
    // TODO: Implement add to list functionality
  };

  const handleAddToComparison = (anime: Anime) => {
    console.log('Added to comparison:', anime.title.english);
    // TODO: Implement add to comparison functionality
  };

  const handleExploreClick = () => {
    console.log('Explore anime clicked');
    // TODO: Navigate to explore page
  };

  const handleViewListClick = () => {
    console.log('View my list clicked');
    // TODO: Navigate to my list page
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
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

        <StatsSection />

        <TrendingSection
          isLoading={isLoading}
          animeList={mockPopularAnime}
          onCardClick={handleCardClick}
          onAddToList={handleAddToList}
          onAddToComparison={handleAddToComparison}
        />

        <CallToActionSection
          onExploreClick={handleExploreClick}
          onViewListClick={handleViewListClick}
        />
      </Container>
    </Box>
  );
}
