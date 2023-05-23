import { Box, Hidden, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../mui/theme";

const Footer = () => {
  return (
    <ThemeProvider theme={MUITheme}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: MUITheme.palette.primary.main,
          paddingTop: "1rem",
          paddingBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          bottom: 0,
        }}
      >
        <Hidden smDown>
          <Box sx={{ ml: 11 }}>
            <img
              src="/pictures/logo-letters.png"
              alt="logo"
              className="logo"
              width={125}
            />
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box sx={{ ml: 11 }}>
            <img
              src="/pictures/logo-responsive.png"
              alt="logo"
              className="logo"
            />
          </Box>
        </Hidden>

        <Typography color="white" variant="body1" sx={{ mr: 11 }}>
          All Rights Reserved | skillupmentor.com
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
