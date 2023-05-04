import axios from "axios";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import MUITheme from "../mui/theme";
import theme from "../mui/theme";
import { User } from "../models/user";
import { Link } from "@mui/material";

const Nav = (props: { user: User }) => {
  let navigate = useNavigate();
  const childRef = useRef<any>(null);
  const [image, setImage] = useState<string>(
    "pictures/unset-profile-picture.png"
  );
  const pages = ["Home", "Profile settings", "Logout"];
  const settings = ["Update info", "Update password", "Update picture"];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    if (props.user.user_id != 0) {
      (async () => {
        try {
          const response = await axios.get(`upload/user`, {
            responseType: "blob",
          });
          setImage(URL.createObjectURL(response.data));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={MUITheme}>
      <>
        {props.user.username == "" ? ( //user is not logged in (home page)
          <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    ml: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="/pictures/logo.png"
                    alt="logo"
                    className="logo"
                    width={125}
                  />
                </Typography>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img src="/pictures/logo.png" alt="logo" width={125} />
                </Typography>
                <Box
                  sx={{
                    flexGrow: 0,
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: 2,
                  }}
                >
                  <Tooltip title="Open settings">
                    <>
                      <div
                        style={{
                          display: "flex",
                          gap: 15,
                          color: "black",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          href={"/login"}
                          color="black"
                          underline="none"
                          sx={{ fontWeight: 500 }}
                        >
                          Sign in
                        </Link>
                        <p>or</p>
                        <Button
                          href="/signup"
                          variant="contained"
                          sx={{ height: 31, width: 137, fontWeight: 400 }}
                        >
                          SIGN UP
                        </Button>
                      </div>
                    </>
                  </Tooltip>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        ) : (
          //user is logged in
          <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    ml: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="/pictures/logo.png"
                    alt="logo"
                    className="logo"
                    width={125}
                  />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img src="/pictures/logo.png" alt="logo" width={125} />
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                    marginRight: 15,
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 0, mr: 2 }}>
                  <Tooltip title="Open settings">
                    <>
                      <div style={{ display: "flex", gap: 15 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                        <img
                          src="/pictures/add-location.png"
                          alt="add"
                          width={40}
                        />
                      </div>
                    </>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        )}
      </>
    </ThemeProvider>
  );
};

export default Nav;
