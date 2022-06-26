import {
  Box,
  Container,
  IconButton,
  Menu,
  Typography,
  MenuItem,
  Button,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const MobileMenu = () => {
  const { t } = useTranslation();

  const isLoggedIn = localStorage.getItem("token") !== null;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <Box>
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
          <MenuItem key="home" onClick={handleCloseNavMenu}>
            <Icon>home</Icon>
            <Typography
              ml={1}
              textAlign="center"
              color="secondary.darky"
              component={Link}
              style={{ textDecoration: "none", textTransform: "uppercase" }}
              to="/"
            >
              {t("menu.home")}
            </Typography>
          </MenuItem>

          <MenuItem key="planning" onClick={handleCloseNavMenu}>
            <Icon>fmd_good</Icon>
            <Typography
              ml={1}
              textAlign="center"
              color="secondary.darky"
              component={Link}
              style={{
                textDecoration: "none",
                color: "secondary.lighter",
                textTransform: "uppercase",
              }}
              to={isLoggedIn ? "/dashboard/travel/" : "/signin"}
            >
              {t("menu.planify")}
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
