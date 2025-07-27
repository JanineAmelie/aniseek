import React from "react";
import { Box, Chip, Stack } from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";

type GenresProps = {
  genres?: (string | null)[] | null;
};

// Function to get gradient colors for each genre
const getGenreGradient = (genre: string): string => {
  const genreMap: Record<string, string> = {
    action: "linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)", // Pink to deep pink
    romance: "linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)", // Light pink to bright pink
    comedy: "linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)", // Yellow to pink
    drama: "linear-gradient(135deg, #a55eea 0%, #26de81 100%)", // Purple to green
    fantasy: "linear-gradient(135deg, #fd79a8 0%, #6c5ce7 100%)", // Pink to purple
    "sci-fi": "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)", // Light blue to blue
    "slice of life": "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)", // Pink to peach
    supernatural: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)", // Light purple to purple
    thriller: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)", // Gray gradient
    mystery: "linear-gradient(135deg, #00b894 0%, #00cec9 100%)", // Teal gradient
  };

  // Extract the main genre word (remove emojis and extra text)
  const mainGenre =
    genre
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(" ")
      .pop() || "";

  // Return specific gradient or default cute gradient
  return (
    genreMap[mainGenre] || "linear-gradient(135deg, #ff9ff3 0%, #feca57 100%)"
  );
};

export function Genres({ genres }: Readonly<GenresProps>) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        {genres.map(genre => (
          <GradientChip
            key={genre || "unknown"}
            label={genre || text.animeDetails.unknown}
            gradient={getGenreGradient(genre || "")}
          />
        ))}
      </Stack>
    </Box>
  );
}

const GradientChip = styled(Chip)<{ gradient: string }>`
  background: ${props => props.gradient};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 20px 24px;
  height: auto;
  min-height: 60px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  flex: 1 1 auto;
  min-width: 120px;

  .MuiChip-label {
    padding: 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;
