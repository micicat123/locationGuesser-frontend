import { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../components/Wrapper";
import HomePageHero from "../components/home-page/hero";
import LockedLocations from "../components/home-page/locked-locations";
import Cookies from "js-cookie";
import { Box, Button, ThemeProvider } from "@mui/material";
import { MUITheme, buttonStyle } from "../mui/theme";
import PersonalBestGrid3 from "../components/home-page/personal-best-three";
import MostRecentLocations from "../components/home-page/new-locations";
import DeleteLocation from "../components/popups/location/delete-location";

const HomePage = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);
  const [imageIds, setImageIds] = useState<number[]>([]);

  const [guessPage, setGuessPage] = useState(1);
  const [locationPage, setLocationPage] = useState(1);

  const [recentLocations, setRecentLocations] = useState<any[]>([]);
  const [bestGuesses, setBestGuesses] = useState<any[]>([]);
  const [allGuesses, setAllGuesses] = useState<any[]>([]);

  const [isGuessLastPage, setIsGuessLastPage] = useState(false);
  const [isLocationLastPage, setIsLocationLastPage] = useState(false);

  let admin = false;

  useEffect(() => {
    (async () => {
      try {
        //check for user status
        const response = (await axios.get("/auth/admin")).data.body;
        if (response.user.id) setUserId(response.user.id);
        if (response.message !== "This user is not logged in")
          setLoggedin(true);
        if (response.message === "This user is an admin") setIsAdmin(true);
      } catch (err) {}
      setLoading(false);
      setIsMounted(true);
    })();
  }, []);

  //get users guesses
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const token = Cookies.get("jwt");
          const response = await axios.get(`/user/best/3/${guessPage}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBestGuesses((prevBestGuesses) => [
            ...prevBestGuesses,
            ...response.data.data,
          ]);
          if (response.data.isLastPage) setIsGuessLastPage(true);

          const guesses = await axios.get(`/user/guesses`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          for (const guess of guesses.data) {
            setAllGuesses((oldIds) => [...oldIds, guess.location.id]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [guessPage, loggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get most recent locations
        if (isMounted) {
          const responseLocation = await axios.get(`/location/${locationPage}`);
          if (responseLocation.data.isLastPage) setIsLocationLastPage(true);
          setRecentLocations(responseLocation.data.data);

          const newImageKeys = [
            responseLocation.data.data[0].id,
            responseLocation.data.data[1].id,
            responseLocation.data.data[2].id,
          ];
          setImageIds(newImageKeys);
        }
      } catch (error) {}
    };

    fetchData();
  }, [locationPage, isMounted]);

  if (loading) {
    return <div>Loading...</div>;
  }
  //user is logged in
  if (loggedIn) {
    return (
      <Wrapper>
        <ThemeProvider theme={MUITheme}>
          {isAdmin && (
            <Box
              sx={{
                mt: 11,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                href="/admin"
                variant="contained"
                sx={{ ...buttonStyle, height: 50, width: 210 }}
              >
                SHOW LOGS
              </Button>
            </Box>
          )}
          <Box
            mt="83px"
            sx={{
              ml: 11,
              mr: 11,
            }}
          >
            {bestGuesses.length > 0 && (
              <PersonalBestGrid3
                bestGuesses={bestGuesses}
                isLastPage={isGuessLastPage}
                setPage={setGuessPage}
                page={guessPage}
                user_id={userId}
              />
            )}
            <MostRecentLocations
              recentLocations={recentLocations}
              isLastPage={isLocationLastPage}
              setPage={setLocationPage}
              page={locationPage}
              user_id={userId}
              allGuesses={allGuesses}
            />
          </Box>
        </ThemeProvider>
      </Wrapper>
    );
  }

  //user is not logged in
  return (
    <Wrapper>
      <HomePageHero />
      <LockedLocations ids={imageIds} />
    </Wrapper>
  );
};

export default HomePage;
