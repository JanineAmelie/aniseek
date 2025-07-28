"use client";

import React, { useEffect, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
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
import { useDebounce } from "@/hooks";
import { sanitizeUserInput } from "@/utils";

type SearchSectionProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (query?: string) => void;
};

export function SearchSection({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: Readonly<SearchSectionProps>) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 500);

  // Sync input with external searchQuery changes (e.g., from URL)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Auto-update search query when user stops typing
  useEffect(() => {
    if (debouncedValue !== searchQuery) {
      onSearchQueryChange(debouncedValue);
    }
  }, [debouncedValue, searchQuery, onSearchQueryChange]);

  return (
    <SearchContainer elevation={0}>
      <SectionTitle variant="h5">{text.search.cta}</SectionTitle>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder={text.search.placeholder}
        value={inputValue}
        onChange={handleInputChange}
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
                  onClick={handleSearchClick}
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

  function performSearch(query: string = inputValue) {
    onSearchQueryChange(query);
    onSearch(query);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      performSearch();
    }
  }

  function handleSearchClick() {
    performSearch();
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const sanitized = sanitizeUserInput(e.target.value);
    if (sanitized !== e.target.value) {
      setInputValue(sanitized);
      performSearch(sanitized);
    }
  }
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
