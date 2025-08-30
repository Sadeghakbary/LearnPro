import { getFonts } from '../localization'
import fonts from './font'
import lightPalette from './lightPalette'
import darkPalette from './darkPalette'
import { createTheme } from '@mui/material/styles';

const commonSettings = {
  direction: 'rtl' as const,
  spacing: 4,
  typography: {
    allVariants: {
      fontFamily: getFonts(),
    },
    h1: {
      fontSize: fonts.h1,
    },
    h2: {
      fontSize: fonts.h2,
    },
    body1: {
      fontSize: fonts.body1,
    },
    body2: {
      fontSize: fonts.body2,
    },
    subtitle1: {
      fontSize: fonts.subtitle1,
    },
    subtitle2: {
      fontSize: fonts.subtitle2,
    },
    button: {
      textTransform: 'none' as const,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:focus': {
            border: 'none',
            outline: 'none',
          },
        },
      },
    },
  },
}

export const lightTheme = createTheme({
  ...commonSettings,
  palette: lightPalette,
})

export const darkTheme = createTheme({
  ...commonSettings,
  palette: darkPalette,
})
