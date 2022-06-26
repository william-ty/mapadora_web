import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";

export const Copyright = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://mapadora.fr/">
        {t("appName")}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
