import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";

const LoginForm = (props: {
  setPassword: Function;
  setUsername: Function;
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

        height: "90%",
        ml: 5,
        mr: 5,
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

      <form onSubmit={props.submit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ display: "block", mt: 5 }}>
            <TextField
              label="email"
              variant="outlined"
              sx={{ width: "100%", color: "textPrimary" }}
              onChange={(e) => props.setUsername(e.target.value)}
              autoComplete="email"
            />
          </FormControl>
          <br />
          <FormControl
            variant="outlined"
            sx={{ display: "block", color: "textPrimary" }}
          >
            <TextField
              label="password"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(e) => props.setPassword(e.target.value)}
              type="password"
              autoComplete="password"
            />
            <FormHelperText sx={{ color: "red" }}>{props.error}</FormHelperText>
          </FormControl>
          <br />
          <Button
            variant="contained"
            sx={{ height: 39, width: "100%", fontWeight: 400 }}
            type="submit"
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
            <Typography variant="body1" color={"primary"}>
              <Link href={"/signup"} underline="none" sx={{ fontWeight: 500 }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
