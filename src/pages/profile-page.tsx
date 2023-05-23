import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../mui/theme";
import { Navigate, useLocation } from "react-router-dom";
import { User } from "../models/user";
import Cookies from "js-cookie";
import Wrapper from "../components/Wrapper";
import PersonalBestGrid4 from "../components/profile-page/personal-best-four";
import UsersLocations from "../components/profile-page/users-locations";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(new User());
  const [isMounted, setIsMounted] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [bestGuesses, setBestGuesses] = useState<any[]>([]);
  const [guessPage, setGuessPage] = useState(1);
  const [isGuessLastPage, setIsGuessLastPage] = useState(false);

  const [usersLocations, setUsersLocations] = useState<any[]>([]);
  const [usersLocationsPage, setUsersLocationsPage] = useState(1);
  const [isUsersLocationsLastPage, setIsUsersLocationsLastPage] =
    useState(false);

  const [image, setImage] = useState<string>(
    "pictures/unset-profile-picture.png"
  );
  const token = Cookies.get("jwt");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(location.state.user);
      } catch (err) {
        setRedirect(true);
      }
    };
    fetchData();
  }, []);

  //best guesses
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/user/best/4/${guessPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBestGuesses((prevBestGuesses) => [
        ...prevBestGuesses,
        ...response.data.data,
      ]);
      if (response.data.isLastPage) setIsGuessLastPage(true);
    };
    fetchData();
  }, [isMounted, guessPage]);

  //users locations
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/location/user/${usersLocationsPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsersLocations((prevUsersLocations) => [
        ...prevUsersLocations,
        ...response.data.data,
      ]);
      if (response.data.isLastPage) setIsUsersLocationsLastPage(true);
    };
    fetchData();
  }, [isMounted, usersLocationsPage]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box mt="64px" ml={11} mr={11}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Avatar src={location.state.image} sx={{ width: 64, height: 64 }} />
            <Typography color="textPrimary" variant="h4">
              {user.first_name} {user.last_name}
            </Typography>
          </Box>
          {bestGuesses.length > 0 && (
            <PersonalBestGrid4
              bestGuesses={bestGuesses}
              isLastPage={isGuessLastPage}
              setPage={setGuessPage}
              page={guessPage}
              user_id={user.id}
            />
          )}
          {usersLocations.length > 0 && (
            <UsersLocations
              usersLocations={usersLocations}
              isLastPage={isUsersLocationsLastPage}
              setPage={setUsersLocationsPage}
              page={usersLocationsPage}
            />
          )}

          {bestGuesses.length < 1 && usersLocations.length < 1 && (
            <Box
              sx={{
                mt: 10,
                mb: 75,
              }}
            >
              <Typography
                color="textPrimary"
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  height: "5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                You haven't guessed or uploaded any locations yet.
              </Typography>
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default ProfilePage;
