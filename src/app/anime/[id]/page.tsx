"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ANIME_DETAILS } from "@/lib/queries";
import { Anime } from "@/types/anime";
import {
  getAnimeTitle,
  formatScore,
  formatEpisodes,
  getAnimeStatus,
} from "@/utils/anime";

export default function AnimeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [animeId, setAnimeId] = useState<number | null>(null);

  useEffect(() => {
    if (params.id) {
      const id = parseInt(params.id as string);
      if (!isNaN(id)) {
        setAnimeId(id);
      }
    }
  }, [params.id]);

  const { data, loading, error } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: animeId },
    skip: !animeId,
  });

  if (!animeId) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Invalid anime ID
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Tooltip title="Back to Home">
            <IconButton
              onClick={() => router.back()}
              sx={{
                mb: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 105, 180, 0.1)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h4">Loading anime details...</Typography>
      </Container>
    );
  }

  if (error || !data?.Media) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Tooltip title="Back to Home">
            <IconButton
              onClick={() => router.back()}
              sx={{
                mb: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 105, 180, 0.1)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h4" color="error">
          Error loading anime details
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {error?.message || "Anime not found"}
        </Typography>
      </Container>
    );
  }

  const anime: Anime = data.Media;
  const animeTitle = getAnimeTitle(anime.title);
  const coverImage = anime.coverImage?.large || anime.coverImage?.medium;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Tooltip title="Back to Home">
          <IconButton
            onClick={() => router.back()}
            sx={{
              mb: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 105, 180, 0.1)",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <MainContainer>
        <CoverSection>
          <CoverCard>
            {coverImage && (
              <CardMedia
                component="img"
                image={coverImage}
                alt={animeTitle}
                sx={{ height: 400, objectFit: "cover" }}
              />
            )}
          </CoverCard>
        </CoverSection>

        <DetailsSection>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {animeTitle}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
              <Chip
                label={getAnimeStatus(anime.status)}
                color="primary"
                variant="outlined"
              />
              <Chip label={formatEpisodes(anime.episodes)} variant="outlined" />
              {anime.averageScore && (
                <Chip
                  label={`Score: ${formatScore(anime.averageScore)}`}
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Stack>

            {anime.genres && anime.genres.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Genres
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {anime.genres.map((genre) => (
                    <Chip key={genre} label={genre} size="small" />
                  ))}
                </Stack>
              </Box>
            )}

            {anime.description && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <DescriptionText
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: anime.description.replace(/<br\s*\/?>/gi, "<br />"),
                  }}
                />
              </Box>
            )}

            <InfoGrid>
              {anime.format && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Format
                  </Typography>
                  <Typography variant="body1">{anime.format}</Typography>
                </InfoItem>
              )}
              {anime.source && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Source
                  </Typography>
                  <Typography variant="body1">{anime.source}</Typography>
                </InfoItem>
              )}
              {anime.seasonYear && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Year
                  </Typography>
                  <Typography variant="body1">
                    {anime.season} {anime.seasonYear}
                  </Typography>
                </InfoItem>
              )}
              {anime.duration && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1">{anime.duration} min</Typography>
                </InfoItem>
              )}
              {anime.popularity && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Popularity
                  </Typography>
                  <Typography variant="body1">#{anime.popularity}</Typography>
                </InfoItem>
              )}
              {anime.favourites && (
                <InfoItem>
                  <Typography variant="subtitle2" color="text.secondary">
                    Favourites
                  </Typography>
                  <Typography variant="body1">
                    {anime.favourites.toLocaleString()}
                  </Typography>
                </InfoItem>
              )}
            </InfoGrid>
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

const CoverCard = styled(Card)`
  height: fit-content;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const DescriptionText = styled(Typography)`
  line-height: 1.6;

  & br {
    margin-bottom: 8px;
  }
`;

const InfoGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
