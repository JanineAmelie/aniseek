import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ROUTES, buildRoute } from "@/constants/routes";

/**
 * Custom hook for type-safe navigation
 * Provides pre-built navigation functions for common routes
 */
export const useAppNavigation = () => {
  const router = useRouter();

  const navigateToHome = useCallback(() => {
    router.push(ROUTES.HOME);
  }, [router]);

  const navigateToAnime = useCallback(
    (animeId: string | number) => {
      router.push(buildRoute.animeDetails(animeId));
    },
    [router]
  );

  const navigateToSearch = useCallback(
    (query?: string) => {
      if (query) {
        router.push(buildRoute.searchResults(query));
      } else {
        router.push(ROUTES.SEARCH);
      }
    },
    [router]
  );

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  const navigateForward = useCallback(() => {
    router.forward();
  }, [router]);

  const replace = useCallback(
    (url: string) => {
      router.replace(url);
    },
    [router]
  );

  return {
    navigateToHome,
    navigateToAnime,
    navigateToSearch,

    // Router utilities
    navigateBack,
    navigateForward,
    replace,

    // Access to underlying router for custom navigation
    router,
  };
};
