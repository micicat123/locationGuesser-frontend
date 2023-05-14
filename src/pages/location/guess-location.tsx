import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, ThemeProvider } from "@mui/material";
import Wrapper from "../../components/Wrapper";
import { MUITheme } from "../../mui/theme";

const GuessLocation = () => {
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "67%" }}></Box>
          <Box sx={{ width: "33%" }}></Box>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default GuessLocation;
