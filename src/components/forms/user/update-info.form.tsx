import { Box, FormControl, Hidden, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../../../models/user";
import UpdateSuccess from "../../popups/location/user/update-success";
import logAction from "../../common/log-action";

const UpdateInfoForm = (props: {
  setOpen: any;
  user: User;
  handleCloseParent: any;
}) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setUsername(props.user.username);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
  }, []);

  const UpdateUserInfo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `/user/info`,
        { username, firstName, lastName },
        {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        }
      );
    } catch (err) {
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
        <form onSubmit={(e) => UpdateUserInfo(e)} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <FormControl>
              <TextField
                label="Email"
                value={username}
                variant="standard"
                sx={{ width: "100%", color: "textPrimary" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                  const previousValue = username;
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
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "5%",
              }}
            >
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  const previousValue = firstName;
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
                variant="standard"
                sx={{
                  width: { xs: "100%", sm: "47.5%" },
                  color: "textPrimary",
                }}
                autoComplete="first-name"
                required={true}
              />
              <Hidden smUp>
                <br />
              </Hidden>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  const previousValue = lastName;
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
                variant="standard"
                sx={{
                  width: { xs: "100%", sm: "47.5%" },
                  color: "textPrimary",
                }}
                autoComplete="last-name"
                required={true}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              mt: 4,
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

export default UpdateInfoForm;
