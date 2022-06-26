import * as React from "react";
import { useState } from "react";
import { styled, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItem } from "./ListItem";
import theme from "./../../theme/theme";

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { BottomMobileMenu } from "./BottomMobileMenu";
import { useAuth } from "provider/AuthProvider";
import { Traveler } from "model/Traveler";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    borderRadius: "0",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user } = useAuth();

  return (
    <Box sx={{ overflow: "hidden", maxHeight: "100vh" }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: {
              xs: "none",
              md: "flex",
              backgroundColor: "primary.light",
              "& .MuiPaper-root": {
                backgroundColor: theme.palette.primary.darky,
              },
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              backgroundColor: "primary.darky",
              color: "primary.dark",
              boxShadow: "0px 0px 8px 1px inset",
            }}
          >
            {open && <Divider flexItem />}
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>
          {/* <Divider /> */}
          <List component="nav" sx={{ p: 0, backgroundColor: "primary.lighter" }}>
            {user ?
              <ListItem traveler={user} />
              : null}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === "light"
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            // height: "100vh",
            height: "92vh",
            // overflow: "hidden",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none"
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          }}
        >
          {/* <Toolbar /> */}
          <Box sx={{ m: 2 }}>
            <Grid item xs={8} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                  backgroundColor: 'secondary.lightest'
                }}
              >
                <Outlet />
              </Paper>
            </Grid>
          </Box>
        </Box>
      </Box>
      <BottomMobileMenu />
    </Box >
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
