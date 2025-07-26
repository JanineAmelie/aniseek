import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";
import { GetTrendingAnimeQuery } from "@/types/anime";
import { getAnimeTitle } from "@/utils";
import { Cover, Description, Genres, Info, Score } from "./index";

type AnimeFromQuery = NonNullable<
  NonNullable<GetTrendingAnimeQuery["Page"]>["media"]
>[number];

type AnimeCardProps = {
  anime: NonNullable<AnimeFromQuery>;
  onCardClick?: (anime: NonNullable<AnimeFromQuery>) => void;
};

export function AnimeCard({ anime, onCardClick }: Readonly<AnimeCardProps>) {
  const animeTitle = getAnimeTitle(anime.title);

  const handleCardClick = () => {
    onCardClick?.(anime);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Score score={anime.averageScore} />

      <Cover
        coverImage={anime.coverImage}
        title={animeTitle}
      />

      <CardContentContainer>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          noWrap
        >
          {animeTitle}
        </Typography>

        <Info anime={anime} />

        <Description description={anime.description} />

        <Genres genres={anime.genres} />
      </CardContentContainer>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;

  &:hover .card-actions {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardContentContainer = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
