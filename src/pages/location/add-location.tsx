import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { MUITheme } from "../../mui/theme";
import Wrapper from "../../components/Wrapper";
import Cookies from "js-cookie";
import ClearIcon from "@mui/icons-material/Clear";

const AddLocation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [file, setFile] = useState<any | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    "pictures/placeholder-image.png"
  );
  const [redirect, setRedirect] = useState(false);
  const apiKey = process.env.API_KEY;

  const update = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const response: any = await axios.post(
        `/location`,
        { latitude, longitude },
        { headers: { Authorization: `Bearer ${Cookies.get("jwt")}` } }
      );

      /*
      const formData = new FormData();
      formData.append("file", file);
      await axios.post(`upload/locations/${response.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });*/

      setRedirect(true);
    } catch (err) {}
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  console.log(apiKey);
  return (
    <Wrapper>
      <ThemeProvider theme={MUITheme}>
        <Box sx={{ mt: "51px", ml: 10, mr: 10 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography color="textPrimary" variant="h4">
              Add a new
            </Typography>
            <Typography color="primary" variant="h4" ml="0.25em">
              location.
            </Typography>
          </Box>

          <form onSubmit={(e: SyntheticEvent) => update(e)}>
            <img
              src={previewImage}
              alt="upload profile picture"
              width={860}
              height={280}
              style={{
                objectFit: "cover",
                marginTop: "16px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "23px",
              }}
            />
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                  width: "53.75rem",
                  margin: "auto",
                  gap: 3,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: 40,
                    width: 200,
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
                  />
                  UPLOAD IMAGE
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    height: 40,
                    maxWidth: 40,
                    minWidth: 40,
                    backgroundColor: "#9B6161",
                    "&:hover": {
                      backgroundColor: "#6b4545",
                    },
                  }}
                  onClick={() =>
                    setPreviewImage("pictures/placeholder-image.png")
                  }
                >
                  <ClearIcon />
                </Button>
              </Box>
            </div>
          </form>
        </Box>
      </ThemeProvider>
    </Wrapper>
  );
};

export default AddLocation;
