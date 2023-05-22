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
import {
  MapOptions,
  handleClick,
} from "../../components/common/map-options-setMarker";
import logAction from "../../components/common/log-action";

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
    try {
      setPreviewImage(locate.state.location.imageUrl);
      const newMarker = {
        lat: Number(locate.state.location.location.latitude),
        lng: Number(locate.state.location.location.longitude),
      };
      setMarker(newMarker);
      setLocationName(locate.state.location.location.address);
    } catch (err) {
      setRedirect(true);
    }
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

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ mt: "51px", ml: 10, mr: 10 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography color="textPrimary" variant="h4">
              Edit{" "}
              <span style={{ color: MUITheme.palette.primary.main }}>
                location.
              </span>
            </Typography>
          </Box>
          <Box sx={{ ml: { xl: 50, lg: 30 }, mr: { xl: 50, lg: 30 } }}>
            <form onSubmit={(e: SyntheticEvent) => update(e)}>
              <img
                src={previewImage}
                alt="upload profile picture"
                width="100%"
                height={280}
                style={{
                  objectFit: "cover",
                  objectPosition: "bottom",
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
                    margin: "auto",
                    gap: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      height: 40,
                      width: { xs: "100%", sm: 200 },
                      fontWeight: 400,
                      position: "relative",
                    }}
                    onClick={() => {
                      logAction(
                        "click",
                        "button",
                        "upload-image",
                        window.location.pathname
                      );
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
                      onClick={(e) =>
                        handleClick(e, setMarker, setLocationName)
                      }
                      mapContainerStyle={{
                        height: "197px",
                        margin: "23px auto 23px auto",
                      }}
                      center={marker}
                      zoom={2}
                      options={MapOptions}
                    >
                      <Marker position={marker} />
                    </GoogleMap>
                  </LoadScript>
                  <Box
                    sx={{
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
                        sx={{
                          ...buttonStyle,
                          width: { xs: "100%", sm: "22.5%" },
                          height: 39,
                        }}
                        type="submit"
                        onClick={() => {
                          logAction(
                            "click",
                            "button",
                            "save-edited-location",
                            window.location.pathname
                          );
                        }}
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
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default EditLocation;
