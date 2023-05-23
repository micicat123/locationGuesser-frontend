import { Box, Button, Hidden, ThemeProvider, Typography } from "@mui/material";
import { MUITheme, buttonStyle } from "../../mui/theme";
import logAction from "../common/log-action";

const HomePageHero = () => {
  return (
    <ThemeProvider theme={MUITheme}>
      <Hidden mdDown>
        <Box
          component="img"
          alt="Backround image."
          src="/pictures/background-world-map.png"
          mt={"2rem"}
          position="absolute"
          right="0"
          zIndex="-1"
        />
      </Hidden>

      <Box
        sx={{
          width: "70%",
          marginLeft: { xs: "auto", sm: "auto", md: "10%" },
          mr: "auto",
          paddingTop: "13%",
        }}
      >
        <Hidden mdDown>
          <Typography
            color="primary"
            variant="h1"
            sx={{ whiteSpace: "pre-line" }}
          >
            Explore the{"\n"} world with {"\n"}Geotagger!
          </Typography>
        </Hidden>
        <Hidden mdUp>
          <Typography
            color="primary"
            variant="h1"
            sx={{ textAlign: "center", p: 2 }}
          >
            Explore the world with Geotagger!
          </Typography>
        </Hidden>

        <Typography
          color="textPrimary"
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            maxWidth: "25rem",
            mt: "32px",
            mb: "18px",
            ml: { xs: "auto", sm: "auto", md: 0, lg: 0, xl: 0 },
            mr: { xs: "auto", sm: "auto", md: 0, lg: 0, xl: 0 },
            textAlign: { sm: "center", md: "unset" },
          }}
        >
          Geotagger is website that allows you to post picture and tag it on the
          map. Other user than try to locate it via Google Maps.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start",
              lg: "flex-start",
            },
          }}
        >
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
      </Box>
      <Hidden mdUp>
        <Box sx={{ mt: 2, ml: "auto", mr: "auto", p: 2 }}>
          <Box
            component="img"
            alt="Backround image."
            src="/pictures/background-world-map.png"
            width="100%"
          />
        </Box>
      </Hidden>
    </ThemeProvider>
  );
};

export default HomePageHero;
