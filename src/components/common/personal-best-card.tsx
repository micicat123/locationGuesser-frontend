import { Box, Button, Typography } from "@mui/material";
import { MUITheme } from "../../mui/theme";
import { useEffect, useState } from "react";
import axios from "axios";
import logAction from "./log-action";
import { useNavigate } from "react-router-dom";

const PersonalBestCard = (props: {
  distance: number;
  id: number;
  maxHeight: string;
  location: any;
  user_id: number;
}) => {
  const [image, setImage] = useState<string>("");
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`upload/location/${props.id}`, {
        responseType: "blob",
      });
      setImage(URL.createObjectURL(response.data));
    };
    fetchData();
  }, [props]);

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        maxHeight: props.maxHeight,
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
        zIndex: 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",

            width: "100%",
            height: "100%",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#619B8A",
            },
          }}
        >
          <Button
            onClick={() => {
              navigate("/guess-location", {
                state: {
                  location: { location: props.location, imageUrl: image },
                  user: props.user_id,
                  errorDistance: props.distance,
                  locationName: props.location.address,
                },
              });
              logAction(
                "click",
                "link",
                "link-guess-location",
                window.location.pathname
              );
            }}
            sx={{
              padding: "6px 32px",
              backgroundColor: "white",
              borderRadius: "4px",
              zIndex: 2,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#E5E5E5",
              },
            }}
          >
            Guess
          </Button>
        </Box>
      ) : null}
      <Box
        sx={{
          borderRadius: "4px",
          background: MUITheme.palette.gradients.green,
          position: "relative",
          width: "100%",
          maxHeight: props.maxHeight,
          height: "100%",
          zIndex: hovered ? -1 : undefined,
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
            position: "relative",
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
            zIndex: -1,
          }}
          src={image}
        />
      </Box>
    </Box>
  );
};

export default PersonalBestCard;
