import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import PinDropIcon from "@mui/icons-material/PinDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";

import TravelImgPlaceholder from "../../img/travel_placeholder.jpg";
import { Travel } from "./Travels";
import { useTranslation } from "react-i18next";

export type TravelListItemProps = {
  travel: Travel;
  removeFonction(travel: Travel): void;
};

const TravelListItem = ({ travel, removeFonction }: TravelListItemProps) => {
  const { t } = useTranslation();

  let CardSubHeader = () => {
    return (
      <Stack direction="row" spacing={4}>
        <Box sx={{ display: "flex" }}>
          <AccessTimeIcon sx={{ marginRight: 1 }} />
          {printDuration(travel.duration)}
        </Box>
        <Box sx={{ display: "flex" }}>
          <PinDropIcon sx={{ marginRight: 1 }} />
          {printStepsNumber(travel.stepsNumber)}
        </Box>
      </Stack>
    );
  };

  let printDuration = (duration: number): string => {
    if (duration <= 1) {
      return `1 ${t("common.day").toLowerCase()}`;
    } else {
      return duration + ` ${t("common.days").toLowerCase()}`;
    }
  };

  let printStepsNumber = (stepsNumber: number): string => {
    if (stepsNumber <= 1) {
      return `1 ${t("common.step").toLowerCase()}`;
    } else {
      return stepsNumber + ` ${t("common.steps").toLowerCase()}`;
    }
  };

  let printDepartureDate = (departureDate: Date | undefined): string => {
    if (departureDate === null) {
      return t("common.undefined").toLowerCase();
    } else {
      var dateFormat = new Intl.DateTimeFormat("fr-FR", {
        hour12: false,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return dateFormat.format(departureDate);
    }
  };

  return (
    <Card>
      <Stack direction="row">
        <CardMedia
          component="img"
          image={TravelImgPlaceholder}
          alt=""
          sx={{ height: "220px" }}
        />
        <Stack direction="column" justifyContent="space-between">
          <CardHeader title={travel.name} subheader={<CardSubHeader />} />
          <CardContent>
            <Typography variant="body1">
              {t("travel.departureDate")} :{" "}
              {printDepartureDate(travel.departureDate)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              component={RouterLink}
              to="/"
              sx={{ marginRight: 2 }}
            >
              {t("common.show")}
            </Button>
            {/* <Button variant="outlined" startIcon={<EditIcon />} >Modifier</Button> */}
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => removeFonction(travel)}
            >
              {t("common.delete")}
            </Button>
          </CardActions>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TravelListItem;
