import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { buttonStyle } from "../../../mui/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff, WindowSharp } from "@mui/icons-material";
import UpdateSuccess from "../../popups/location/user/update-success";
import logAction from "../../common/log-action";

const UpdatePassForm = (props: { setOpen: any; handleCloseParent: any }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const updatePass = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `/user/pass`,
        { currentPassword, newPassword, confirmNewPassword },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        setErrorMessage(err.response.data.message[0]);
      else setErrorMessage(err.response.data.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ml: 4,
          mr: 4,
          mb: 4,
        }}
      >
        <form onSubmit={(e) => updatePass(e)} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FormControl variant="outlined" sx={{ display: "block" }}>
              <TextField
                label="Current password"
                sx={{ width: "100%", color: "textPrimary" }}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  const previousValue = currentPassword;
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
                autoComplete="password"
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
                autoComplete="password"
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              mt: 4,
            }}
          >
            <UpdateSuccess handleCloseParent={props.handleCloseParent} />
            <Typography
              color="textPrimary"
              variant="body1"
              onClick={() => {
                props.setOpen(false);
                logAction(
                  "click",
                  "button",
                  "cancel-popup",
                  window.location.pathname
                );
              }}
            >
              Cancel
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default UpdatePassForm;
