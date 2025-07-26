import React from "react";
import { Chip, Stack } from "@mui/material";
import { text } from "@/constants/text";
import { AnimeStatus } from "@/types/anime";
import { formatEpisodes, formatScore, getAnimeStatus } from "@/utils";

type StatusChipsProps = {
  status?: string | null;
  episodes?: number | null;
  averageScore?: number | null;
};

const getFormattedStatus = (status?: string | null): string => {
  if (!status) {
    return text.animeStatus.unknown;
  }
  return getAnimeStatus(status as AnimeStatus);
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
