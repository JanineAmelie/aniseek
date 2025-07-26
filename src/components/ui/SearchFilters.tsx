import React, { useState, useMemo } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Chip,
  Autocomplete,
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

  // Extract variables from ternaries and conditions
  const searchValue = filters.search || "";
  const hasSearchValue = !!filters.search;
  const filterButtonColor = showAdvancedFilters ? "primary" : "default";
  const selectedGenres = filters.genre || [];
  const selectedSort = filters.sort?.[0] || AnimeSort.POPULARITY_DESC;
  const hasAdvancedFilters = Object.keys(filters).length > 2;
  const selectedStatus = filters.status || "";
  const selectedFormat = filters.format || "";
  const selectedYear = filters.year || "";
  const selectedSeason = filters.season || "";
  const scoreRangeText = `Score Range: ${scoreRange[0]}% - ${scoreRange[1]}%`;
  const episodeRangeMax = episodeRange[1] === 200 ? "200+" : episodeRange[1];
  const episodeRangeText = `Episode Count: ${episodeRange[0]} - ${episodeRangeMax}`;

  return (
    <SearchContainer>
      <SearchRow>
        <TextField
          fullWidth
          placeholder="Search anime..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: hasSearchValue && (
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
          color={filterButtonColor}
        >
          <FilterIcon />
        </IconButton>
      </SearchRow>

      <FilterRow>
        <StyledAutocompleteTags
          multiple
          options={POPULAR_GENRES}
          value={selectedGenres}
          onChange={(_, value) => handleGenreChange(value as string[])}
          renderValue={(selected) =>
            (selected as string[]).map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                size="small"
                key={option}
                sx={{ mr: 0.5 }}
              />
            ))
          }
          renderInput={(params) => (
            <StyledAutocompleteInput
              {...params}
              variant="outlined"
              label="Genres"
              placeholder="Select genres..."
              size="small"
            />
          )}
          slotProps={{
            paper: {
              sx: { backgroundColor: "background.paper" },
            },
          }}
        />

        <StyledFormControl size="small">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value as AnimeSort)}
            label="Sort by"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

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

const SearchContainer = styled(Box)`
  padding: 16px;
  background: ${(props) => props.theme.palette.cuteColors.whiteOverlay};
  border-radius: 12px;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
  border: 1px solid ${(props) => props.theme.palette.cuteColors.pinkSoft};
`;

const FilterRow = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchRow = styled(Box)`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const FilterControlsContainer = styled(FilterRow)`
  flex-direction: column;
  align-items: stretch;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 150px;
`;

const StyledAutocompleteTags = styled(Autocomplete)`
  min-width: 200px;
`;

const StyledAutocompleteInput = styled(TextField)`
  min-width: 200px;
`;

const StatusFormControl = styled(FormControl)`
  min-width: 120px;
`;

const FormatFormControl = styled(FormControl)`
  min-width: 120px;
`;

const YearFormControl = styled(FormControl)`
  min-width: 100px;
`;

const SeasonFormControl = styled(FormControl)`
  min-width: 100px;
`;

const SliderContainer = styled(Box)`
  max-width: 300px;
`;

const SliderBox = styled(Box)`
  margin-bottom: 16px;
`;
