"use client";

import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import { text } from "@/constants/text";

type CallToActionSectionProps = {
  onExploreClick: () => void;
  onViewListClick: () => void;
};

export const CallToActionSection = ({
  onExploreClick,
  onViewListClick,
}: CallToActionSectionProps) => {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        {text.cta.title}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          onClick={onExploreClick}
          sx={{
            background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
            borderRadius: "12px",
            px: 4,
            py: 1.5,
          }}
        >
          <PlayIcon sx={{ mr: 1 }} />
          {text.cta.exploreButton}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onViewListClick}
          sx={{
            borderRadius: "12px",
            px: 4,
            py: 1.5,
            borderColor: "primary.main",
            color: "primary.main",
          }}
        >
          {text.cta.myListButton}
        </Button>
      </Stack>
    </Box>
  );
};
