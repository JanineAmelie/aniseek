import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";
import { Anime } from "@/types/anime";
import { getAnimeTitle } from "@/utils/anime";
import {
  Score,
  Actions,
  Cover,
  Info,
  Description,
  UserRating,
  Genres,
} from "./index";

type AnimeCardProps = {
  anime: Anime;
  onAddToList?: (anime: Anime) => void;
  onRemoveFromList?: (animeId: number) => void;
  onAddToComparison?: (anime: Anime) => void;
  onRemoveFromComparison?: (animeId: number) => void;
  onCardClick?: (anime: Anime) => void;
  isInMyList?: boolean;
  isInComparison?: boolean;
  canAddToComparison?: boolean;
  showUserRating?: boolean;
  userRating?: number;
  onRatingChange?: (animeId: number, rating: number) => void;
};

export function AnimeCard({
  anime,
  onAddToList,
  onRemoveFromList,
  onAddToComparison,
  onRemoveFromComparison,
  onCardClick,
  isInMyList = false,
  isInComparison = false,
  canAddToComparison = true,
  showUserRating = false,
  userRating,
  onRatingChange,
}: Readonly<AnimeCardProps>) {
  const animeTitle = getAnimeTitle(anime.title);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on action buttons
    if ((e.target as HTMLElement).closest(".card-actions")) {
      return;
    }
    onCardClick?.(anime);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Score score={anime.averageScore} />

      {/*  TODO: if we have time 
      <Actions
        anime={anime}
        isInMyList={isInMyList}
        isInComparison={isInComparison}
        canAddToComparison={canAddToComparison}
        onAddToList={onAddToList}
        onRemoveFromList={onRemoveFromList}
        onAddToComparison={onAddToComparison}
        onRemoveFromComparison={onRemoveFromComparison}
      /> */}

      <Cover coverImage={anime.coverImage} title={animeTitle} />

      <CardContentContainer>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {animeTitle}
        </Typography>

        <Info anime={anime} />

        <Description description={anime.description} />

        {showUserRating && (
          <UserRating
            animeId={anime.id}
            userRating={userRating}
            onRatingChange={onRatingChange}
          />
        )}

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
