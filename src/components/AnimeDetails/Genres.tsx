import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

type GenresProps = {
  genres?: (string | null)[] | null;
};

export function Genres({ genres }: Readonly<GenresProps>) {
  if (!genres || genres.length === 0) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Genres
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
      >
        {genres.map(genre => (
          <Chip
            key={genre || "unknown"}
            label={genre || "Unknown"}
            size="small"
          />
        ))}
      </Stack>
    </Box>
  );
}
