import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SvgMapadoraLogoCropped from "../../img/sprites/MapadoraLogoCropped";
import { useAuth } from "provider/AuthProvider";
import { useTranslation } from "react-i18next";

type TagListProps = {
  image: string;
  title: string;
  subtitle: string;
};

export const TitleCard = (props: TagListProps) => {
  const { t } = useTranslation();

  const { user } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",

        justifyContent: "center",
        flexDirection: "column",
        maxHeight: "100%",
        minWidth: "320px",
      }}
    >
      <Box sx={{ width: '15rem', height: '15rem' }}>

        <img src="mapadora_logo_simple-01.png" width="100%" height="auto" alt="img" />
      </Box>
      {/* <SvgMapadoraLogoCropped /> */}

      <Typography gutterBottom variant="h3" component="div">
        {props.title}
      </Typography>
      <Typography variant="h4" color="text.secondary">
        {props.subtitle}
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          component={HashLink}
          to="#publicTravels"
          sx={{ mx: 2 }}
          size="large"
          variant="contained"
        >
          {t("home.beInspired")}
        </Button>
        {!user ? (
          <Button
            component={HashLink}
            to="/signin"
            sx={{ mx: 2, color: 'primary.dark', borderColor: 'primary.dark' }}
            size="large"
            variant="outlined"
          >
            {t("home.planify")}
          </Button>
        ) : (
          <Button
            component={HashLink}
            to="/dashboard/travel"
            sx={{ mx: 2, color: 'primary.dark', borderColor: 'primary.dark' }}
            size="large"
            variant="outlined"
          >
            {t("home.planify")}
          </Button>
        )}
      </Box>
      <HashLink to="#publicTravels">
        <KeyboardArrowDownIcon
          sx={{
            fontSize: "100px",
            mt: 2,
            color: "secondary.main",
            transition: "all 3s",
          }}
        />
      </HashLink>
    </Box>
  );
};
