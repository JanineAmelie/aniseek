import React from "react";
import { Typography, Box, Chip, Stack } from "@mui/material";
import styled from "styled-components";
import { getAnimeStatus, formatEpisodes } from "@/utils/anime";
import { Anime } from "@/types/anime";

type InfoProps = {
  anime: Anime;
};

export function Info({ anime }: Readonly<InfoProps>) {
  return (
    <InfoContainer>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          label={getAnimeStatus(anime.status)}
          size="small"
          variant="outlined"
        />
        <Typography variant="body2" color="text.secondary">
          {formatEpisodes(anime.episodes)}
        </Typography>
      </Stack>
    </InfoContainer>
  );
}

const InfoContainer = styled(Box)`
  margin-bottom: 8px;
`;
