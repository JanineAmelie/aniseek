import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  Remove as RemoveIcon,
  Compare as CompareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

import styled from "styled-components";
import { Anime } from "@/types/anime";
import {
  getAnimeTitle,
  formatScore,
  formatEpisodes,
  getAnimeStatus,
  truncateDescription,
} from "@/utils/anime";

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
  const showScore = !!anime.averageScore;
  const listTooltip = isInMyList ? "Remove from My List" : "Add to My List";
  const listIcon = isInMyList ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  let comparisonTooltip = "Add to Comparison";
  if (isInComparison) {
    comparisonTooltip = "Remove from Comparison";
  } else if (!canAddToComparison) {
    comparisonTooltip = "Comparison Full (4 max)";
  }

  const comparisonIcon = isInComparison ? <RemoveIcon /> : <CompareIcon />;
  const comparisonDisabled = !isInComparison && !canAddToComparison;
  const animeTitle = getAnimeTitle(anime.title);
  const coverImage = anime.coverImage?.large || anime.coverImage?.medium;
  const showDescription = !!anime.description;
  const truncatedDescription = anime.description
    ? truncateDescription(anime.description, 120)
    : "";
  const showGenres = anime.genres && anime.genres.length > 0;
  const displayGenres = anime.genres?.slice(0, 3) || [];
  const extraGenresCount =
    anime.genres && anime.genres.length > 3 ? anime.genres.length - 3 : 0;
  const showExtraGenres = extraGenresCount > 0;

  return (
    <StyledCard onClick={handleCardClick}>
      {showScore && (
        <ScoreOverlay>{formatScore(anime.averageScore)}</ScoreOverlay>
      )}

      <CardActions className="card-actions">
        <Tooltip title={listTooltip}>
          <ActionButton
            onClick={handleListToggle}
            size="small"
            $isActive={isInMyList}
            $variant="secondary"
          >
            {listIcon}
          </ActionButton>
        </Tooltip>

        <Tooltip title={comparisonTooltip}>
          <ActionButton
            onClick={handleComparisonToggle}
            disabled={comparisonDisabled}
            size="small"
            $isActive={isInComparison}
            $variant="primary"
          >
            {comparisonIcon}
          </ActionButton>
        </Tooltip>
      </CardActions>

      <StyledCardMedia image={coverImage} />

      <CardContentContainer>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {animeTitle}
        </Typography>

        <InfoContainer>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={getAnimeStatus(anime.status)}
              size="small"
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              {formatEpisodes(anime.episodes)}
            </Typography>
          </Stack>
        </InfoContainer>

        {showDescription && (
          <DescriptionText variant="body2" color="text.secondary">
            {truncatedDescription}
          </DescriptionText>
        )}

        {showUserRating && (
          <RatingContainer>
            <RatingLabel variant="body2">My Rating:</RatingLabel>
            <Rating
              value={userRating || 0}
              onChange={handleRatingChange}
              size="small"
              onClick={(e) => e.stopPropagation()}
            />
          </RatingContainer>
        )}

        {showGenres && (
          <GenreContainer>
            {displayGenres.map((genre) => (
              <GenreChip key={genre} label={genre} size="small" />
            ))}
            {showExtraGenres && (
              <GenreChip
                label={`+${extraGenresCount}`}
                size="small"
                variant="outlined"
              />
            )}
          </GenreContainer>
        )}
      </CardContentContainer>
    </StyledCard>
  );

  function handleCardClick(e: React.MouseEvent) {
    // Prevent card click when clicking on action buttons
    if ((e.target as HTMLElement).closest(".card-actions")) {
      return;
    }
    onCardClick?.(anime);
  }

  function handleListToggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (isInMyList) {
      onRemoveFromList?.(anime.id);
    } else {
      onAddToList?.(anime);
    }
  }

  function handleComparisonToggle(event: React.MouseEvent) {
    event.stopPropagation();
    if (isInComparison) {
      onRemoveFromComparison?.(anime.id);
    } else {
      onAddToComparison?.(anime);
    }
  }

  function handleRatingChange(
    event: React.SyntheticEvent,
    newValue: number | null
  ) {
    event.stopPropagation();
    if (newValue !== null) {
      onRatingChange?.(anime.id, newValue);
    }
  }
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

const CardActions = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.2s ease-in-out;
  z-index: 2;
`;

const ScoreOverlay = styled(Box)`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${(props) => props.theme.palette.cuteColors.blackOverlay};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.875rem;
  z-index: 2;
`;

const GenreContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  max-height: 60px;
  overflow: hidden;
`;

const StyledCardMedia = styled(CardMedia)`
  object-fit: cover;
  height: 300px;
`;

const CardContentContainer = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled(Box)`
  margin-bottom: 8px;
`;

const DescriptionText = styled(Typography)`
  flex-grow: 1;
  margin-bottom: 8px;
`;

const RatingContainer = styled(Box)`
  margin-bottom: 8px;
`;

const RatingLabel = styled(Typography)`
  margin-bottom: 4px;
`;

const ActionButton = styled(IconButton)<{
  $isActive?: boolean;
  $variant?: "primary" | "secondary";
}>`
  background-color: ${(props) => props.theme.palette.cuteColors.blackOverlay};
  color: ${({ $isActive, $variant, theme }) => {
    if ($isActive) {
      return $variant === "secondary"
        ? theme.palette.secondary.main
        : theme.palette.primary.main;
    }
    return "white";
  }};

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const GenreChip = styled(Chip)`
  font-size: 0.75rem;
`;
