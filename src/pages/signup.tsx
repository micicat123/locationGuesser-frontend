import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Box, Grid, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../mui/theme";
import LoginForm from "../components/forms/login.form";
import SignupForm from "../components/forms/signup.form";
import { last } from "lodash";

const Signup = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async (e: SyntheticEvent, file: any) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("/auth/register", {
        username,
        password,
        passwordConfirm,
        firstName,
        lastName,
      });

      if (file != null) {
        await axios.post(
          `upload/profile_pictures/${response.data.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      setRedirect(true);
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
      console.log(err);
    }
  };

  console.log(redirect);
  if (redirect) {
    return <Navigate to={"/login"} />;
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
          <SignupForm
            setUsername={setUsername}
            username={username}
            setPassword={setPassword}
            password={password}
            setPasswordConfirm={setPasswordConfirm}
            passwordConfirm={passwordConfirm}
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            submit={register}
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
            src="/pictures/background-logo.png"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Signup;
