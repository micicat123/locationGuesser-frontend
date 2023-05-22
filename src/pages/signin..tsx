import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Box, Grid, Hidden, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../mui/theme";
import LoginForm from "../components/forms/login.form";
import Nav from "../components/Nav";
import { User } from "../models/user";

const Login = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userRico = new User(1, "Rico", "", "", "", "");

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("/auth/login", { username, password });
      setRedirect(true);
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <ThemeProvider theme={MUITheme}>
      <Hidden mdUp>
        <Nav user={userRico} />
      </Hidden>
      <Grid container justifyContent={"center"}>
        <Grid item sm={0} md={5}>
          <Hidden mdDown>
            <Nav user={userRico} />
          </Hidden>
          <LoginForm
            setUsername={setUsername}
            username={username}
            setPassword={setPassword}
            password={password}
            submit={login}
            error={errorMessage}
          />
        </Grid>
        <Grid item sm={12} md={7}>
          <Box
            component="img"
            sx={{
              width: "100%",
              display: { xs: "none", sm: "none", md: "block", lg: "block" },
            }}
            alt="Backround image."
            src="/pictures/background-logo.png"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
