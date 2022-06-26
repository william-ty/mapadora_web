import { ImagesearchRollerOutlined } from "@mui/icons-material";
import { Button, Box, Container, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export function ErrorFallback() {
  const { t } = useTranslation();

  const imageError = require("../../img/static/error/error.jpeg");
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <h1>{t("common.somethingWentWrong")}</h1>
        <Box mb="10px">
          <img src={imageError} width="200px" alt="error" />
        </Box>
        <Button onClick={() => navigate(-1)} variant="contained">
          {t("common.back")}
        </Button>
      </Box>
    </Container>
  );
}
