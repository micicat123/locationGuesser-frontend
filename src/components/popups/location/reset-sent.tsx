import {
  Button,
  Dialog,
  DialogActions,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme, buttonStyle } from "../../../mui/theme";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import logAction from "../../common/log-action";

const ConfirmReset = (props: {
  handleCloseParent: Function;
  username: string;
  setErrorMessage: any;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendMail = async () => {
    try {
      await axios.post(
        `/user/send-email`,
        { username: props.username },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
      handleClickOpen();
    } catch (err: any) {
      if (typeof err.response.data.message === "object")
        props.setErrorMessage(err.response.data.message[0]);
      else props.setErrorMessage(err.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <Button
        variant="contained"
        onClick={() => {
          sendMail();
          logAction("click", "button", "send-email", window.location.pathname);
        }}
        sx={{ ...buttonStyle, width: 122, height: 39 }}
      >
        Send link
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography
          color="textPrimary"
          variant="h5"
          sx={{ pt: 4, pr: 4, pl: 4, pb: 5 }}
        >
          Email was sent
        </Typography>
        <DialogActions sx={{ justifyContent: "center", pl: 4, pr: 4, pb: 4 }}>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              props.handleCloseParent();
              logAction(
                "click",
                "button",
                "close-link-sent",
                window.location.pathname
              );
            }}
            sx={{ ...buttonStyle, width: 113, height: 39 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ConfirmReset;
