import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../mui/theme";
import { useLocation } from "react-router-dom";
import { User } from "../models/user";
import Cookies from "js-cookie";
import Wrapper from "../components/Wrapper";
import PersonalBestGrid4 from "../components/profile-page/personal-best-four";
import UsersLocations from "../components/profile-page/users-locations";

/*
   <Link to={'/profile'} state={{ user: props.user }}>
      <img src={image} alt="profile" width="43" height="43" className="uploaded-profile-image"/>
   </Link>
*/

const ProfilePage = () => {
  const [user, setUser] = useState<any>(new User());

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
    setUser(location.state.user);

    const fetchData = async () => {
      if (image == "pictures/unset-profile-picture.png") {
        try {
          const response = await axios.get(`upload/user`, {
            responseType: "blob",
          });
          setImage(URL.createObjectURL(response.data));
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, []);

  //best guesses
  useEffect(() => {
    const fetchData = async () => {
      if (image != "pictures/unset-profile-picture.png") {
        const response = await axios.get(`/user/best/4/${guessPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBestGuesses((prevBestGuesses) => [
          ...prevBestGuesses,
          ...response.data.data,
        ]);
        if (response.data.isLastPage) setIsGuessLastPage(true);
      }
    };
    fetchData();
  }, [image, guessPage]);

  //users locations
  useEffect(() => {
    const fetchData = async () => {
      if (image != "pictures/unset-profile-picture.png") {
        const response = await axios.get(
          `/location/user/${usersLocationsPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsersLocations((prevUsersLocations) => [
          ...prevUsersLocations,
          ...response.data.data,
        ]);
        if (response.data.isLastPage) setIsUsersLocationsLastPage(true);
      }
    };
    fetchData();
  }, [image, usersLocationsPage]);

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
            <Avatar src={image} sx={{ width: 64, height: 64 }} />
            <Typography color="textPrimary" variant="h4">
              {user.first_name} {user.last_name}
            </Typography>
          </Box>
          <PersonalBestGrid4
            bestGuesses={bestGuesses}
            isLastPage={isGuessLastPage}
            setPage={setGuessPage}
            page={guessPage}
          />
          <UsersLocations
            usersLocations={usersLocations}
            isLastPage={isUsersLocationsLastPage}
            setPage={setUsersLocationsPage}
            page={usersLocationsPage}
          />
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default ProfilePage;
