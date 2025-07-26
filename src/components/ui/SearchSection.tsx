"use client";

import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "styled-components";
import { text } from "@/constants/text";

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

  return (
    <SearchContainer elevation={0}>
      <SectionTitle variant="h5">
        <TitleIcon />
        {text.search.title}
      </SectionTitle>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder={text.search.placeholder}
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchButton variant="contained" onClick={onSearch}>
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
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 116, 139, 0.2);
  margin: 32px 0;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 24px;
  font-weight: 600;
`;

const TitleIcon = styled(SearchIcon)`
  margin-right: 16px;
  vertical-align: middle;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: rgba(51, 65, 85, 0.5);
  }
`;

const SearchButton = styled(Button)`
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 8px;
`;
