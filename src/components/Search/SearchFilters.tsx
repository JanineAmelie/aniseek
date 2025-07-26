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

type SearchFiltersProps = {
  sortBy: MediaSort;
  onSortChange: (sort: MediaSort) => void;
  statusFilter: MediaStatus | "";
  onStatusChange: (status: MediaStatus | "") => void;
  formatFilter: MediaFormat | "";
  onFormatChange: (format: MediaFormat | "") => void;
  yearFilter: number | "";
  onYearChange: (year: number | "") => void;
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
}: Readonly<SearchFiltersProps>) {
  const hasActiveFilters = statusFilter || formatFilter || yearFilter;

  const clearFilters = () => {
    onStatusChange("");
    onFormatChange("");
    onYearChange("");
  };

  // Prevent scrollbar layout shift when dropdown opens
  const menuProps = {
    disableScrollLock: true,
    PaperProps: {
      style: {
        maxHeight: 300,
      },
    },
  };

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
          />
        )}
      </FilterHeader>

      <FiltersGrid>
        <FormControl
          size="small"
          fullWidth
        >
          <InputLabel>{text.search.filters.sortBy}</InputLabel>
          <Select
            value={sortBy}
            label={text.search.filters.sortBy}
            onChange={e => onSortChange(e.target.value as MediaSort)}
            MenuProps={menuProps}
          >
            <MenuItem value={MediaSort.PopularityDesc}>
              {text.search.filters.sortOptions.popularityDesc}
            </MenuItem>
            <MenuItem value={MediaSort.ScoreDesc}>
              {text.search.filters.sortOptions.scoreDesc}
            </MenuItem>
            <MenuItem value={MediaSort.TitleRomaji}>
              {text.search.filters.sortOptions.titleAsc}
            </MenuItem>
            <MenuItem value={MediaSort.StartDateDesc}>
              {text.search.filters.sortOptions.newestFirst}
            </MenuItem>
            <MenuItem value={MediaSort.TrendingDesc}>
              {text.search.filters.sortOptions.trending}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          fullWidth
        >
          <InputLabel>{text.search.filters.status}</InputLabel>
          <Select
            value={statusFilter}
            label={text.search.filters.status}
            onChange={e => onStatusChange(e.target.value as MediaStatus | "")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              {text.search.filters.statusOptions.all}
            </MenuItem>
            <MenuItem value={MediaStatus.Releasing}>
              {text.search.filters.statusOptions.airing}
            </MenuItem>
            <MenuItem value={MediaStatus.Finished}>
              {text.search.filters.statusOptions.completed}
            </MenuItem>
            <MenuItem value={MediaStatus.NotYetReleased}>
              {text.search.filters.statusOptions.upcoming}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          fullWidth
        >
          <InputLabel>{text.search.filters.format}</InputLabel>
          <Select
            value={formatFilter}
            label={text.search.filters.format}
            onChange={e => onFormatChange(e.target.value as MediaFormat | "")}
            MenuProps={menuProps}
          >
            <MenuItem value="">
              {text.search.filters.formatOptions.all}
            </MenuItem>
            <MenuItem value={MediaFormat.Tv}>
              {text.search.filters.formatOptions.tv}
            </MenuItem>
            <MenuItem value={MediaFormat.Movie}>
              {text.search.filters.formatOptions.movie}
            </MenuItem>
            <MenuItem value={MediaFormat.Ova}>
              {text.search.filters.formatOptions.ova}
            </MenuItem>
            <MenuItem value={MediaFormat.Special}>
              {text.search.filters.formatOptions.special}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          fullWidth
        >
          <InputLabel>{text.search.filters.year}</InputLabel>
          <Select
            value={yearFilter}
            label={text.search.filters.year}
            onChange={e => onYearChange(e.target.value as number | "")}
            MenuProps={menuProps}
          >
            <MenuItem value="">{text.search.filters.yearOptions.all}</MenuItem>
            {generateYearOptions().map(year => (
              <MenuItem
                key={year}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FiltersGrid>
    </FiltersContainer>
  );
}

// Helper function to generate year options
function generateYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let year = currentYear + 1; year >= 1960; year--) {
    years.push(year);
  }

  return years;
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
