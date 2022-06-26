import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../provider/AuthProvider";
import AlertDialog from "../../utility/alert/alertToUser";
import { MobileMenu } from "./MobileMenu";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import i18n from "../../i18n";

import SvgMapadoraLogoFlat201 from "../../img/sprites/MapadoraLogoFlat";
import { FormControl, Icon, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const ResponsiveAppBar = () => {
  const { t } = useTranslation();

  const [logoutDialog, setLogOutDialog] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language.substring(0, 2)); // Because on Chrome, language = "fr-FR"

  const navigate = useNavigate();

  const { user, signout } = useAuth();

  const handleLogout = () => {
    setLogOutDialog(true);
  };

  const logoutTraveler = () => {
    setLogOutDialog(false);
    signout();
  };

  const handleDashboard = () => {
    return navigate("/dashboard");
  };

  return (
    <AppBar sx={{ zIndex: "50" }} position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ whiteSpace: "nowrap", height: "8vh" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Box
              component={Link}
              to="/home"
              maxHeight="8vh"
              maxWidth="30vh"
              display="flex"
            >
              <SvgMapadoraLogoFlat201 height="100%" width="100%" />
            </Box>
          </Typography>

          <MobileMenu />

          {logoutDialog ? (
            <AlertDialog
              activate={true}
              dialogTitle={t("auth.youWillBeDisconnected")}
              dialogDescription={""}
              onCloseYesAction={() => logoutTraveler()}
              onCloseNoAction={() => setLogOutDialog(false)}
            />
          ) : null}

          {user ? (
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              data-cy="userBar"
            >
              {/* <Box> */}
              <Typography sx={{ mr: 1 }}>{t("common.welcome")}</Typography>
              <Typography fontWeight="bold" sx={{ mr: 2 }}>
                {user.firstname} {user.lastname}
              </Typography>
              <Divider orientation="vertical" flexItem />
              {/* </Box> */}
              <Box ml={0.5} mr={0.5}>
                <Tooltip title={t("auth.openAdminTab")}>
                  <IconButton sx={{ height: "80%" }} onClick={handleDashboard}>
                    <FaceIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Me déconnecter">
                  <IconButton sx={{ height: "80%" }} onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <FormControl
                  fullWidth
                  style={{
                    border: "none",
                  }}
                >
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={selectedLanguage}
                    onChange={(event) => {
                      setSelectedLanguage(event.target.value);
                      i18n.changeLanguage(event.target.value);
                    }}
                    style={{
                      border: "none",
                    }}
                  >
                    <MenuItem value={"fr"}>🇫🇷</MenuItem>
                    <MenuItem value={"en"}>🇺🇸</MenuItem>
                    <MenuItem value={"de"}>🇩🇪</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                data-cy="userBar"
              >
                {/* </Box> */}
                <Box ml={0.5} mr={0.5}>
                  <Button
                    component={Link}
                    to="/signup"
                    style={{ textDecoration: "none" }}
                    sx={{ color: "secondary.lightest", borderRadius: "4px" }}
                  >
                    {t("auth.createAccount")}
                  </Button>
                  <Button
                    component={Link}
                    to="/signin"
                    style={{ textDecoration: "none" }}
                    sx={{
                      color: "secondary.lightest",
                      border: "2px solid",
                      borderColor: "secondary.lighter",
                      borderRadius: "4px",
                    }}
                  >
                    {t("auth.signin")}
                  </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box>
                  <FormControl
                    fullWidth
                    style={{
                      border: "none",
                    }}
                  >
                    <Select
                      labelId="language-select-label"
                      id="language-select"
                      value={selectedLanguage}
                      onChange={(event) => {
                        setSelectedLanguage(event.target.value);
                        i18n.changeLanguage(event.target.value);
                      }}
                      style={{
                        border: "none",
                      }}
                    >
                      <MenuItem value={"fr"}>🇫🇷</MenuItem>
                      <MenuItem value={"en"}>🇺🇸</MenuItem>
                      <MenuItem value={"de"}>🇩🇪</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
