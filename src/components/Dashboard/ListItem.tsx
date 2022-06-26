import * as React from "react";
import {
  Badge,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Traveler } from "model/Traveler";
import api from "api/api";
import { useNotificationQuery } from "./NotificationHook";
import { useTranslation } from "react-i18next";

type ListItemProps = {
  traveler: Traveler;
};

export const ListItem = (props: ListItemProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    isLoading: invitationsIsLoading,
    isError: invitationsIsError,
    data: invitationsCount,
    error: invitationsError,
  } = useNotificationQuery(props.traveler);

  return (
    <>
      <Typography
        color="primary.dark"
        component={Link}
        style={{ textDecoration: "none" }}
        to="/dashboard/travel"
      >
        <ListItemButton>
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <TravelExploreIcon />
          </ListItemIcon>
          <ListItemText primary={t("dashboard.myTravels.title")} />
        </ListItemButton>
      </Typography>
      <Divider flexItem />
      <Typography
        color="primary.dark"
        component={Link}
        style={{ textDecoration: "none" }}
        to="/dashboard/informations"
      >
        <ListItemButton>
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary={t("dashboard.myInformations.title")} />
        </ListItemButton>
      </Typography>
      <Divider flexItem />
      <Typography
        color="primary.dark"
        component={Link}
        style={{ textDecoration: "none" }}
        to="/dashboard/newTravel"
      >
        <ListItemButton>
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <ModeOfTravelIcon />
          </ListItemIcon>
          <ListItemText primary={t("dashboard.newTravel.title")} />
        </ListItemButton>
      </Typography>
      <Divider flexItem />
      <Typography
        color="primary.dark"
        component={Link}
        style={{ textDecoration: "none" }}
        to="/dashboard/notifications"
      >
        <ListItemButton>
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            {invitationsCount ? (
              <Badge badgeContent={invitationsCount.count} color="primary">
                <NotificationsActiveIcon color="action" />
              </Badge>
            ) : (
              <NotificationsActiveIcon />
            )}
          </ListItemIcon>
          <ListItemText primary={t("dashboard.notifications.title")} />
        </ListItemButton>
      </Typography>
    </>
  );
};
