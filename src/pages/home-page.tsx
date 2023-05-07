import { useEffect, useState } from "react";
import axios from "axios";
import Wrapper from "../components/wrapper";
import HomePageHero from "../components/home-page/hero";

const HomePage = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);
  let admin = false;

  useEffect(() => {
    (async () => {
      try {
        const response = (await axios.get("/auth/admin")).data.body;
        console.log(response);
        if (response.message != "This user is not logged in") setLoggedin(true);
        if (response.message === "This user is an admin") admin = true;
      } catch (err) {}
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  //user is logged in
  if (loggedIn) {
    return (
      <Wrapper>
        <h1>logged in</h1>
      </Wrapper>
    );
  }

  //user is not logged in
  return (
    <Wrapper>
      <HomePageHero />
    </Wrapper>
  );
};

export default HomePage;
