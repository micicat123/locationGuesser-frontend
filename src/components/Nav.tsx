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
import { ThemeProvider, css } from "@mui/material/styles";
import { MUITheme, buttonStyle } from "../mui/theme";
import { User } from "../models/user";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Nav = (props: { user: User }) => {
  let navigate = useNavigate();
  const [image, setImage] = useState<string>(
    "pictures/unset-profile-picture.png"
  );
  const settings = ["Update info", "Update password", "Update picture"];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    if (props.user.picture != "") {
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
  }, [props.user]);

  const logout = async () => {
    await axios.post("/auth/logout");
    navigate("/");
    window.location.reload();
  };

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
                    ml: 8,
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
                    ml: 8,
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
                    marginRight: 8,
                  }}
                >
                  <Tooltip title="Open settings">
                    <>
                      <Box
                        sx={{
                          flexGrow: 1,
                          display: { xs: "flex", md: "none" },
                          ml: 8,
                        }}
                      >
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
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
                          <MenuItem key={"Home"} onClick={() => navigate("/")}>
                            <Typography textAlign="center">{"Home"}</Typography>
                          </MenuItem>
                          <MenuItem
                            key={"Signup"}
                            onClick={() => navigate("/signup")}
                          >
                            <Typography textAlign="center">
                              {"Signup"}
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            key={"Login"}
                            onClick={() => navigate("/login")}
                          >
                            <Typography textAlign="center">
                              {"Login"}
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Box
                        sx={{
                          gap: 3,
                          alignItems: "center",
                          display: { xs: "none", md: "flex" },
                        }}
                      >
                        <Link
                          href={"/login"}
                          underline="none"
                          sx={{ fontWeight: 500 }}
                          color="textPrimary"
                        >
                          Sign in
                        </Link>
                        <Typography
                          variant="body1"
                          sx={{ mt: "4px" }}
                          color="textPrimary"
                        >
                          or
                        </Typography>
                        <Button
                          href="/signup"
                          variant="contained"
                          sx={buttonStyle}
                        >
                          SIGN UP
                        </Button>
                      </Box>
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
                    ml: 8,
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
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                    ml: 8,
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
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
                    <MenuItem key={"Home"} onClick={() => navigate("/")}>
                      <Typography textAlign="center">{"Home"}</Typography>
                    </MenuItem>
                    <Link
                      to={"/profile"}
                      state={{ user: props.user, image: image }}
                      component={RouterLink}
                      sx={{ textDecoration: "none" }}
                    >
                      <MenuItem key={"Profile page"}>
                        <Typography textAlign="center">
                          {"Profile page"}
                        </Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem key={"Logout"} onClick={() => logout()}>
                      <Typography textAlign="center">{"Logout"}</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 8,
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
                    alignItems: "center",
                    marginRight: 6.5,
                    gap: 6.5,
                  }}
                >
                  <a href="/" style={{ textDecoration: "none" }}>
                    <Typography
                      onClick={handleCloseNavMenu}
                      variant="body1"
                      textAlign="center"
                      color={"textPrimary"}
                    >
                      Home
                    </Typography>
                  </a>
                  <Link
                    to={"/profile"}
                    state={{ user: props.user, image: image }}
                    component={RouterLink}
                    sx={{ textDecoration: "none" }}
                  >
                    <Typography
                      onClick={handleCloseNavMenu}
                      variant="body1"
                      textAlign="center"
                      color={"textPrimary"}
                    >
                      Profile page
                    </Typography>
                  </Link>
                  <a href="/" style={{ textDecoration: "none" }}>
                    <Typography
                      onClick={() => {
                        handleCloseNavMenu();
                        logout();
                      }}
                      variant="body1"
                      textAlign="center"
                      color={"textPrimary"}
                    >
                      Logout
                    </Typography>
                  </a>
                </Box>
                <Box sx={{ flexGrow: 0, mr: 8 }}>
                  <Tooltip title="Open settings">
                    <>
                      <div style={{ display: "flex", gap: 15 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar src={image} />
                        </IconButton>
                        <Link href={"/add-location"} underline="none">
                          <IconButton sx={{ p: 0 }}>
                            <Avatar src={"/pictures/add-location.png"} />
                          </IconButton>
                        </Link>
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
