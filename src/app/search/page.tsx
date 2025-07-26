"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import styled from "styled-components";
import { SearchFilters, SearchResults } from "@/components/Search";
import { ErrorSection } from "@/components/ui/ErrorSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchSection } from "@/components/ui/SearchSection";
import { text } from "@/constants/text";
import { useAnimeSearch } from "@/hooks/api/useAnimeSearch";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { navigateToAnime } = useAppNavigation();

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Filter state
  const [sortBy, setSortBy] = useState<MediaSort>(MediaSort.PopularityDesc);
  const [statusFilter, setStatusFilter] = useState<MediaStatus | "">("");
  const [formatFilter, setFormatFilter] = useState<MediaFormat | "">("");
  const [yearFilter, setYearFilter] = useState<number | "">("");

  // Pagination
  const [currentPage] = useState(1);
  const perPage = 20;

  // Search hook
  const { data, loading, error, refetch } = useAnimeSearch(
    searchQuery,
    currentPage,
    perPage,
    sortBy,
    statusFilter || undefined,
    formatFilter || undefined,
    yearFilter || undefined
  );

  // Update search when filters change (only if there's a search query)
  useEffect(() => {
    if (searchQuery.trim()) {
      refetch();
    }
  }, [sortBy, statusFilter, formatFilter, yearFilter, searchQuery, refetch]);

  useEffect(() => {
    if (searchQuery) {
      const params = new URLSearchParams();
      params.set("q", searchQuery);
      router.replace(`/search?${params.toString()}`);
    } else {
      router.replace("/search");
    }
  }, [searchQuery, router]);

  // Extract and filter results
  const searchResults = (data?.Page?.media || []).filter(
    (anime): anime is NonNullable<typeof anime> => anime !== null
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetch();
    }
  };

  const handleAnimeClick = (
    anime: NonNullable<typeof searchResults>[number]
  ) => {
    navigateToAnime(anime.id);
  };

  const handleRetry = () => {
    refetch();
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <PageHeader
          title={text.search.title}
          onBack={handleBackToHome}
        />

        <SearchSection
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />

        <ContentContainer>
          <SearchFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            formatFilter={formatFilter}
            onFormatChange={setFormatFilter}
            yearFilter={yearFilter}
            onYearChange={setYearFilter}
          />

          {error ? (
            <ErrorSection
              title={text.errors.searchResults.title}
              message={text.errors.searchResults.message}
              onRetry={handleRetry}
            />
          ) : (
            <SearchResults
              isLoading={loading}
              results={searchResults}
              onAnimeClick={handleAnimeClick}
              hasQuery={!!searchQuery.trim()}
              totalResults={data?.Page?.pageInfo?.total || 0}
            />
          )}
        </ContentContainer>
      </Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 32px 0;
`;

const ContentContainer = styled.div`
  margin-top: 32px;
`;
