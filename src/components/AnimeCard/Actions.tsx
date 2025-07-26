import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  Remove as RemoveIcon,
  Compare as CompareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import { text } from "@/constants/text";
import { Anime } from "@/types/anime";

type ActionProps = {
  anime: Anime;
  isInMyList?: boolean;
  isInComparison?: boolean;
  canAddToComparison?: boolean;
  onAddToList?: (anime: Anime) => void;
  onRemoveFromList?: (animeId: number) => void;
  onAddToComparison?: (anime: Anime) => void;
  onRemoveFromComparison?: (animeId: number) => void;
};

export function Actions({
  anime,
  isInMyList = false,
  isInComparison = false,
  canAddToComparison = true,
  onAddToList,
  onRemoveFromList,
  onAddToComparison,
  onRemoveFromComparison,
}: Readonly<ActionProps>) {
  const listTooltip = isInMyList
    ? text.animeCard.removeFromList
    : text.animeCard.addToList;
  const listIcon = isInMyList ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  let comparisonTooltip: string = text.animeCard.addToComparison;
  if (isInComparison) {
    comparisonTooltip = text.animeCard.removeFromComparison;
  } else if (!canAddToComparison) {
    comparisonTooltip = text.animeCard.comparisonFull;
  }

  const comparisonIcon = isInComparison ? <RemoveIcon /> : <CompareIcon />;
  const comparisonDisabled = !isInComparison && !canAddToComparison;

  function handleListToggle(event: React.MouseEvent) {
    event.stopPropagation();
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

  return (
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
  );
}

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
