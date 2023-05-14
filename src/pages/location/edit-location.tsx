import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { MUITheme, buttonStyle } from "../../mui/theme";
import Wrapper from "../../components/Wrapper";
import Cookies from "js-cookie";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const EditLocation = () => {
  const [file, setFile] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    "pictures/placeholder-image.png"
  );
  const [redirect, setRedirect] = useState(false);
  const [marker, setMarker] = useState<any>({ lat: -90, lng: 180 });
  const [locationName, setLocationName] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const locate = useLocation();

  useEffect(() => {
    setPreviewImage(locate.state.location.imageUrl);
    const newMarker = {
      lat: Number(locate.state.location.location.latitude),
      lng: Number(locate.state.location.location.longitude),
    };
    setMarker(newMarker);
    setLocationName(locate.state.location.location.address);
  }, []);

  const update = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (locate.state.location.location.address != locationName) {
        const response: any = await axios.put(
          `/location/${locate.state.location.location.id}`,
          {
            latitude: marker.lat,
            longitude: marker.lng,
            address: locationName,
          },
          { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
        );
      }
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(
          `upload/locations/${locate.state.location.location.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
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
      } else if (status === "ZERO_RESULTS") {
        setLocationName("Name for this location is not defined");
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
              Edit
            </Typography>
            <Typography color="primary" variant="h4" ml="0.25em">
              location.
            </Typography>
          </Box>

          <form onSubmit={(e: SyntheticEvent) => update(e)}>
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
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  UPLOAD IMAGE
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
                    center={marker}
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
                      SAVE
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

export default EditLocation;
