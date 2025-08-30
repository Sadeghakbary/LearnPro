export interface FontType {
  h1: string
  h2: string
  body1: string
  body2: string
  subtitle1: string
  subtitle2: string
  caption: string
}

export interface CustomThemeType {
  palette:{
    primary: {
      light: string
      main: string
      hover: string
      dark: string
      contrastText: string
      shadow: string
    }
    secondary: {
      main: string
      contrastText: string
    }
    success: {
      main: string
      contrastText: string
    }
    info: {
      main: string
      contrastText: string
    }
    text: {
      primary: string
      secondary: string
      disabled: string
      inActiveMenu: string
      activeMenu: string
    }
    icon: {
      shoppIcon: string
    }
    background: {
      default: string
      paper: string
    }
  }
}
