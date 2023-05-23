import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme, buttonStyle } from "../mui/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logAction from "../components/common/log-action";

const ResetPasswordPage = () => {
  const { token, username } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [failedResponse, setFailedResponse] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`/user/auth-email/${token}/${username}`);
      } catch (err: any) {
        if (typeof err.response.data.message === "object")
          setFailedResponse(err.response.data.message[0]);
        else setFailedResponse(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const resetPassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`user/reset-pass`, {
        username,
        newPassword,
        confirmNewPassword,
      });
      setRedirect(true);
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <ThemeProvider theme={MUITheme}>
      <Box sx={{ p: 10 }}>
        {failedResponse ? (
          <Typography
            color="textPrimary"
            variant="h1"
            sx={{ mt: 5, textAlign: "center" }}
          >
            {failedResponse}
          </Typography>
        ) : (
          <form
            onSubmit={(e) => resetPassword(e)}
            style={{ width: "45%", margin: "auto" }}
          >
            <Typography color="primary" variant="h4" sx={{ mt: 5, mb: 4 }}>
              Change your password
            </Typography>
            <FormControl variant="outlined" sx={{ display: "block" }}>
              <TextField
                label="New password"
                sx={{ width: "100%", color: "textPrimary" }}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  const previousValue = newPassword;
                  const currentValue = e.target.value;

                  let action: string;
                  if (previousValue === "" && currentValue !== "") {
                    action = "added value";
                  } else if (previousValue !== "" && currentValue === "") {
                    action = "removed value";
                  } else {
                    action = "changed value";
                  }
                  logAction(action, "password", null, window.location.pathname);
                }}
                type={showPassword ? "text" : "password"}
                variant="standard"
                autoComplete="off"
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <br />
            <FormControl variant="outlined" sx={{ display: "block" }}>
              <TextField
                label="Confirm new password"
                sx={{ width: "100%", color: "textPrimary" }}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  const previousValue = confirmNewPassword;
                  const currentValue = e.target.value;

                  let action: string;
                  if (previousValue === "" && currentValue !== "") {
                    action = "added value";
                  } else if (previousValue !== "" && currentValue === "") {
                    action = "removed value";
                  } else {
                    action = "changed value";
                  }
                  logAction(action, "password", null, window.location.pathname);
                }}
                type={showPassword ? "text" : "password"}
                variant="standard"
                autoComplete="off"
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormHelperText sx={{ color: "red" }}>
              {errorMessage}
            </FormHelperText>
            <br />
            <Button
              variant="contained"
              sx={{ ...buttonStyle, width: 122, height: 39 }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
