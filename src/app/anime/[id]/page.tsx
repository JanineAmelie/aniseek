"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import styled from "styled-components";
import {
  Cover,
  Description,
  Genres,
  Header,
  InfoGrid,
  StatusChips,
} from "@/components/AnimeDetails";
import { useAnimeDetails } from "@/hooks";

export default function AnimeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [animeId, setAnimeId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (params && params.id) {
      const id = parseInt(params.id as string);
      if (!isNaN(id)) {
        setAnimeId(id);
      }
    }
  }, [params]);

  const { data, loading, error } = useAnimeDetails(animeId || 0);

  if (!animeId) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <Typography
          variant="h4"
          color="error"
        >
          Invalid anime ID
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <Typography variant="h4">Loading anime details...</Typography>
      </Container>
    );
  }

  if (error || !data?.Media) {
    // For anime not found, trigger Next.js not-found page
    if (error?.message?.includes("not found") || !data?.Media) {
      notFound();
    }

    return (
      <Container
        maxWidth="lg"
        sx={{ py: 4 }}
      >
        <Typography
          variant="h4"
          color="error"
        >
          Error loading anime details
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2 }}
        >
          {error?.message || "Anime not found"}
        </Typography>
      </Container>
    );
  }

  const anime = data.Media;

  if (!anime) {
    notFound();
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Header
        title={anime.title}
        onBack={() => router.back()}
      />

      <MainContainer>
        <CoverSection>
          <Cover
            coverImage={anime.coverImage}
            title={anime.title?.english || anime.title?.romaji || "Unknown"}
          />
        </CoverSection>

        <DetailsSection>
          <Box>
            <StatusChips
              status={anime.status}
              episodes={anime.episodes}
              averageScore={anime.averageScore}
            />

            <Genres genres={anime.genres} />

            <Description description={anime.description} />

            <InfoGrid anime={anime} />
          </Box>
        </DetailsSection>
      </MainContainer>
    </Container>
  );
}

const MainContainer = styled(Box)`
  display: flex;
  gap: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const CoverSection = styled(Box)`
  flex: 0 0 300px;

  @media (max-width: 900px) {
    flex: none;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const DetailsSection = styled(Box)`
  flex: 1;
  min-width: 0;
`;
