import { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../components/wrapper";
import HomePageHero from "../components/home-page/hero";
import LockedLocations from "../components/home-page/locked-locations";
import Cookies from "js-cookie";
import { Box, ThemeProvider } from "@mui/material";
import { MUITheme } from "../mui/theme";
import PersonalBestGrid3 from "../components/home-page/personal-best-three";
import MostRecentLocations from "../components/home-page/new-locations";

const HomePage = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageIds, setImageIds] = useState<number[]>([]);

  const [guessPage, setGuessPage] = useState(1);
  const [locationPage, setLocationPage] = useState(1);

  const [recentLocations, setRecentLocations] = useState<any[]>([]);
  const [bestGuesses, setBestGuesses] = useState<any[]>([]);

  const [isGuessLastPage, setIsGuessLastPage] = useState(false);
  const [isLocationLastPage, setIsLocationLastPage] = useState(false);

  let admin = false;

  useEffect(() => {
    (async () => {
      try {
        //check for user status
        const response = (await axios.get("/auth/admin")).data.body;
        if (response.message !== "This user is not logged in")
          setLoggedin(true);
        if (response.message === "This user is an admin") admin = true;
      } catch (err) {}
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedIn) {
          const token = Cookies.get("jwt");
          const response = await axios.get(`/user/best/3/${guessPage}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBestGuesses((prevBestGuesses) =>
            [...prevBestGuesses, ...response.data.data].sort(
              (a, b) => a.errorDistance - b.errorDistance
            )
          );
          if (response.data.isLastPage) setIsGuessLastPage(true);
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
        const responseLocation = await axios.get(`/location/${locationPage}`);
        if (responseLocation.data.isLastPage) setIsLocationLastPage(true);
        setRecentLocations(responseLocation.data.data);

        const newImageKeys = [
          responseLocation.data.data[0].id,
          responseLocation.data.data[1].id,
          responseLocation.data.data[2].id,
        ];
        setImageIds(newImageKeys);
      } catch (error) {}
    };

    fetchData();
  }, [locationPage, loggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }
  //user is logged in
  if (loggedIn) {
    return (
      <Wrapper>
        <ThemeProvider theme={MUITheme}>
          <Box mt="83px" ml={11} mr={11}>
            <PersonalBestGrid3
              bestGuesses={bestGuesses}
              isLastPage={isGuessLastPage}
              setPage={setGuessPage}
              page={guessPage}
            />
            <MostRecentLocations
              recentLocations={recentLocations}
              isLastPage={isLocationLastPage}
              setPage={setLocationPage}
              page={locationPage}
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
