"use client";

import React, { useEffect, useState } from "react";
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
  // Local input state for immediate UI feedback
  const [localInputValue, setLocalInputValue] = useState(searchQuery);

  // Debounce the local input value
  const debouncedLocalValue = useDebounce(localInputValue, 500);

  // Update local state when external searchQuery changes (e.g., from URL)
  useEffect(() => {
    setLocalInputValue(searchQuery);
  }, [searchQuery]);

  // Propagate debounced changes to parent
  useEffect(() => {
    if (debouncedLocalValue !== searchQuery) {
      onSearchQueryChange(debouncedLocalValue);
    }
  }, [debouncedLocalValue, searchQuery, onSearchQueryChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Immediately update parent with current input value and trigger search
      onSearchQueryChange(localInputValue);
      onSearch(localInputValue);
    }
  };

  const handleSearchClick = () => {
    // Update parent with current input value and trigger search
    onSearchQueryChange(localInputValue);
    onSearch(localInputValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Sanitize input when user finishes typing
    const sanitized = sanitizeUserInput(e.target.value);
    if (sanitized !== e.target.value) {
      setLocalInputValue(sanitized);
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
        value={localInputValue}
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
