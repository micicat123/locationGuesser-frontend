import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import { Link as RouterLink } from "react-router-dom";
import logAction from "../common/log-action";
import DeleteLocation from "../popups/location/delete-location";

const UsersLocations = (props: {
  usersLocations: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
}) => {
  const [locations, setLocations] = useState<
    { imageUrl: any; location: any }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const imageData = [];

      for (const location of props.usersLocations) {
        try {
          const response = await axios.get(`upload/location/${location.id}`, {
            responseType: "blob",
          });

          imageData.push({
            imageUrl: URL.createObjectURL(response.data),
            location: location,
          });
        } catch (err) {
          console.log(err);
        }
      }
      setLocations(imageData);
    };
    fetchData();
  }, [props.usersLocations]);

  return (
    <>
      <Typography color="textPrimary" variant="h5" mb="21px">
        My uploads
      </Typography>

      <Grid container spacing={2}>
        {locations.map((location, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "4px",
                  width: "100%",
                  height: "100%",
                  maxHeight: "175px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                  }}
                >
                  <Link
                    to={"/edit-location"}
                    state={{ location: location }}
                    component={RouterLink}
                    onClick={() => {
                      logAction(
                        "click",
                        "button",
                        "edit-location",
                        window.location.pathname
                      );
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        height: 40,
                        maxWidth: 40,
                        minWidth: 40,
                      }}
                    >
                      <CreateIcon />
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    sx={{
                      height: 40,
                      maxWidth: 40,
                      minWidth: 40,
                      backgroundColor: "#9B6161",
                      "&:hover": {
                        backgroundColor: "#6b4545",
                      },
                    }}
                    onClick={() => {
                      logAction(
                        "click",
                        "button",
                        "remove-location",
                        window.location.pathname
                      );
                    }}
                  >
                    <DeleteLocation id={location.location.id} />
                  </Button>
                </Box>
                <Box
                  component="img"
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    position: "relative",
                    boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
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

export default UsersLocations;
