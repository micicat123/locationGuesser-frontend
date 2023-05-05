import { createTheme } from "@mui/material";

const MUITheme = createTheme({
  palette: {
    primary: {
      main: "#619B8A",
    },
    text: {
      primary: "#233D4D",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "61px",
      fontWeight: 500,
      lineHeight: "70px",
      letterSpacing: "-0.5px",
    },
    h3: {
      fontSize: "48px",
      fontWeight: 500,
      lineHeight: "56.25px",
    },
    h4: {
      fontSize: "34px",
      fontWeight: 400,
      lineHeight: "39.84px",
      letterSpacing: "0.25px",
    },
    h5: {
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "28.13px",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "18.75px",
    },
  },
});

export default MUITheme;
