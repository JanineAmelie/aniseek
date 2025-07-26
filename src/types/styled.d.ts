import "styled-components";
import { Theme } from "@mui/material/styles";

// Define the structure of our custom colors
interface CuteColors {
  // Pink gradients and shades
  pinkPrimary: string;
  pinkLight: string;
  pinkSoft: string;
  pinkPastel: string;
  pinkBlush: string;

  // Purple gradients
  purplePrimary: string;
  purpleLight: string;
  purpleSoft: string;

  // Cute accent colors
  peach: string;
  lavender: string;
  mintGreen: string;
  skyBlue: string;
  cream: string;
  coral: string;

  // Neutral colors
  grayLight: string;
  grayMedium: string;
  grayDark: string;

  // Overlay colors
  blackOverlay: string;
  whiteOverlay: string;
  pinkOverlay: string;

  // Shadow colors
  pinkShadow: string;
  softShadow: string;
  cuteGlow: string;
}

// Extend MUI's palette interface to include our custom colors
declare module "@mui/material/styles" {
  interface Palette {
    cuteColors: CuteColors;
  }

  interface PaletteOptions {
    cuteColors?: CuteColors;
  }
}

import "styled-components";
import { Theme } from "@mui/material/styles";

// Define the cuteColors interface
interface CuteColors {
  // Pink gradients and shades
  pinkPrimary: string;
  pinkLight: string;
  pinkSoft: string;
  pinkPastel: string;
  pinkBlush: string;

  // Purple gradients
  purplePrimary: string;
  purpleLight: string;
  purpleSoft: string;

  // Cute accent colors
  peach: string;
  lavender: string;
  mintGreen: string;
  skyBlue: string;
  cream: string;
  coral: string;

  // Neutral colors
  grayLight: string;
  grayMedium: string;
  grayDark: string;

  // Overlay colors
  blackOverlay: string;
  whiteOverlay: string;
  pinkOverlay: string;

  // Shadow colors
  pinkShadow: string;
  softShadow: string;
  cuteGlow: string;
}

// Extend MUI theme types
declare module "@mui/material/styles" {
  interface Palette {
    cuteColors: CuteColors;
  }

  interface PaletteOptions {
    cuteColors?: CuteColors;
  }
}

declare module "styled-components" {
  // TODO Fix later
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
