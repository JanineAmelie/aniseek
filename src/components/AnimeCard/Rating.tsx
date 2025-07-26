import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";

type UserRatingProps = {
  animeId: number;
  userRating?: number;
  onRatingChange?: (animeId: number, rating: number) => void;
};

export function UserRating({
  animeId,
  userRating,
  onRatingChange,
}: Readonly<UserRatingProps>) {
  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    event.stopPropagation();
    if (newValue !== null) {
      onRatingChange?.(animeId, newValue);
    }
  };

  return (
    <RatingContainer>
      <RatingLabel variant="body2">{text.animeCard.myRating}</RatingLabel>
      <Rating
        value={userRating || 0}
        onChange={handleRatingChange}
        size="small"
        onClick={(e) => e.stopPropagation()}
      />
    </RatingContainer>
  );
}

const RatingContainer = styled(Box)`
  margin-bottom: 8px;
`;

const RatingLabel = styled(Typography)`
  margin-bottom: 4px;
`;
