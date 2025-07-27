import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SearchState } from "./useSearchState";

export function useSearchURL(searchState: SearchState) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  // Sync URL with all search parameters
  useEffect(() => {
    // Skip the initial mount to avoid overriding URL parameters that came from navigation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (searchState.searchQuery) {
      params.set("q", searchState.searchQuery);
    }

    if (searchState.genreFilter) {
      params.set("genre", searchState.genreFilter);
    }

    const newUrl = params.toString()
      ? `/search?${params.toString()}`
      : "/search";

    // Only update URL if it's different from current URL
    const currentParams = searchParams.toString();
    const currentUrl = currentParams ? `/search?${currentParams}` : "/search";

    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  }, [searchState.searchQuery, searchState.genreFilter, router, searchParams]);

  return {
    navigateToHome: () => router.push("/"),
  };
}
