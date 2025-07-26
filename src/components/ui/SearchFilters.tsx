import React, { useState, useMemo } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Chip,
  Autocomplete,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import {
  AnimeFilters,
  AnimeSort,
  AnimeStatus,
  AnimeFormat,
  AnimeSeason,
} from "@/types/anime";

const SearchContainer = styled(Box)`
  padding: 16px;
  background: rgba(30, 41, 59, 0.95);
  border-radius: 12px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(100, 116, 139, 0.2);
`;

const FilterRow = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const POPULAR_GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
  "Thriller",
  "Mystery",
  "Horror",
  "Sports",
  "Music",
  "School",
  "Military",
];

const SORT_OPTIONS = [
  { value: AnimeSort.POPULARITY_DESC, label: "Most Popular" },
  { value: AnimeSort.SCORE_DESC, label: "Highest Rated" },
  { value: AnimeSort.TRENDING_DESC, label: "Trending" },
  { value: AnimeSort.FAVOURITES_DESC, label: "Most Favorited" },
  { value: AnimeSort.START_DATE_DESC, label: "Newest" },
  { value: AnimeSort.TITLE_ROMAJI, label: "Title A-Z" },
  { value: AnimeSort.EPISODES_DESC, label: "Most Episodes" },
];

interface SearchFiltersProps {
  filters: AnimeFilters;
  onFiltersChange: (filters: AnimeFilters) => void;
  onSearch: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleGenreChange = (genres: string[]) => {
    onFiltersChange({ ...filters, genre: genres });
  };

  const handleSortChange = (sort: AnimeSort) => {
    onFiltersChange({ ...filters, sort: [sort] });
  };

  const handleScoreRangeChange = (range: number[]) => {
    onFiltersChange({
      ...filters,
      averageScore_greater: range[0],
      averageScore_lesser: range[1] === 100 ? undefined : range[1],
    });
  };

  const handleEpisodeRangeChange = (range: number[]) => {
    onFiltersChange({
      ...filters,
      episodes_greater: range[0] === 1 ? undefined : range[0],
      episodes_lesser: range[1] === 200 ? undefined : range[1],
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: filters.search,
      sort: [AnimeSort.POPULARITY_DESC],
    });
  };

  const scoreRange = useMemo(
    () => [
      filters.averageScore_greater || 0,
      filters.averageScore_lesser || 100,
    ],
    [filters.averageScore_greater, filters.averageScore_lesser]
  );

  const episodeRange = useMemo(
    () => [filters.episodes_greater || 1, filters.episodes_lesser || 200],
    [filters.episodes_greater, filters.episodes_lesser]
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <SearchContainer>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          placeholder="Search anime..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: filters.search && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleSearchChange("")}
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <IconButton
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          color={showAdvancedFilters ? "primary" : "default"}
        >
          <FilterIcon />
        </IconButton>
      </Box>

      <FilterRow>
        <Autocomplete
          multiple
          options={POPULAR_GENRES}
          value={filters.genre || []}
          onChange={(_, value) => handleGenreChange(value)}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                size="small"
                {...getTagProps({ index })}
                key={option}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Genres"
              placeholder="Select genres..."
              size="small"
              sx={{ minWidth: 200 }}
            />
          )}
          slotProps={{
            paper: {
              sx: { backgroundColor: "background.paper" },
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={filters.sort?.[0] || AnimeSort.POPULARITY_DESC}
            onChange={(e) => handleSortChange(e.target.value as AnimeSort)}
            label="Sort by"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {Object.keys(filters).length > 2 && (
          <IconButton onClick={clearFilters} size="small" color="secondary">
            <ClearIcon />
          </IconButton>
        )}
      </FilterRow>

      {showAdvancedFilters && (
        <>
          <FilterRow>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    status: e.target.value as AnimeStatus,
                  })
                }
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={AnimeStatus.FINISHED}>Finished</MenuItem>
                <MenuItem value={AnimeStatus.RELEASING}>Airing</MenuItem>
                <MenuItem value={AnimeStatus.NOT_YET_RELEASED}>
                  Upcoming
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Format</InputLabel>
              <Select
                value={filters.format || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    format: e.target.value as AnimeFormat,
                  })
                }
                label="Format"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={AnimeFormat.TV}>TV</MenuItem>
                <MenuItem value={AnimeFormat.MOVIE}>Movie</MenuItem>
                <MenuItem value={AnimeFormat.OVA}>OVA</MenuItem>
                <MenuItem value={AnimeFormat.SPECIAL}>Special</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={filters.year || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    year: e.target.value as number,
                  })
                }
                label="Year"
              >
                <MenuItem value="">All</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 100 }}>
              <InputLabel>Season</InputLabel>
              <Select
                value={filters.season || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    season: e.target.value as AnimeSeason,
                  })
                }
                label="Season"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={AnimeSeason.WINTER}>Winter</MenuItem>
                <MenuItem value={AnimeSeason.SPRING}>Spring</MenuItem>
                <MenuItem value={AnimeSeason.SUMMER}>Summer</MenuItem>
                <MenuItem value={AnimeSeason.FALL}>Fall</MenuItem>
              </Select>
            </FormControl>
          </FilterRow>

          <FilterRow sx={{ flexDirection: "column", alignItems: "stretch" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Score Range: {scoreRange[0]}% - {scoreRange[1]}%
              </Typography>
              <Slider
                value={scoreRange}
                onChange={(_, value) =>
                  handleScoreRangeChange(value as number[])
                }
                min={0}
                max={100}
                step={5}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 50, label: "50%" },
                  { value: 100, label: "100%" },
                ]}
                sx={{ maxWidth: 300 }}
              />
            </Box>

            <Box>
              <Typography variant="body2" gutterBottom>
                Episode Count: {episodeRange[0]} -{" "}
                {episodeRange[1] === 200 ? "200+" : episodeRange[1]}
              </Typography>
              <Slider
                value={episodeRange}
                onChange={(_, value) =>
                  handleEpisodeRangeChange(value as number[])
                }
                min={1}
                max={200}
                step={1}
                marks={[
                  { value: 1, label: "1" },
                  { value: 12, label: "12" },
                  { value: 24, label: "24" },
                  { value: 50, label: "50" },
                  { value: 200, label: "200+" },
                ]}
                sx={{ maxWidth: 300 }}
              />
            </Box>
          </FilterRow>
        </>
      )}
    </SearchContainer>
  );
};
