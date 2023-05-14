import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme, buttonStyle } from "../../mui/theme";
import Wrapper from "../../components/Wrapper";
import Cookies from "js-cookie";
import ClearIcon from "@mui/icons-material/Clear";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { isEqual } from "lodash";

const AddLocation = () => {
  const [file, setFile] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    "pictures/placeholder-image.png"
  );
  const [redirect, setRedirect] = useState(false);
  const [marker, setMarker] = useState<any>({ lat: -90, lng: 180 });
  const [locationName, setLocationName] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const fileInputRef = useRef<any>(null);

  const post = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response: any = await axios.post(
        `/location`,
        { latitude: marker.lat, longitude: marker.lng, address: locationName },
        { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
      );

      const formData = new FormData();
      formData.append("file", file);
      await axios.post(`upload/locations/${response.data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClick = (event: any) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newMarker }, (results: any, status) => {
      if (status === "OK") {
        if (results[0]) {
          setLocationName(results[0].formatted_address);
        } else {
          console.log("No results found");
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ mt: "51px", ml: 10, mr: 10 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography color="textPrimary" variant="h4">
              Add a new
            </Typography>
            <Typography color="primary" variant="h4" ml="0.25em">
              location.
            </Typography>
          </Box>

          <form onSubmit={(e: SyntheticEvent) => post(e)}>
            <img
              src={previewImage}
              alt="upload profile picture"
              width={860}
              height={280}
              style={{
                objectFit: "cover",
                marginTop: "16px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "23px",
              }}
            />
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  width: "53.75rem",
                  margin: "auto",
                  gap: 3,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: 40,
                    width: 200,
                    fontWeight: 400,
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="upload-file"
                    ref={fileInputRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    required
                  />
                  UPLOAD IMAGE
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
                  onClick={() => {
                    setPreviewImage("pictures/placeholder-image.png");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = null;
                    }
                  }}
                >
                  <ClearIcon />
                </Button>
              </Box>
            </div>
            {apiKey ? (
              <>
                <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap
                    onClick={handleClick}
                    mapContainerStyle={{
                      width: "860px",
                      height: "197px",
                      margin: "23px auto 23px auto",
                    }}
                    center={
                      isEqual(marker, { lat: -90, lng: 180 })
                        ? { lat: 0, lng: 0 }
                        : marker
                    }
                    zoom={2}
                    options={{
                      disableDefaultUI: true,
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }],
                        },
                        {
                          featureType: "transit",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }],
                        },
                        {
                          featureType: "road",
                          elementType: "labels.text.fill",
                          stylers: [{ visibility: "off" }],
                        },
                        {
                          featureType: "road.highway",
                          elementType: "geometry.fill",
                          stylers: [{ color: "#FFA25C" }],
                        },
                        {
                          featureType: "water",
                          elementType: "geometry.fill",
                          stylers: [{ color: "#75CFF0" }],
                        },
                        {
                          featureType: "landscape.natural",
                          elementType: "geometry.fill",
                          stylers: [{ color: "#B6E59E" }],
                        },
                      ],
                    }}
                  >
                    <Marker position={marker} />
                  </GoogleMap>
                </LoadScript>
                <Box
                  sx={{
                    width: "860px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Typography
                    color="textPrimary"
                    variant="body1"
                    sx={{ mb: "11px" }}
                  >
                    Location
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    value={locationName}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => {}}
                    required
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: "16px",
                      mb: "50px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ buttonStyle }}
                      type="submit"
                    >
                      ADD NEW
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <></>
            )}
          </form>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default AddLocation;
