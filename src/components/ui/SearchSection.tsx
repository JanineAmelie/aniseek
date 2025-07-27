"use client";

import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";
import { sanitizeUserInput } from "@/utils";

type SearchSectionProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
};
export function SearchSection({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: Readonly<SearchSectionProps>) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Sanitize input when user finishes typing
    const sanitized = sanitizeUserInput(e.target.value);
    if (sanitized !== e.target.value) {
      onSearchQueryChange(sanitized);
    }
  };

  return (
    <SearchContainer elevation={0}>
      <SectionTitle variant="h5">{text.search.cta}</SectionTitle>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder={text.search.placeholder}
        value={searchQuery}
        onChange={e => onSearchQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchButton
                  variant="contained"
                  onClick={onSearch}
                >
                  {text.search.button}
                </SearchButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled(Paper)`
  padding: 24px;
  border-radius: 20px;
  background: ${props => props.theme.palette.cuteColors.whiteOverlay};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.palette.cuteColors.pinkSoft};
  margin: 32px 0;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 600;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
  }
`;

const SearchButton = styled(Button)`
  background: linear-gradient(
    45deg,
    ${props => props.theme.palette.cuteColors.pinkPrimary},
    ${props => props.theme.palette.cuteColors.purplePrimary}
  );
  border-radius: 8px;
`;
