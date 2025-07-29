import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { AnimeDetailsFragmentFragment } from "@/__generated__/graphql";
import { text } from "@/constants/text";

type InfoGridProps = {
  anime: AnimeDetailsFragmentFragment;
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

  if (!hasAnyInfo) {
    return null;
  }

  return (
    <InfoGridContainer>
      {anime.format && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.format}
          </Typography>
          <Typography variant="body1">{anime.format}</Typography>
        </InfoItem>
      )}
      {anime.source && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.source}
          </Typography>
          <Typography variant="body1">{anime.source}</Typography>
        </InfoItem>
      )}
      {anime.seasonYear && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.year}
          </Typography>
          <Typography variant="body1">
            {anime.season} {anime.seasonYear}
          </Typography>
        </InfoItem>
      )}
      {anime.duration && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.duration}
          </Typography>
          <Typography variant="body1">
            {anime.duration} {text.animeDetails.infoGrid.durationUnit}
          </Typography>
        </InfoItem>
      )}
      {anime.popularity && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.popularity}
          </Typography>
          <Typography variant="body1">#{anime.popularity}</Typography>
        </InfoItem>
      )}
      {anime.favourites && (
        <InfoItem>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            {text.animeDetails.infoGrid.favourites}
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
