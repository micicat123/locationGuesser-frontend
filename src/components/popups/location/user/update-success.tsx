import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";
import { MUITheme, buttonStyle } from "../../../../mui/theme";
import logAction from "../../../common/log-action";

const UpdateSuccess = (props: { handleCloseParent: any }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <Button
        variant="contained"
        sx={{ ...buttonStyle, width: 122, height: 39 }}
        type="submit"
        onClick={() => {
          handleClickOpen();
          logAction(
            "click",
            "button",
            "submit-update-user",
            window.location.pathname
          );
        }}
      >
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          window.location.reload();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <Typography
          color="textPrimary"
          variant="h4"
          sx={{ pt: 4, pr: 4, pl: 4, pb: 2 }}
        >
          Information changed.
        </Typography>
        <DialogContent sx={{ p: 4, pt: 0, pb: 2 }}>
          <Typography color="textPrimary" variant="body1">
            Your settings are saved.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ pl: 4, pr: 4, pb: 4, justifyContent: "flex-start" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              props.handleCloseParent();
              logAction(
                "click",
                "button",
                "close-update-user",
                window.location.pathname
              );
              window.location.reload();
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

export default UpdateSuccess;
