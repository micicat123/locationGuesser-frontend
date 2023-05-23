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

const DeleteLocationConfirm = (props: {
  handleCloseParent: Function;
  id: number;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteLocation = async () => {
    try {
      await axios.delete(`/location/${props.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
      });
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <Button
        variant="contained"
        onClick={() => {
          handleClickOpen();
          deleteLocation();
          logAction(
            "click",
            "button",
            "submit-quote-delete",
            window.location.pathname
          );
        }}
        sx={{ ...buttonStyle, width: 122, height: 39 }}
      >
        Submit
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
          Your location was deleted
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
                "close-quote-delete",
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

export default DeleteLocationConfirm;
