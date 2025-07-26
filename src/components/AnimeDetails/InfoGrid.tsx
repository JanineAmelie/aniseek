import React from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";

type AnimeData = {
  format?: string | null;
  source?: string | null;
  season?: string | null;
  seasonYear?: number | null;
  duration?: number | null;
  popularity?: number | null;
  favourites?: number | null;
};

type InfoGridProps = {
  anime: AnimeData;
};

export function InfoGrid({ anime }: Readonly<InfoGridProps>) {
  const hasAnyInfo = Boolean(
    anime.format ||
    anime.source ||
    anime.seasonYear ||
    anime.duration ||
    anime.popularity ||
    anime.favourites
  );

  if (!hasAnyInfo) return null;

  return (
    <InfoGridContainer>
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
    </InfoGridContainer>
  );
}

const InfoGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
