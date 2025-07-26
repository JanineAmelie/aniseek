import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { Anime } from "@/types/anime";
import { formatEpisodes, getAnimeStatus } from "@/utils";

type InfoProps = {
  anime: Anime;
};

export function Info({ anime }: Readonly<InfoProps>) {
  return (
    <InfoContainer>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Chip
          label={getAnimeStatus(anime.status)}
          size="small"
          variant="outlined"
        />
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {formatEpisodes(anime.episodes)}
        </Typography>
      </Stack>
    </InfoContainer>
  );
}

const InfoContainer = styled(Box)`
  margin-bottom: 8px;
`;
