import {
  Container,
  Grid,
  Box,
  Typography,
  SvgIconTypeMap,
  Button,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import AlertDialog from "utility/alert/alertToUser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type IconCardsProps = {
  iconComponent: any;
  textComponent: string;
};

const IconCard = (props: IconCardsProps) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "40%" }}>{props.iconComponent}</Box>
      <Typography>{props.textComponent}</Typography>
    </Box>
  );
};

export const HomeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [logoutDialog, setLogOutDialog] = useState(false);

  const handleLogout = () => {
    setLogOutDialog(true);
  };

  const logoutTraveler = () => {
    setLogOutDialog(false);
    signout();
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        {t("dashboard.home.whatDoYouWantToDo")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            color={"secondary"}
            component={Link}
            to="/dashboard/informations"
            variant="contained"
            sx={{
              textDecoration: "none",
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              pl: 1,
              pr: 3,
              py: 2,
            }}
          >
            <ManageAccountsIcon sx={{ flex: 1, fontSize: "100px" }} />
            <Typography sx={{ flex: 1 }} variant="subtitle1">
              {t("dashboard.home.updateMyInfo")}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            color={"secondary"}
            component={Link}
            to="/dashboard/newTravel"
            variant="contained"
            sx={{
              textDecoration: "none",
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              pl: 1,
              pr: 3,
              py: 2,
            }}
          >
            <ModeOfTravelIcon sx={{ flex: 1, fontSize: "100px" }} />
            <Typography sx={{ flex: 1 }} variant="subtitle1">
              {t("dashboard.home.createTravel")}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            color={"secondary"}
            component={Link}
            to="/dashboard/travel"
            variant="contained"
            sx={{
              textDecoration: "none",
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              pl: 1,
              pr: 3,
              py: 2,
            }}
          >
            <TravelExploreIcon sx={{ flex: 1, fontSize: "100px" }} />
            <Typography sx={{ flex: 1 }} variant="subtitle1">
              {t("dashboard.home.showMyTravels")}
            </Typography>
          </Button>
        </Grid>
        {/* <Grid item xs={6}>
          <Button
            color={"secondary"}
            variant="contained"
            sx={{
              textDecoration: "none",
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              pl: 1,
              pr: 3,
            }}
            onClick={handleLogout}
          >
            <LogoutIcon sx={{ fontSize: "50px" }} />
            <Typography variant="subtitle1">
              {t("dashboard.home.logout")}
            </Typography>
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};
