import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";
import ClearIcon from "@mui/icons-material/Clear";

const UsersLocations = (props: {
  usersLocations: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
}) => {
  const imageUrls = new Set<string>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      for (const location of props.usersLocations) {
        try {
          const response = await axios.get(`upload/location/${location.id}`, {
            responseType: "blob",
          });
          imageUrls.add(URL.createObjectURL(response.data));
        } catch (err) {
          console.log(err);
        }
      }
      const uniqueImages = Array.from(imageUrls);
      setImages(uniqueImages);
    };
    fetchData();
  }, [props.usersLocations]);

  return (
    <>
      <Typography color="textPrimary" variant="h5" mb="21px">
        My uploads
      </Typography>

      <Grid container spacing={2}>
        {images.map((image) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "4px",
                  width: "100%",
                  height: "100%",
                  maxWidth: "309px",
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
                  >
                    <ClearIcon />
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
                  src={image}
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
            onClick={() => props.setPage(props.page + 1)}
          >
            LOAD MORE
          </Button>
        )}
      </Box>
    </>
  );
};

export default UsersLocations;
