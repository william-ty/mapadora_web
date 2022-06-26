import * as React from "react";
import Box from "@mui/material/Box";
import { Paper, Divider } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

import { PersonalForm } from "./PersonalForm";
import { PrivateTravels } from "./PrivateTravels";
import { HomeDashboard } from "./HomeDashboard";
import { NewTravel } from "./NewTravel";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

export const BottomMobileMenu = () => {
  const { t } = useTranslation();

  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        ml: "auto",
        mr: "auto",
        display: { xs: "flex", md: "none" },
        justifyContent: "center",
      }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        sx={{ width: "100%" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          href="/dashboard/informations"
          label={t("dashboard.myInformations.title")}
          icon={<ManageAccountsIcon />}
        />
        <Divider flexItem />
        <BottomNavigationAction
          href="/dashboard/travel"
          label={t("dashboard.myTravels.title")}
          icon={<TravelExploreIcon />}
        />
        <Divider flexItem />
        <BottomNavigationAction
          href="/dashboard/newTravel"
          label={t("dashboard.newTravel.title")}
          icon={<ModeOfTravelIcon />}
        />
        <Divider flexItem />
        <BottomNavigationAction
          href="/dashboard/notifications"
          label={t("dashboard.notifications.title")}
          icon={<ModeOfTravelIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
