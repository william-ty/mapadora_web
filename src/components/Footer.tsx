import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { Copyright } from "./Copyright";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ bgcolor: "#ddd", p: 6 }} component="footer">
      {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        {t("footer.text")}
      </Typography>
      <Typography color="text.secondary" align="center" paragraph>
        {/* <Link color="inherit" href="/credits">Crédit photo</Link> */}
        <Button
          component={Link}
          style={{ textDecoration: "none" }}
          sx={{ color: "inherit" }}
          to="/credits"
        >
          {t("footer.credit")}
        </Button>
      </Typography>
      <Copyright />
    </Box>
  );
};
