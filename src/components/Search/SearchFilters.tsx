import React from "react";
import { TuneRounded as FilterIcon } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { text } from "@/constants/text";
import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";
import { createFilterConfigs } from "./searchFilterConfigs";

type SearchFiltersProps = {
  sortBy: MediaSort;
  onSortChange: (sort: MediaSort) => void;
  statusFilter: MediaStatus | "";
  onStatusChange: (status: MediaStatus | "") => void;
  formatFilter: MediaFormat | "";
  onFormatChange: (format: MediaFormat | "") => void;
  yearFilter: number | "";
  onYearChange: (year: number | "") => void;
  disabled?: boolean;
};

export function SearchFilters({
  sortBy,
  onSortChange,
  statusFilter,
  onStatusChange,
  formatFilter,
  onFormatChange,
  yearFilter,
  onYearChange,
  disabled = false,
}: Readonly<SearchFiltersProps>) {
  const hasActiveFilters = statusFilter || formatFilter || yearFilter;

  const clearFilters = () => {
    onStatusChange("");
    onFormatChange("");
    onYearChange("");
  };

  // Data-driven filter configuration
  const filterConfigs = createFilterConfigs({
    values: {
      sortBy,
      statusFilter,
      formatFilter,
      yearFilter,
    },
    callbacks: {
      onSortChange,
      onStatusChange,
      onFormatChange,
      onYearChange,
    },
  });

  return (
    <FiltersContainer elevation={1}>
      <FilterHeader>
        <FilterTitle>
          <FilterIcon />
          {text.search.filters.title}
        </FilterTitle>
        {hasActiveFilters && (
          <Chip
            label={text.search.filters.clearAll}
            variant="outlined"
            size="small"
            onClick={clearFilters}
            onDelete={clearFilters}
            disabled={disabled}
          />
        )}
      </FilterHeader>

      <FiltersGrid>
        {filterConfigs.map(({ key, label, value, onChange, options }) => (
          <FormControl
            key={key}
            size="small"
            fullWidth
            disabled={disabled}
          >
            <InputLabel>{label}</InputLabel>
            <StyledSelect
              value={value}
              label={label}
              onChange={e => onChange(e.target.value as string | number)}
              disabled={disabled}
            >
              {options.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        ))}
      </FiltersGrid>
    </FiltersContainer>
  );
}

const FiltersContainer = styled(Paper)`
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 12px;
`;

const FilterHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterTitle = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const FiltersGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSelect = styled(Select).attrs({
  MenuProps: {
    disableScrollLock: true,
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  },
})`
  .MuiSelect-select {
    min-height: 1.4375em;
  }
`;
