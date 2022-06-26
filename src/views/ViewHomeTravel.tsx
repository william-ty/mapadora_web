import { Box, Typography } from "@mui/material";

import Travels from "../components/PrivateTravels/Travels";
import { useTranslation } from "react-i18next";

const ViewHomeTravel = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ margin: 16 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {t("common.myTravels")}
      </Typography>
      <Travels />
    </Box>
  );
};

export default ViewHomeTravel;
