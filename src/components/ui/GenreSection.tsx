"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Explore as ExploreIcon } from "@mui/icons-material";
import styled from "styled-components";
import { text } from "@/constants/text";

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

export function GenreSection({
  genres,
  selectedGenre,
  onGenreClick,
}: Readonly<GenreSectionProps>) {
  return (
    <SectionContainer>
      <SectionTitle variant="h5">
        <TitleIcon />
        {text.genres.title}
      </SectionTitle>
      <GenreGrid>
        {genres.map((genre) => (
          <GenreItem key={genre.name}>
            <GenreButton
              $variant={genre.variant}
              $selectedGenre={selectedGenre}
              $genreName={genre.name}
              onClick={() => onGenreClick(genre.name)}
            >
              <GenreContent>
                <GenreIcon>{genre.icon}</GenreIcon>
                {genre.name}
              </GenreContent>
            </GenreButton>
          </GenreItem>
        ))}
      </GenreGrid>
    </SectionContainer>
  );
}

const SectionContainer = styled(Box)`
  margin-bottom: 48px;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 600;
`;

const TitleIcon = styled(ExploreIcon)`
  margin-right: 16px;
  vertical-align: middle;
`;

const GenreGrid = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const GenreItem = styled(Box)`
  flex: 1 0 45%;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex: 1 0 30%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex: 1 0 15%;
  }
`;

const GenreButton = styled(Button)<{
  $variant?: "primary" | "secondary" | "accent";
  $isSelected?: boolean;
  $selectedGenre?: string | null;
  $genreName?: string;
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
  }};
  color: white;
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  width: 100%;
  opacity: ${({ $selectedGenre, $genreName }) =>
    $selectedGenre && $selectedGenre !== $genreName ? 0.6 : 1};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }
`;

const GenreContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GenreIcon = styled(Typography)`
  font-size: 1.5rem;
  margin-bottom: 4px;
`;
