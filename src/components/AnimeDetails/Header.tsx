import React from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { text } from "@/constants/text";
import { MediaTitle } from "@/types/anime";
import { getAnimeTitle } from "@/utils";

type HeaderProps = {
  title?: {
    english?: string | null;
    romaji?: string | null;
    native?: string | null;
  } | null;
  onBack: () => void;
};

export function Header({ title, onBack }: Readonly<HeaderProps>) {
  const animeTitle = getAnimeTitle({
    english: title?.english || undefined,
    romaji: title?.romaji || undefined,
    native: title?.native || undefined,
  } as MediaTitle);

  return (
    <Box sx={{ mb: 3 }}>
      <Tooltip title={text.animeDetails.backToHome}>
        <IconButton
          onClick={onBack}
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
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
      >
        {animeTitle}
      </Typography>
    </Box>
  );
}
