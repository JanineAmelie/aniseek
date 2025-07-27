import { text } from "@/constants/text";
import { MediaFormat, MediaSort, MediaStatus } from "@/types/anime";
import { generateYearOptions } from "@/utils/generateYearOptions";

export type FilterOption = {
  value: string | number;
  label: string;
};

export type FilterConfig = {
  key: string;
  label: string;
  value: MediaSort | MediaStatus | MediaFormat | number | "";
  onChange: (value: string | number) => void;
  options: FilterOption[];
};

export type SearchFiltersCallbacks = {
  onSortChange: (sort: MediaSort) => void;
  onStatusChange: (status: MediaStatus | "") => void;
  onFormatChange: (format: MediaFormat | "") => void;
  onYearChange: (year: number | "") => void;
};

export type SearchFiltersValues = {
  sortBy: MediaSort;
  statusFilter: MediaStatus | "";
  formatFilter: MediaFormat | "";
  yearFilter: number | "";
};

export function createFilterConfigs({
  values,
  callbacks,
}: {
  values: SearchFiltersValues;
  callbacks: SearchFiltersCallbacks;
}): FilterConfig[] {
  return [
    {
      key: "sortBy",
      label: text.search.filters.sortBy,
      value: values.sortBy,
      onChange: value => callbacks.onSortChange(value as MediaSort),
      options: [
        {
          value: MediaSort.PopularityDesc,
          label: text.search.filters.sortOptions.popularityDesc,
        },
        {
          value: MediaSort.ScoreDesc,
          label: text.search.filters.sortOptions.scoreDesc,
        },
        {
          value: MediaSort.TitleRomaji,
          label: text.search.filters.sortOptions.titleAsc,
        },
        {
          value: MediaSort.StartDateDesc,
          label: text.search.filters.sortOptions.newestFirst,
        },
        {
          value: MediaSort.TrendingDesc,
          label: text.search.filters.sortOptions.trending,
        },
      ],
    },
    {
      key: "status",
      label: text.search.filters.status,
      value: values.statusFilter,
      onChange: value => callbacks.onStatusChange(value as MediaStatus | ""),
      options: [
        { value: "", label: text.search.filters.statusOptions.all },
        {
          value: MediaStatus.Releasing,
          label: text.search.filters.statusOptions.airing,
        },
        {
          value: MediaStatus.Finished,
          label: text.search.filters.statusOptions.completed,
        },
        {
          value: MediaStatus.NotYetReleased,
          label: text.search.filters.statusOptions.upcoming,
        },
      ],
    },
    {
      key: "format",
      label: text.search.filters.format,
      value: values.formatFilter,
      onChange: value => callbacks.onFormatChange(value as MediaFormat | ""),
      options: [
        { value: "", label: text.search.filters.formatOptions.all },
        { value: MediaFormat.Tv, label: text.search.filters.formatOptions.tv },
        {
          value: MediaFormat.Movie,
          label: text.search.filters.formatOptions.movie,
        },
        {
          value: MediaFormat.Ova,
          label: text.search.filters.formatOptions.ova,
        },
        {
          value: MediaFormat.Special,
          label: text.search.filters.formatOptions.special,
        },
      ],
    },
    {
      key: "year",
      label: text.search.filters.year,
      value: values.yearFilter,
      onChange: value => callbacks.onYearChange(value as number | ""),
      options: [
        { value: "", label: text.search.filters.yearOptions.all },
        ...generateYearOptions().map(year => ({
          value: year,
          label: year.toString(),
        })),
      ],
    },
  ];
}
