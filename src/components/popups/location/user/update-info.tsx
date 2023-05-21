import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MUITheme, buttonStyle } from "../../../../mui/theme";
import UpdateInfoForm from "../../../forms/user/update-info.form";
import { User } from "../../../../models/user";

const UpdateInfo = (props: { user: User }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <Typography textAlign="center" onClick={handleClickOpen}>
        Change your information
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <Typography color="textPrimary" variant="h4" sx={{ p: 4, pb: 3 }}>
          Profile{" "}
          <span style={{ color: MUITheme.palette.primary.main }}>
            settings.
          </span>
        </Typography>
        <DialogContent sx={{ p: 4, pt: 0, pb: 4 }}>
          <Typography color="textPrimary" variant="body1">
            Change your information.
          </Typography>
        </DialogContent>
        <UpdateInfoForm
          setOpen={setOpen}
          user={props.user}
          handleCloseParent={handleClose}
        />
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateInfo;
