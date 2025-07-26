import { createTheme, Theme } from "@mui/material/styles";

// Define custom color palette for cute pink theme
const cuteColors = {
  // Pink gradients and shades
  pinkPrimary: "#ff69b4", // Hot pink
  pinkLight: "#ffb3e6", // Light pink
  pinkSoft: "#ffc0cb", // Soft pink
  pinkPastel: "#f8d7da", // Pastel pink
  pinkBlush: "#fdf2f8", // Very light pink background

  // Purple gradients
  purplePrimary: "#da70d6", // Orchid
  purpleLight: "#dda0dd", // Plum
  purpleSoft: "#e6e6fa", // Lavender

  // Cute accent colors
  peach: "#ffb347", // Peach
  lavender: "#b19cd9", // Lavender
  mintGreen: "#98fb98", // Pale green
  skyBlue: "#87ceeb", // Sky blue
  cream: "#fffdd0", // Cream
  coral: "#ff7f7f", // Coral

  // Neutral colors
  grayLight: "#f5f5f5",
  grayMedium: "#9ca3af",
  grayDark: "#374151",

  // Overlay colors
  blackOverlay: "rgba(0, 0, 0, 0.7)",
  whiteOverlay: "rgba(255, 255, 255, 0.9)",
  pinkOverlay: "rgba(255, 105, 180, 0.1)",

  // Shadow colors
  pinkShadow: "rgba(255, 105, 180, 0.2)",
  softShadow: "rgba(0, 0, 0, 0.1)",
  cuteGlow: "rgba(255, 192, 203, 0.3)",
};

// Create base theme with palette and typography
const baseTheme = createTheme({
  palette: {
    cuteColors,
    primary: {
      main: cuteColors.pinkPrimary, // Hot pink for primary actions
      light: cuteColors.pinkLight,
      dark: "#e91e63", // Deep pink
      contrastText: "#ffffff",
    },
    secondary: {
      main: cuteColors.peach, // Peach accent
      light: "#ffd699",
      dark: "#ff9500",
      contrastText: "#1f2937",
    },
    background: {
      default: cuteColors.pinkBlush, // Very light pink background
      paper: "#ffffff", // Pure white paper
    },
    text: {
      primary: cuteColors.grayDark, // Dark gray text
      secondary: cuteColors.grayMedium, // Muted gray text
    },
    info: {
      main: cuteColors.lavender, // Lavender for info
      light: cuteColors.purpleLight,
      dark: cuteColors.purplePrimary,
    },
    success: {
      main: cuteColors.mintGreen, // Mint green for success
      light: "#ccffcc",
      dark: "#66ff66",
    },
    warning: {
      main: cuteColors.peach, // Peach for warnings
      light: "#ffd699",
      dark: "#ff9500",
    },
    error: {
      main: "#ff6b9d", // Soft rose for errors
      light: "#ffb3d1",
      dark: "#e91e63",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Create final theme with component overrides
export const muiTheme = createTheme(baseTheme, {
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: "#ffffff",
          borderRadius: 16,
          border: `1px solid ${theme.palette.cuteColors.pinkSoft}`,
          boxShadow: `0 4px 6px -1px ${theme.palette.cuteColors.pinkShadow}, 0 2px 4px -1px ${theme.palette.cuteColors.softShadow}`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 10px 15px -3px ${theme.palette.cuteColors.pinkShadow}, 0 4px 6px -2px ${theme.palette.cuteColors.pinkShadow}`,
            borderColor: theme.palette.cuteColors.pinkLight,
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: `0 4px 6px -1px ${theme.palette.cuteColors.pinkShadow}`,
          },
        }),
        contained: ({ theme }: { theme: Theme }) => ({
          "&:hover": {
            boxShadow: `0 4px 6px -1px ${theme.palette.cuteColors.pinkShadow}, 0 2px 4px -1px ${theme.palette.cuteColors.pinkShadow}`,
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 8,
          fontWeight: 500,
          backgroundColor: theme.palette.cuteColors.pinkBlush,
          color: "#be185d",
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: 12,
          "&:hover": {
            backgroundColor: theme.palette.cuteColors.pinkBlush,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: theme.palette.cuteColors.cream,
            "& fieldset": {
              borderColor: theme.palette.cuteColors.purpleSoft,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.cuteColors.purpleLight,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.cuteColors.pinkPrimary,
            },
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.cuteColors.whiteOverlay,
          borderBottom: `1px solid ${theme.palette.cuteColors.pinkSoft}`,
          boxShadow: `0 1px 3px 0 ${theme.palette.cuteColors.pinkShadow}, 0 1px 2px 0 ${theme.palette.cuteColors.softShadow}`,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundImage: `linear-gradient(135deg, ${theme.palette.cuteColors.cream} 0%, ${theme.palette.cuteColors.pinkBlush} 100%)`,
          borderRadius: 16,
          border: `1px solid ${theme.palette.cuteColors.pinkSoft}`,
        }),
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.cuteColors.pinkPrimary,
        }),
        iconHover: ({ theme }: { theme: Theme }) => ({
          color: theme.palette.cuteColors.pinkLight,
        }),
      },
    },
  },
});

// Combined theme for both MUI and styled-components
export const theme = muiTheme;
