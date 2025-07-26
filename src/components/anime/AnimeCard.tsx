import React from 'react';
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
} from '@mui/material';
import {
  Remove as RemoveIcon,
  Compare as CompareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

import styled from 'styled-components';
import { Anime } from '@/types/anime';
import { 
  getAnimeTitle, 
  formatScore, 
  formatEpisodes, 
  getAnimeStatus,
  truncateDescription 
} from '@/utils/anime';

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
  background: rgba(0, 0, 0, 0.8);
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

interface AnimeCardProps {
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
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
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
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on action buttons
    if ((e.target as HTMLElement).closest('.card-actions')) {
      return;
    }
    onCardClick?.(anime);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInMyList) {
      onRemoveFromList?.(anime.id);
    } else {
      onAddToList?.(anime);
    }
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInComparison) {
      onRemoveFromComparison?.(anime.id);
    } else {
      onAddToComparison?.(anime);
    }
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    event.stopPropagation();
    if (newValue !== null) {
      onRatingChange?.(anime.id, newValue);
    }
  };

  const getComparisonTooltip = () => {
    if (isInComparison) return "Remove from Comparison";
    if (canAddToComparison) return "Add to Comparison";
    return "Comparison Full (4 max)";
  };

  return (
    <StyledCard onClick={handleCardClick}>
      {anime.averageScore && (
        <ScoreOverlay>
          {formatScore(anime.averageScore)}
        </ScoreOverlay>
      )}
      
      <CardActions className="card-actions">
        <Tooltip title={isInMyList ? "Remove from My List" : "Add to My List"}>
          <IconButton
            onClick={handleListToggle}
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: isInMyList ? 'secondary.main' : 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            {isInMyList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title={getComparisonTooltip()}>
          <IconButton
            onClick={handleComparisonToggle}
            disabled={!isInComparison && !canAddToComparison}
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: isInComparison ? 'primary.main' : 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            {isInComparison ? <RemoveIcon /> : <CompareIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>

      <CardMedia
        component="img"
        height="300"
        image={anime.coverImage?.large || anime.coverImage?.medium}
        alt={getAnimeTitle(anime.title)}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {getAnimeTitle(anime.title)}
        </Typography>

        <Box sx={{ mb: 1 }}>
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
        </Box>

        {anime.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ flexGrow: 1, mb: 1 }}
          >
            {truncateDescription(anime.description, 120)}
          </Typography>
        )}

        {showUserRating && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" component="legend" sx={{ mb: 0.5 }}>
              My Rating:
            </Typography>
            <Rating
              value={userRating || 0}
              onChange={handleRatingChange}
              size="small"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        )}

        {anime.genres && anime.genres.length > 0 && (
          <GenreContainer>
            {anime.genres.slice(0, 3).map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
            {anime.genres.length > 3 && (
              <Chip
                label={`+${anime.genres.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </GenreContainer>
        )}
      </CardContent>
    </StyledCard>
  );
};
