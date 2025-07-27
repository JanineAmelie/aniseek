import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useSearchURL(searchQuery: string) {
  const router = useRouter();

  // Sync URL with search query
  // Future: use Router to handle query parameters more effectively
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("q", searchQuery);
    }

    const newUrl = params.toString()
      ? `/search?${params.toString()}`
      : "/search";

    router.replace(newUrl);
  }, [searchQuery, router]);

  return {
    navigateToHome: () => router.push("/"),
  };
}
