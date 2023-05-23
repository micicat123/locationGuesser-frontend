import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logAction from "../common/log-action";

const MostRecentLocations = (props: {
  recentLocations: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
  user_id: number;
  allGuesses: number[];
}) => {
  interface ImageInfo {
    location: any;
    imageUrl: string;
  }
  const [locations, setLocations] = useState<ImageInfo[]>([]);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchData = async () => {
      for (const location of props.recentLocations) {
        try {
          const response = await axios.get(`upload/location/${location.id}`, {
            responseType: "blob",
          });
          setLocations((prevImages) => [
            ...prevImages,
            {
              location: location,
              imageUrl: URL.createObjectURL(response.data),
            },
          ]);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [props.recentLocations]);

  return (
    <>
      <Typography color="primary" variant="h4" mb="21px">
        New locations
      </Typography>
      <Typography color="textPrimary" variant="body1" mb="32px">
        New uploads from users. Try to guess all the locations by pressing on a
        picture.
      </Typography>
      <Grid container spacing={2}>
        {locations.map((location) => {
          if (props.allGuesses.includes(location.location.id)) {
            return null;
          }
          return (
            <Grid item xs={12} sm={6} md={4} key={location.imageUrl}>
              <Box
                component="div"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  maxWidth: "420px",
                  maxHeight: "236.56px",
                  transition: "background-color 0.3s",
                  boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
                  backgroundColor: hovered ? "#619B8A" : "transparent",
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
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      transition: "opacity 0.3s",
                    }}
                  >
                    <Button
                      onClick={() => {
                        navigate("/guess-location", {
                          state: { location: location, user: props.user_id },
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
                  component="img"
                  sx={{
                    borderRadius: "4px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "420px",
                    maxHeight: "236.56px",
                    objectFit: "cover",
                    position: "relative",
                    opacity: hovered ? 0 : 1,
                    transition: "opacity 0.3s",
                  }}
                  src={location.imageUrl}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.isLastPage ? (
          <div style={{ marginBottom: "50px" }}></div>
        ) : (
          <Button
            variant="outlined"
            sx={{
              height: 43,
              width: 132,
              fontWeight: 400,
              fontSize: "16px",
              mt: "32px",
              mb: "24px",
            }}
            onClick={() => {
              props.setPage(props.page + 1);
              logAction(
                "click",
                "button",
                "load more",
                window.location.pathname
              );
            }}
          >
            LOAD MORE
          </Button>
        )}
      </Box>
    </>
  );
};

export default MostRecentLocations;
