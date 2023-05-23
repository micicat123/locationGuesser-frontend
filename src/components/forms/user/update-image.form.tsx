import { Avatar, Box, Button, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import UpdateSuccess from "../../popups/location/user/update-success";
import logAction from "../../common/log-action";

const UpdateImageForm = (props: {
  setOpen: any;
  image: string;
  id: number;
  handleCloseParent: any;
}) => {
  const [previewImage, setPreviewImage] = useState<string>(
    "pictures/unset-profile-picture.png"
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setPreviewImage(props.image);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
    logAction("changed value", "file", "file", window.location.pathname);
  };

  const updateImage = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post(`upload/profile_pictures/${props.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err: any) {
      console.log(err);
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
        <form onSubmit={(e) => updateImage(e)} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={previewImage}
              alt="upload profile picture"
              sx={{
                ml: "auto",
                mr: "auto",
                width: 80,
                height: 80,
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: 40,
                mb: 4,
                mt: 4,
                fontWeight: 400,
                position: "relative",
              }}
            >
              <input
                type="file"
                onChange={handleFileChange}
                id="upload-file"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                }}
                required
              />
              UPLOAD NEW IMAGE
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
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

export default UpdateImageForm;
