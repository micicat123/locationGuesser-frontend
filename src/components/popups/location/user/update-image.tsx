import {
  Dialog,
  DialogContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MUITheme } from "../../../../mui/theme";
import UpdateImageForm from "../../../forms/user/update-image.form";

const UpdateImage = (props: { image: string; id: number }) => {
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
        Change picture
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
            Change your profile photo.
          </Typography>
        </DialogContent>
        <UpdateImageForm
          setOpen={setOpen}
          image={props.image}
          id={props.id}
          handleCloseParent={handleClose}
        />
      </Dialog>
    </ThemeProvider>
  );
};

export default UpdateImage;
