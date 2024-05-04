import { createTheme } from "@mui/material";

//Define breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 450,
    md: 600,
    lg: 960,
    xl: 1280,
    xxl: 1920,
    custom: 800,
  },
};

const palette = {
  mode: "light",
};

// Create custom theme with custom breakpoints
const theme = createTheme({
  breakpoints: { ...breakpoints },
  palette,
});

export default theme;
