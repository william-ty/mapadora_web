import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, Outlet, useParams } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { useQuery } from "react-query";
import api from "api/api";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const MainMenu = () => {
  const { t } = useTranslation();

  const [value, setValue] = React.useState("one");
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const {
    isLoading: travelIsLoading,
    isError: travelIsError,
    data: travelData,
    error: travelError,
  } = useQuery(["travelname", id_travel], () =>
    api.getTravelById({
      hasToken: true,
      id: id_travel,
    })
  );

  return (
    <Box>
      {travelData && travelData.name ? (
        <>
          <Typography sx={{ my: "10px" }} variant="h5">
            {travelData?.name}
          </Typography>
          <Divider sx={{ my: 1, mb: 2 }} />
        </>
      ) : null}
      <Tabs
        sx={{ backgroundColor: "primary.light", borderRadius: "6px", mb: 2 }}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {/* <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} /> */}
        <Tab
          color="primary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "primary.darky" },
          }}
          to="./"
          label={t("common.information")}
          {...a11yProps(0)}
        />
        <Tab
          color="primary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "primary.darky" },
            ml: 2,
          }}
          to="participants"
          label={t("common.participants")}
          {...a11yProps(1)}
        />
        <Tab
          color="primary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "primary.darky" },
            ml: 2,
          }}
          to="documents"
          label={t("common.documents")}
          {...a11yProps(2)}
        />
        <Tab
          color="primary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "primary.darky" },
            mx: 2,
          }}
          to="taches"
          label={t("common.tasks")}
          {...a11yProps(3)}
        />
        <Tab
          color="primary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "primary.darky" },
            mr: 2,
          }}
          to="album"
          label={t("common.travelAlbum")}
          {...a11yProps(4)}
        />
        <Tab
          color="secondary"
          component={Link}
          sx={{
            textDecoration: "none",
            "&:hover": { backgroundColor: "secondary.darky" },
          }}
          to={`/travel/${id_travel}`}
          label={t("common.planify")}
          {...a11yProps(5)}
        />
      </Tabs>
      {/* <Paper sx={{ width: '100%', p: 1, backgroundColor: "secondary.lighter" }}>
        {travelData && travelData.name ?
          <>
            <Typography sx={{ my: '10px' }} variant="h5">{travelData?.name}</Typography>
            <Divider sx={{ my: 1, mb: 2 }} />
          </>
          : null
        } */}
      {/* // <Button id="one" size="small" color="primary" variant="contained" component={Link} sx={{ textDecoration: "none" }} to="info">Informations</Button>
        // <Button size="small" color="primary" variant="contained" component={Link} sx={{ textDecoration: "none", ml: 2 }} to="participants">Participants</Button>
        // <Button size="small" color="primary" variant="contained" component={Link} sx={{ textDecoration: "none", ml: 2 }} to="documents">Documents</Button>
        // <Button size="small" color="primary" variant="contained" component={Link} sx={{ textDecoration: "none", mx: 2 }} to="taches">Tâches</Button>
        // <Button size="small" color="primary" variant="contained" component={Link} sx={{ textDecoration: "none", mr: 2 }} to="album">Album de voyage</Button>
        // <Button size="small" color="secondary" variant="contained" component={Link} sx={{ textDecoration: "none", "&:hover": { backgroundColor: "secondary.darky" } }} to={`/travel/${id_travel}`}>Planifier</Button> */}
      {/* </Tabs> */}
      {/* </Paper> */}
      {/* <Divider flexItem sx={{ mt: 3 }} /> */}
      <Outlet />
    </Box>
  );
};
