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
import {
  MapOptions,
  handleClick,
} from "../../components/common/map-options-setMarker";
import logAction from "../../components/common/log-action";
import React from "react";

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
      console.log(locationName);
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
    logAction("changed value", "file", "file", window.location.pathname);
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
              Add a new{" "}
              <span style={{ color: MUITheme.palette.primary.main }}>
                location.
              </span>
            </Typography>
          </Box>
          <Box sx={{ ml: { xl: 50, lg: 30 }, mr: { xl: 50, lg: 30 } }}>
            <form onSubmit={(e: SyntheticEvent) => post(e)}>
              <img
                src={previewImage}
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
                      width: { xs: "100%", sm: "40%" },
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
                      logAction(
                        "click",
                        "button",
                        "clear-image",
                        window.location.pathname
                      );
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
                      onClick={(e) =>
                        handleClick(e, setMarker, setLocationName)
                      }
                      mapContainerStyle={{
                        width: "100%",
                        height: "197px",
                        margin: "23px auto 23px auto",
                      }}
                      center={
                        isEqual(marker, { lat: -90, lng: 180 })
                          ? { lat: 0, lng: 0 }
                          : marker
                      }
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
                        sx={{
                          ...buttonStyle,
                          width: { xs: "100%", sm: "25%" },
                          height: 39,
                        }}
                        type="submit"
                        onClick={() => {
                          logAction(
                            "click",
                            "button",
                            "add-location",
                            window.location.pathname
                          );
                        }}
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
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default AddLocation;
