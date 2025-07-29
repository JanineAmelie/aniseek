import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import { AnimeCardFragmentFragment } from "@/__generated__/graphql";
import { text } from "@/constants/text";
import { formatEpisodes, getAnimeStatus } from "@/utils";

type InfoProps = {
  anime: AnimeCardFragmentFragment;
};

export function Info({ anime }: Readonly<InfoProps>) {
  return (
    <InfoContainer>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
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
        <Typography
          variant="body2"
          color="text.secondary"
        >
          • {getYearDisplay()}
        </Typography>
      </Stack>
    </InfoContainer>
  );

  // Extract year for display
  function getYearDisplay() {
    const start = anime.startDate?.year;

    if (!start) {
      return text.common.unknown;
    }

    const end = anime.endDate?.year;
    return end && end !== start ? `${start} - ${end}` : `${start}`;
  }
}

const InfoContainer = styled(Box)`
  margin-bottom: 8px;
`;
