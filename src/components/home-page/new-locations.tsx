import { Box, Button, Grid, Typography } from "@mui/material";
import PersonalBestCard from "../common/personal-best-card";
import { useEffect, useState } from "react";
import axios from "axios";

const MostRecentLocations = (props: {
  recentLocations: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
}) => {
  const imageUrls = new Set<string>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let fetchData = async () => {
      for (const location of props.recentLocations) {
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
        {images.map((image) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={image}>
              <Box
                component="img"
                sx={{
                  borderRadius: "4px",
                  width: "100%",
                  height: "100%",
                  maxWidth: "420px",
                  maxHeight: "236.56px",
                  objectFit: "cover",
                  zIndex: -1,
                  position: "relative",
                  boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.15)",
                }}
                src={image}
              />
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

export default MostRecentLocations;
