import {
  Box,
  Dialog,
  DialogContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MUITheme } from "../../../../mui/theme";
import UpdateInfoForm from "../../../forms/user/update-info.form";
import { User } from "../../../../models/user";
import UpdatePassForm from "../../../forms/user/update-pass.form";

const UpdatePass = () => {
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
        Change password
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
        <DialogContent sx={{ p: 4, pt: 0, pb: 2 }}>
          <Typography color="textPrimary" variant="body1">
            Change your information.
          </Typography>
        </DialogContent>
        <UpdatePassForm setOpen={setOpen} handleCloseParent={handleClose} />
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdatePass;
