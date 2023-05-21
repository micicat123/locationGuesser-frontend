import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logAction from "../common/log-action";
import ForgotPassword from "../popups/location/forgot-password";

const LoginForm = (props: {
  setPassword: Function;
  password: string;
  setUsername: Function;
  username: string;
  submit: any;
  error: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pl: 2,
        pr: 2,
        ml: "auto",
        mr: "auto",
        height: "90%",
        minWidth: "20%",
        maxWidth: "70%",
      }}
    >
      <Typography variant="h3" align="center" color={"textPrimary"}>
        Sign in
      </Typography>
      <Typography
        variant="body1"
        m={1}
        align="center"
        maxWidth={"25rem"}
        color={"textPrimary"}
      >
        Welcome back to Geotagger. We are glad that you are back.
      </Typography>

      <form onSubmit={props.submit} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ display: "block", mt: 5 }}>
            <TextField
              label="Email"
              variant="outlined"
              sx={{ width: "100%", color: "textPrimary" }}
              onChange={(e) => {
                props.setUsername(e.target.value);
                const previousValue = props.username;
                const currentValue = e.target.value;

                let action: string;
                if (previousValue === "" && currentValue !== "") {
                  action = "added value";
                } else if (previousValue !== "" && currentValue === "") {
                  action = "removed value";
                } else {
                  action = "changed value";
                }
                logAction(
                  action,
                  "text",
                  e.target.value,
                  window.location.pathname
                );
              }}
              autoComplete="email"
              required={true}
            />
          </FormControl>
          <br />
          <FormControl
            variant="outlined"
            sx={{ display: "block", color: "textPrimary" }}
          >
            <TextField
              label="Password"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => {
                props.setPassword(e.target.value);
                const previousValue = props.password;
                const currentValue = e.target.value;

                let action: string;
                if (previousValue === "" && currentValue !== "") {
                  action = "added value";
                } else if (previousValue !== "" && currentValue === "") {
                  action = "removed value";
                } else {
                  action = "changed value";
                }
                logAction(action, "password", null, window.location.pathname);
              }}
              type="password"
              autoComplete="password"
              required={true}
            />
            <FormHelperText sx={{ color: "red" }}>{props.error}</FormHelperText>
          </FormControl>
          <br />
          <Button
            variant="contained"
            sx={{ height: 39, width: "100%", fontWeight: 400 }}
            type="submit"
            onClick={() => {
              logAction("click", "button", "sign-in", window.location.pathname);
            }}
          >
            SIGN IN
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
              Do you want to create an account?
            </Typography>
            <Typography
              variant="body1"
              color={"primary"}
              onClick={() => {
                logAction(
                  "click",
                  "link",
                  "link-signup",
                  window.location.pathname
                );
              }}
            >
              <Link href={"/signup"} underline="none" sx={{ fontWeight: 500 }}>
                Sign up
              </Link>
            </Typography>
          </Box>
          <ForgotPassword />
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
