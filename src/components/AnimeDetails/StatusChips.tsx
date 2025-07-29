import React from "react";
import { Chip, Stack } from "@mui/material";
import { AnimeDetailsFragmentFragment } from "@/__generated__/graphql";
import { text } from "@/constants/text";
import { MediaStatus } from "@/types/anime";
import { formatEpisodes, formatScore, getAnimeStatus } from "@/utils";

type StatusChipsProps = {
  status: AnimeDetailsFragmentFragment["status"];
  episodes: AnimeDetailsFragmentFragment["episodes"];
  averageScore: AnimeDetailsFragmentFragment["averageScore"];
};

const getFormattedStatus = (status?: MediaStatus | null): string => {
  if (!status) {
    return text.animeStatus.unknown;
  }
  return getAnimeStatus(status);
};

export function StatusChips({
  status,
  episodes,
  averageScore,
}: Readonly<StatusChipsProps>) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 3 }}
      flexWrap="wrap"
    >
      <Chip
        label={getFormattedStatus(status)}
        color="primary"
        variant="outlined"
      />
      <Chip
        label={formatEpisodes(episodes || undefined)}
        variant="outlined"
      />
      {averageScore && (
        <Chip
          label={`${text.animeDetails.score}: ${formatScore(averageScore)}`}
          color="secondary"
          variant="outlined"
        />
      )}
    </Stack>
  );
}
