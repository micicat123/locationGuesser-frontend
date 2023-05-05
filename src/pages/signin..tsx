import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import MUITheme from "../mui/theme";
import LoginForm from "../components/forms/login.form";

const Login = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      <Grid container>
        <Grid item xs={5}>
          <a href="/">
            <Box
              component="img"
              width={171}
              alt="Backround image."
              src="/pictures/logo.png"
              mt={5.75}
              ml={8.75}
            />
          </a>
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            submit={login}
            error={errorMessage}
          />
        </Grid>
        <Grid item xs={7}>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="Backround image."
            src="/pictures/background.png"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
