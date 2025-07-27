"use client";

import React, { Suspense } from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { SearchFilters, SearchResults } from "@/components/Search";
import { ErrorSection } from "@/components/ui/ErrorSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchSection } from "@/components/ui/SearchSection";
import { text } from "@/constants/text";
import { useSearchAPI, useSearchState, useSearchURL } from "@/hooks/search";
import { useAppNavigation } from "@/hooks/useAppNavigation";

function SearchPageContent() {
  const { state, actions, hasActiveFilters } = useSearchState();

  const { searchResults, totalResults, loading, error, refetch } =
    useSearchAPI(state);

  const { navigateToHome } = useSearchURL(state);
  const { navigateToAnime } = useAppNavigation();

  const handleAnimeClick = (
    anime: NonNullable<typeof searchResults>[number]
  ) => {
    navigateToAnime(anime.id);
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <PageHeader
          title={text.search.title}
          onBack={navigateToHome}
        />

        <SearchSection
          searchQuery={state.searchQuery}
          onSearchQueryChange={actions.setSearchQuery}
          onSearch={handleSearch}
        />

        <ContentContainer>
          <SearchFilters
            sortBy={state.sortBy}
            onSortChange={actions.setSortBy}
            statusFilter={state.statusFilter}
            onStatusChange={actions.setStatusFilter}
            formatFilter={state.formatFilter}
            onFormatChange={actions.setFormatFilter}
            yearFilter={state.yearFilter}
            onYearChange={actions.setYearFilter}
            disabled={!state.searchQuery.trim()}
          />

          {error ? (
            <ErrorSection
              title={text.errors.searchResults.title}
              message={text.errors.searchResults.message}
              onRetry={refetch}
            />
          ) : (
            <SearchResults
              isLoading={loading}
              results={searchResults}
              onAnimeClick={handleAnimeClick}
              hasQuery={!!state.searchQuery.trim()}
              hasActiveFilters={hasActiveFilters}
              totalResults={totalResults}
            />
          )}
        </ContentContainer>
      </Container>
    </PageContainer>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>{text.common.loading}</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 32px 0;
`;

const ContentContainer = styled.div`
  margin-top: 32px;
`;
