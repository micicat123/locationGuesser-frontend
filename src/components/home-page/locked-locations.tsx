import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MUITheme, buttonStyle, lockIconStyle } from "../../mui/theme";
import { useEffect, useState } from "react";
import axios from "axios";

const LockedLocations = (props: any) => {
  const theme = useTheme();
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      for (const id of props.ids) {
        try {
          const response = await axios.get(`upload/location/${id}`, {
            responseType: "blob",
          });
          setImages((prevArray) => [
            ...prevArray,
            URL.createObjectURL(response.data),
          ]);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [props.ids]);

  return (
    <ThemeProvider theme={MUITheme}>
      <Box sx={{ textAlign: "center", mt: "223px" }}>
        <Typography color="primary" variant="h4">
          Try yourself at Geotagger!
        </Typography>
        <Typography
          color="textPrimary"
          variant="body1"
          sx={{
            maxWidth: "35rem",
            marginLeft: "auto",
            marginRight: "auto",
            mt: "29px",
            mb: "74px",
          }}
        >
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "19px",
            justifyContent: "center",
            alignItems: "center",
            mb: "82px",
            ml: 5,
            mr: 5,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              background: MUITheme.palette.gradients.green,
              height: 235,
              width: 420,
              position: "relative",
              borderRadius: "4px",
            }}
          >
            <LockOutlinedIcon sx={lockIconStyle} />
            <Box
              component="img"
              sx={{
                borderRadius: "4px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
                position: "relative",
                boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
              }}
              src={images[0]}
            />
          </Box>
          <Box
            sx={{
              background: MUITheme.palette.gradients.green,
              borderRadius: "4px",
              height: 235,
              width: 420,
              position: "relative",
            }}
          >
            <LockOutlinedIcon sx={lockIconStyle} />
            <Box
              component="img"
              sx={{
                borderRadius: "4px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
                position: "relative",
                boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
              }}
              src={images[1]}
            />
          </Box>
          <Box
            sx={{
              background: MUITheme.palette.gradients.green,
              height: 235,
              width: 420,
              position: "relative",
              borderRadius: "4px",
            }}
          >
            <LockOutlinedIcon sx={lockIconStyle} />
            <Box
              component="img"
              sx={{
                borderRadius: "4px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: -1,
                position: "relative",
                boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
              }}
              src={images[2]}
            />
          </Box>
        </Box>
        <Button
          href="/signup"
          variant="contained"
          sx={{ ...buttonStyle, marginBottom: "107px" }}
        >
          SIGN UP
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default LockedLocations;
