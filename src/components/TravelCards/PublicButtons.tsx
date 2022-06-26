import Button from "@mui/material/Button";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Travel } from "../../model/Travel";
import { useTranslation } from "react-i18next";

type ButtonProps = {
  redirectTo: string;
};

export const PublicButtons = (props: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button variant="contained"  component={RouterLink} to={`${props.redirectTo}`} endIcon={<TravelExploreIcon />}>
      <Typography
        sx={{ textDecoration: "none", color: "primary.darker" }}   
      >
        {t("common.see")}
      </Typography>
    </Button>
  );
};
