import { Button, Typography, Grid, Box } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link as RouterLink } from "react-router-dom";
import { Travel } from "../../model/Travel";
import { useTranslation } from "react-i18next";

type ButtonProps = {
  travel: Travel;
};

export const PrivateButtons = (props: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button variant="contained"  component={RouterLink}
            // to={`${props.travel.id}/info`}
            to={`${props.travel.id}/`}>
          <Typography
            sx={{ textDecoration: "none", color: "primary.darker" }}
           
          >
            {t("common.edit")}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
