import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Wrapper from "../../components/Wrapper";
import { MUITheme, buttonStyle } from "../../mui/theme";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { isEqual } from "lodash";
import {
  MapOptions,
  handleClick,
} from "../../components/common/map-options-setMarker";
import Leaderboard from "../../components/leaderboard";
import logAction from "../../components/common/log-action";

const GuessLocation = () => {
  const location = useLocation();
  const [marker, setMarker] = useState<any>({ lat: -90, lng: 180 });
  const [locationName, setLocationName] = useState<string>("");
  const [errorDistance, setErrorDistance] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const guess = async (e: SyntheticEvent) => {
    e.preventDefault();
    const distance = getErrorDistance(marker.lat, marker.lng);
    try {
      await axios.post(
        `/guess/${location.state.location.location.id}/${distance}`,
        {},
        { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
      );
    } catch (err) {
      console.log(err);
    }
    setErrorDistance(distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
  };

  function getErrorDistance(lat2: number, lon2: number) {
    const lat1: number = location.state.location.location.latitude;
    const lon1: number = location.state.location.location.longitude;
    const R = 6371000;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d: number = R * c;
    return d.toFixed(0);
  }

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ display: "flex", ml: 10, mr: 10, mt: "66px" }}>
          <Box sx={{ width: "67%" }}>
            <Typography color="textPrimary" variant="h4">
              Take a{" "}
              <span style={{ color: MUITheme.palette.primary.main }}>
                guess{" "}
              </span>
              !
            </Typography>
            <img
              src={location.state.location.imageUrl}
              width={"100%"}
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

            {apiKey ? (
              <>
                <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap
                    onClick={
                      errorDistance === null
                        ? (e) => handleClick(e, setMarker, setLocationName)
                        : undefined
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
                <form onSubmit={(e: SyntheticEvent) => guess(e)}>
                  <Box
                    sx={{
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                          sx={{ mb: "11px" }}
                        >
                          Error distance
                        </Typography>
                        <TextField
                          value={
                            errorDistance !== null ? errorDistance + " m" : ""
                          }
                        />
                      </Box>
                      <Box sx={{ width: "70%" }}>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                          sx={{ mb: "11px" }}
                        >
                          Guessed location
                        </Typography>
                        <TextField
                          sx={{ width: "100%" }}
                          value={locationName}
                          required
                        />
                      </Box>
                    </Box>
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
                        sx={{ ...buttonStyle, width: "137px", height: "39px" }}
                        type="submit"
                        disabled={errorDistance !== null}
                        onClick={() => {
                          logAction(
                            "click",
                            "button",
                            "guess",
                            window.location.pathname
                          );
                        }}
                      >
                        GUESS
                      </Button>
                    </Box>
                  </Box>
                </form>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box sx={{ width: "33%", ml: "20px" }}>
            <Leaderboard
              location_id={location.state.location.location.id}
              errorDistance={errorDistance}
              userId={location.state.user}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default GuessLocation;
