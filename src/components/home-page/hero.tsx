import {
  Box,
  Button,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { MUITheme, buttonStyle } from "../../mui/theme";
import logAction from "../common/log-action";

const HomePageHero = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={MUITheme}>
      <Box
        component="img"
        alt="Backround image."
        src="/pictures/background-world-map.png"
        mt={"2rem"}
        position="absolute"
        right="0"
        zIndex="-1"
      />

      <Box
        sx={{
          width: "70%",
          marginLeft: "10%",
          paddingTop: "13%",
        }}
      >
        <Typography
          color="primary"
          variant="h1"
          sx={{ whiteSpace: "pre-line" }}
        >
          Explore the{"\n"} world with {"\n"}Geotagger!
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            maxWidth: "25rem",
            mt: "32px",
            mb: "18px",
          }}
        >
          Geotagger is website that allows you to post picture and tag it on the
          map. Other user than try to locate it via Google Maps.
        </Typography>
        <Button
          href="/signup"
          variant="contained"
          sx={buttonStyle}
          onClick={() => {
            logAction("click", "button", "signup", window.location.pathname);
          }}
        >
          SIGN UP
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default HomePageHero;
