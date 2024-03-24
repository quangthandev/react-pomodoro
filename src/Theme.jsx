import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        1: 'var(--color-primary-1)',
        2: 'var(--color-primary-2)',
        3: 'var(--color-primary-3)'
    },
    fontSizes: {
        large: "2em",
        medium: "1.5em",
        small: "1em"
    }
};

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
  
  export default Theme;
