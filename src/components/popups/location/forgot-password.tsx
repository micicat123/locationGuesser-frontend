import {
  Box,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme } from "../../../mui/theme";
import { useState } from "react";
import logAction from "../../common/log-action";
import ConfirmReset from "./reset-sent";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <Typography variant="body1" color={"textPrimary"} sx={{ mt: 2 }}>
        <Link
          sx={{
            fontWeight: 500,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            handleClickOpen();
            logAction(
              "click",
              "button",
              "forgot-password",
              window.location.pathname
            );
          }}
        >
          Forgot password
        </Link>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography color="textPrimary" variant="h4" sx={{ p: 4 }}>
          Forgot your password?
        </Typography>
        <DialogContent sx={{ p: 4, pt: 0 }}>
          <Typography color="textPrimary" variant="body1" component="div">
            Enter your email address and we'll send you a link to get back into
            your account.
          </Typography>
          <form>
            <FormControl sx={{ display: "block", mt: 5 }}>
              <TextField
                label="Email"
                variant="outlined"
                sx={{ width: "100%", color: "textPrimary" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                  const previousValue = username;
                  const currentValue = e.target.value;

                  let action: string;
                  if (previousValue === "" && currentValue !== "") {
                    action = "added value";
                  } else if (previousValue !== "" && currentValue === "") {
                    action = "removed value";
                  } else {
                    action = "changed value";
                  }
                  logAction(
                    action,
                    "text",
                    e.target.value,
                    window.location.pathname
                  );
                }}
                autoComplete="email"
                required={true}
              />
              <FormHelperText sx={{ color: "red" }}>
                {errorMessage}
              </FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 4,
            pr: 4,
            pb: 4,
          }}
        >
          <ConfirmReset
            handleCloseParent={handleClose}
            username={username}
            setErrorMessage={setErrorMessage}
          />
          <Typography
            color="textPrimary"
            variant="body1"
            onClick={() => {
              handleClose();
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
      </Dialog>
    </ThemeProvider>
  );
};

export default ForgotPassword;
