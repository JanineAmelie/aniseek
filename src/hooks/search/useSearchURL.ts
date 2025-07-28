import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SearchState } from "./useSearchState";

export function useSearchURL(searchState: SearchState) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const buildSearchUrl = (query?: string, genre?: string): string => {
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }
    if (genre) {
      params.set("genre", genre);
    }

    const queryString = params.toString();
    return queryString ? `/search?${queryString}` : "/search";
  };

  useEffect(() => {
    // Skip initial mount to preserve URL from navigation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newUrl = buildSearchUrl(
      searchState.searchQuery,
      searchState.genreFilter
    );
    const currentParams = searchParams?.toString();
    const currentUrl = currentParams ? `/search?${currentParams}` : "/search";

    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  }, [searchState.searchQuery, searchState.genreFilter, router, searchParams]);

  return {
    navigateToHome: () => router.push("/"),
  };
}
