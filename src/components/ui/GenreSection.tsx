"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Explore as ExploreIcon } from "@mui/icons-material";
import styled from "styled-components";
import { text } from "@/constants/text";

const GenreButton = styled(Button)<{
  $variant?: "primary" | "secondary" | "accent";
}>`
  background: ${(props) => {
    switch (props.$variant) {
      case "primary":
        return "linear-gradient(135deg, #6366f1, #8b5cf6)";
      case "secondary":
        return "linear-gradient(135deg, #ec4899, #f43f5e)";
      case "accent":
        return "linear-gradient(135deg, #06b6d4, #0ea5e9)";
      default:
        return "linear-gradient(135deg, #64748b, #475569)";
    }
  }} !important;
  color: white !important;
  border: none !important;
  border-radius: 16px !important;
  padding: 12px 24px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  text-transform: none !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4) !important;
  }
`;

type Genre = {
  name: string;
  variant: "primary" | "secondary" | "accent";
  icon: string;
};

type GenreSectionProps = {
  genres: Genre[];
  selectedGenre: string | null;
  onGenreClick: (genreName: string) => void;
};

export const GenreSection = ({
  genres,
  selectedGenre,
  onGenreClick,
}: GenreSectionProps) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        <ExploreIcon sx={{ mr: 2, verticalAlign: "middle" }} />
        {text.genres.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {genres.map((genre) => (
          <Box
            key={genre.name}
            sx={{ flex: { xs: "1 0 45%", sm: "1 0 30%", md: "1 0 15%" } }}
          >
            <GenreButton
              fullWidth
              $variant={genre.variant}
              onClick={() => onGenreClick(genre.name)}
              sx={{
                opacity:
                  selectedGenre && selectedGenre !== genre.name ? 0.6 : 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", mb: 0.5 }}>
                  {genre.icon}
                </Typography>
                {genre.name}
              </Box>
            </GenreButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
