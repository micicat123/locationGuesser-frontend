import {
  Box,
  Dialog,
  DialogContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MUITheme } from "../../../mui/theme";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteLocationConfirm from "./delete-location-confirmation";
import logAction from "../../common/log-action";

const DeleteLocation = (props: { id: number }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <ClearIcon onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography color="textPrimary" variant="h4" sx={{ p: 4 }}>
          Are you sure?
        </Typography>
        <DialogContent sx={{ p: 4, pt: 0 }}>
          <Typography color="textPrimary" variant="body1" component="div">
            This location will be deleted. There is no undo of this action.
          </Typography>
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
          <DeleteLocationConfirm
            handleCloseParent={handleClose}
            id={props.id}
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

export default DeleteLocation;
