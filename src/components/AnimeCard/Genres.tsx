import React from "react";
import { Box, Chip } from "@mui/material";
import styled from "styled-components";

const DEFAULT_MAX_GENRES = 3;

type GenresProps = {
  genres?: (string | null)[] | null;
  maxGenres?: number;
};

export function Genres({
  genres,
  maxGenres = DEFAULT_MAX_GENRES,
}: Readonly<GenresProps>) {
  if (!genres || genres.length === 0) return null;

  const displayGenres = genres.slice(0, maxGenres);
  const extraGenresCount =
    genres.length > maxGenres ? genres.length - maxGenres : 0;
  const showExtraGenres = extraGenresCount > 0;

  return (
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
  );
}

const GenreContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
  max-height: 60px;
  overflow: hidden;
`;

const GenreChip = styled(Chip)`
  font-size: 0.75rem;
`;
