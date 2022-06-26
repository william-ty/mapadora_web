import {
  createTheme,
  Palette,
  PaletteOptions,
  PaletteColorOptions,
} from "@mui/material/styles";
import { basePalette } from "./_variables";
import { advancedPalette } from "./_variables";

// THEME
const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  // Palette Custom Theme
  palette: {
    primary: {
      main: basePalette.colorPrimary,
      darkest: advancedPalette.colorPrimaryDarkest,
      darker: advancedPalette.colorPrimaryDarker,
      dark: advancedPalette.colorPrimaryDark,
      darky: advancedPalette.colorPrimaryDarky,
      lighty: advancedPalette.colorPrimaryLighty,
      light: advancedPalette.colorPrimaryLight,
      lighter: advancedPalette.colorPrimaryLighter,
      lightest: advancedPalette.colorPrimaryLightest,
      // contrastText: will be calculated to contrast with palette.primary.main
      // contrastText: '#ffcc00',
    },
    secondary: {
      main: basePalette.colorSecondary,
      darkest: advancedPalette.colorSecondaryDarkest,
      darker: advancedPalette.colorSecondaryDarker,
      dark: advancedPalette.colorSecondaryDark,
      darky: advancedPalette.colorSecondaryDarky,
      lighty: advancedPalette.colorSecondaryLighty,
      light: advancedPalette.colorSecondaryLight,
      lighter: advancedPalette.colorSecondaryLighter,
      lightest: advancedPalette.colorSecondaryLightest,
    },
    accent: {
      main: basePalette.colorAccent,
      darkest: advancedPalette.colorAccentDarkest,
      darker: advancedPalette.colorAccentDarker,
      dark: advancedPalette.colorAccentDark,
      darky: advancedPalette.colorAccentDarky,
      lighty: advancedPalette.colorAccentLighty,
      light: advancedPalette.colorAccentLight,
      lighter: advancedPalette.colorAccentLighter,
      lightest: advancedPalette.colorAccentLightest,
    },
    gray: {
      main: basePalette.colorGray,
      darkest: advancedPalette.colorGrayDarkest,
      darker: advancedPalette.colorGrayDarker,
      dark: advancedPalette.colorGrayDark,
      darky: advancedPalette.colorGrayDarky,
      lighty: advancedPalette.colorGrayLighty,
      light: advancedPalette.colorGrayLight,
      lighter: advancedPalette.colorGrayLighter,
      lightest: advancedPalette.colorGrayLightest,
    },
    warning: {
      main: basePalette.colorWarning,
      darkest: advancedPalette.colorWarningDarkest,
      darker: advancedPalette.colorWarningDarker,
      dark: advancedPalette.colorWarningDark,
      darky: advancedPalette.colorWarningDarky,
      lighty: advancedPalette.colorWarningLighty,
      light: advancedPalette.colorWarningLight,
      lighter: advancedPalette.colorWarningLighter,
      lightest: advancedPalette.colorWarningLightest,
    },

    // https://stackoverflow.com/questions/50069724/how-to-add-custom-mui-palette-colors

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },

  // Components Custom Theme
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: advancedPalette.colorPrimaryDarky,
          },
          borderRadius: 4
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    // MuiLink: {
    //   styleOverrides: {
    //     root: {
    //       color: basePalette.colorAccent
    //     },
    //   },
    // }
  },
});

// Custom Border Radius
theme.shape.borderRadius = 2;

export default theme;

// MUI tips here :
/*
The Box component works as a "Wrapper" for the component you want to "Modify" the spacing.

then you can use the next properties on the component:

The space utility converts shorthand margin and padding props to margin and padding CSS declarations. The props are named using the format {property}{sides}.

Where property is one of:

m - for classes that set margin p - for classes that set padding

Where sides is one of:

t - for classes that set margin-top or padding-top

b - for classes that set margin-bottom or padding-bottom

l - for classes that set margin-left or padding-left

r - for classes that set margin-right or padding-right

x - for classes that set both *-left and *-right

y - for classes that set both *-top and *-bottom

blank - for classes that set a margin or padding on all 4 sides of the element
*/
