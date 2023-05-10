import { Box, Typography } from "@mui/material";
import { MUITheme } from "../../mui/theme";
import { useEffect, useState } from "react";
import axios from "axios";

const PersonalBestCard = (props: { distance: number; id: number }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`upload/location/${props.id}`, {
        responseType: "blob",
      });
      setImage(URL.createObjectURL(response.data));
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        borderRadius: "4px",
        background: MUITheme.palette.gradients.green,
        position: "relative",
        width: "100%",
        maxWidth: "420px",
        maxHeight: "236.56px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      >
        <Typography color="white" variant="h2">
          {props.distance} m
        </Typography>
      </Box>
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
        src={image}
      />
    </Box>
  );
};

export default PersonalBestCard;
