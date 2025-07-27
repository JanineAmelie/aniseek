import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { SearchState } from "./useSearchState";

export function useSearchURL(searchState: SearchState) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const lastUpdatedUrl = useRef<string>("");

  // Sync URL with all search parameters
  useEffect(() => {
    // Skip the initial mount to avoid overriding URL parameters that came from navigation
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Store the initial URL
      const currentParams = searchParams?.toString();
      lastUpdatedUrl.current = currentParams
        ? `/search?${currentParams}`
        : "/search";
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

    // Only update URL if it's different from the last URL we set
    if (newUrl !== lastUpdatedUrl.current) {
      lastUpdatedUrl.current = newUrl;
      router.replace(newUrl);
    }
  }, [searchState.searchQuery, searchState.genreFilter, router]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    navigateToHome: () => router.push("/"),
  };
}
