import * as createPalette from '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    accent: PaletteColorOptions;
    gray: PaletteColorOptions,
  }

  interface Palette {
    accent: PaletteColor,
    gray: PaletteColor,
  }

  interface SimplePaletteColorOptions {
    darkest?: string,
    darker?: string,
    dark?: string,
    darky?: string,
    lighty?: string,
    light?: string,
    lighter?: string,
    lightest?: string,
  }

  interface PaletteColor {
    darkest?: string,
    darker?: string,
    dark?: string,
    darky?: string,
    lighty?: string,
    light?: string,
    lighter?: string,
    lightest?: string,
  }
}

// Examplefor overiding button props
//  declare module '@mui/material/Button' {
//    interface ButtonPropsColorOverrides {
//      myAwesomeColor: true;
//    }
//  }