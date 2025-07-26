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

const SearchContainer = styled(Paper)`
  padding: 24px;
  border-radius: 20px !important;
  background: rgba(30, 41, 59, 0.8) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 116, 139, 0.2) !important;
  margin: 32px 0;
`;

type SearchSectionProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
};

export const SearchSection = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: SearchSectionProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchContainer elevation={0}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        <SearchIcon sx={{ mr: 2, verticalAlign: "middle" }} />
        {text.search.title}
      </Typography>
      <TextField
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
                <Button
                  variant="contained"
                  onClick={onSearch}
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    borderRadius: "8px",
                  }}
                >
                  {text.search.button}
                </Button>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(51, 65, 85, 0.5)",
          },
        }}
      />
    </SearchContainer>
  );
};
