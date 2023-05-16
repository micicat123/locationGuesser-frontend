import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
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
              <Link
                to={"/guess-location"}
                state={{ location: location, user: props.user_id }}
                component={RouterLink}
                sx={{ textDecoration: "none" }}
                onClick={() => {
                  logAction(
                    "click",
                    "link",
                    "link-guess-location",
                    window.location.pathname
                  );
                }}
              >
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
                    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
                  }}
                  src={location.imageUrl}
                />
              </Link>
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
