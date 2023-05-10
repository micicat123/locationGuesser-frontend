import { Breakpoint, PaletteOptions, createTheme } from "@mui/material";

interface CustomPaletteOptions extends PaletteOptions {
  gradients: {
    green: string;
    orange: string;
  };
}

declare module "@mui/material/styles" {
  interface Palette extends CustomPaletteOptions {}
}
const MUITheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1050,
      lg: 1390,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#619B8A",
    },
    text: {
      primary: "#233D4D",
    },
    gradients: {
      green:
        "linear-gradient(90deg, rgba(102, 159, 137, 0.6) 50%, rgba(159, 193, 129, 0.6) 128%)",
      orange: "linear-gradient(41.75deg, #FE7F2D 22.78%, #FCCA46 87.18%)",
    },
  } as CustomPaletteOptions,
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "61px",
      fontWeight: 500,
      lineHeight: "70px",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "24px",
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

const buttonStyle = {
  height: 31,
  width: 137,
  fontSize: "16px",
  fontWeight: 400,
};

const lockIconStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto",
  color: "white",
  fontSize: "3rem",
};

export { MUITheme, buttonStyle, lockIconStyle };
