import React from "react";
import { Chip, Stack } from "@mui/material";
import { getAnimeStatus, formatEpisodes, formatScore } from "@/utils/anime";
import { AnimeStatus } from "@/types/anime";

type StatusChipsProps = {
  status?: string | null;
  episodes?: number | null;
  averageScore?: number | null;
};

const getFormattedStatus = (status?: string | null): string => {
  if (!status) return "Unknown";
  return getAnimeStatus(status as AnimeStatus);
};

export function StatusChips({
  status,
  episodes,
  averageScore,
}: Readonly<StatusChipsProps>) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
      <Chip
        label={getFormattedStatus(status)}
        color="primary"
        variant="outlined"
      />
      <Chip label={formatEpisodes(episodes || undefined)} variant="outlined" />
      {averageScore && (
        <Chip
          label={`Score: ${formatScore(averageScore)}`}
          color="secondary"
          variant="outlined"
        />
      )}
    </Stack>
  );
}
