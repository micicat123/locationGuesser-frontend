import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { SyntheticEvent, useState } from "react";

const SignupForm = (props: {
  setUsername: Function;
  setPassword: Function;
  setPasswordConfirm: Function;
  setFirstName: Function;
  setLastName: Function;

  submit: any;
  error: string;
}) => {
  const [previewImage, setPreviewImage] = useState<string>(
    "pictures/unset-profile-picture.png"
  );
  const [file, setFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        height: "90%",
        ml: 10,
        mr: 10,
      }}
    >
      <Typography variant="h3" align="center" color={"textPrimary"}>
        Sign up
      </Typography>
      <Typography variant="body1" m={1} align="center" color={"textPrimary"}>
        Your name will appear on posts and your public profle.
      </Typography>

      <form onSubmit={(e: SyntheticEvent) => props.submit(e, file)}>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            id="files"
            style={{ display: "none" }}
          />
          <label htmlFor="files">
            <img
              src={previewImage}
              alt="upload profile picture"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "0.75rem",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </label>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ display: "block", mt: 2 }}>
            <TextField
              label="Email"
              sx={{ width: "100%", color: "textPrimary" }}
              onChange={(e) => props.setUsername(e.target.value)}
              variant="standard"
              autoComplete="email"
            />
          </FormControl>
          <br />

          <FormControl
            sx={{ display: "flex", flexDirection: "row", gap: "5%" }}
          >
            <TextField
              label="First Name"
              onChange={(e) => props.setFirstName(e.target.value)}
              variant="standard"
              sx={{
                width: "47.5%",
                color: "textPrimary",
              }}
              autoComplete="first-name"
            />
            <TextField
              label="Last Name"
              onChange={(e) => props.setLastName(e.target.value)}
              variant="standard"
              sx={{
                width: "47.5%",
                color: "textPrimary",
              }}
              autoComplete="last-name"
            />
          </FormControl>
          <br />
          <FormControl variant="outlined" sx={{ display: "block" }}>
            <TextField
              label="Password"
              sx={{ width: "100%", color: "textPrimary" }}
              onChange={(e) => props.setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              variant="standard"
              autoComplete="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <br />
          <FormControl variant="outlined" sx={{ display: "block" }}>
            <TextField
              label="Confirm Password"
              sx={{ width: "100%", color: "textPrimary" }}
              onChange={(e) => props.setPasswordConfirm(e.target.value)}
              type={showPassword ? "text" : "password"}
              variant="standard"
              autoComplete="confirm-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ color: "red" }}>{props.error}</FormHelperText>
          </FormControl>
          <br />
          <Button
            variant="contained"
            sx={{ height: 39, width: "100%", fontWeight: 400 }}
            type="submit"
          >
            SIGN UP
          </Button>
          <br />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color={"textPrimary"}>
              Already have an account?
            </Typography>
            <Typography variant="body1" color={"primary"}>
              <Link href={"/login"} underline="none" sx={{ fontWeight: 500 }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
