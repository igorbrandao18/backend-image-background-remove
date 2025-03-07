import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        light: string;
        main: string;
        dark: string;
        hover: string;
      };
      secondary: {
        light: string;
        main: string;
        dark: string;
        hover: string;
      };
      success: {
        light: string;
        main: string;
        dark: string;
        hover: string;
      };
      error: {
        light: string;
        main: string;
        dark: string;
        hover: string;
      };
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    spacing: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      8: string;
      10: string;
      12: string;
      16: string;
      20: string;
      24: string;
      32: string;
      40: string;
      48: string;
      56: string;
      64: string;
      80: string;
    };
    radii: {
      none: string;
      sm: string;
      base: string;
      default: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      full: string;
    };
    shadows: {
      sm: string;
      base: string;
      default: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
  }
} 