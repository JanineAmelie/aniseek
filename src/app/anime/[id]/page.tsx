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

import { useAnimeDetails } from "@/hooks/useGeneratedAnimeQueries";

export default function AnimeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [animeId, setAnimeId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (params.id) {
      const id = parseInt(params.id as string);
      if (!isNaN(id)) {
        setAnimeId(id);
      }
    }
  }, [params.id]);

  const { data, loading, error } = useAnimeDetails(animeId || 0);

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

  const anime = data.Media;

  if (!anime) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Anime not found
        </Typography>
      </Container>
    );
  }

  const animeTitle =
    anime.title?.english ||
    anime.title?.romaji ||
    anime.title?.native ||
    "Unknown Title";
  const coverImage = anime.coverImage?.large || anime.coverImage?.medium;

  const formatScore = (score?: number | null): string => {
    if (!score) return "N/A";
    return `${score}%`;
  };

  const formatEpisodes = (episodes?: number | null): string => {
    if (!episodes) return "Unknown";
    return episodes === 1 ? "1 Episode" : `${episodes} Episodes`;
  };

  const getAnimeStatus = (status?: string | null): string => {
    if (!status) return "Unknown";
    switch (status) {
      case "FINISHED":
        return "Finished";
      case "RELEASING":
        return "Releasing";
      case "NOT_YET_RELEASED":
        return "Not Yet Released";
      case "CANCELLED":
        return "Cancelled";
      case "HIATUS":
        return "Hiatus";
      default:
        return status;
    }
  };

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
                    <Chip
                      key={genre || "unknown"}
                      label={genre || "Unknown"}
                      size="small"
                    />
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
