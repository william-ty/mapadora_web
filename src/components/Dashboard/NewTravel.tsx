import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Travel } from "../../model/Travel";
import { tagList } from "../Tags/factories/tagListFactory";
import api from "../../api/api";
import { url_prefix } from "../../api/util";
import { StringDecoder } from "string_decoder";
import { travelsFactory } from "../PublicTravels/factories/travelsFactory";
import { TravelComp } from "./TravelComp";
import { useMainData } from "provider/MainDataProvider";
import { useTranslation } from "react-i18next";

export const NewTravel = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { showFeedback } = useMainData();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    travel: Travel
  ) => {
    event.preventDefault();

    api
      .create({ route: Travel.routeName, body: travel })
      .then((res) => {
        navigate(`/travel/${res.travel.id}`);
        showFeedback(`Voyage ${res.travel.name} sauvegardé !`);
        // TODO - update i18n
      })
      .catch((err) => setError(err));
  };

  return (
    <Box>
      <Typography variant="h5">
        {t("dashboard.newTravel.createNewTravel")}

      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box width='40%'>
        <TravelComp travel={undefined} onSubmitAction={handleSubmit} />
        {error ? (
          <Typography sx={{ color: "palette.error.main" }}>
            {t("dashboard.newTravel.errorWhileCreating")}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};
