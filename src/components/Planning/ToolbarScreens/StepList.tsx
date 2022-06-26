import React from "react";
import { StepsDragGroup } from "../StepsDragGroup";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const StepList = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "secondary.lightest",
          padding: 1,
          mb: 1,
          borderRadius: "4px",
        }}
      >
        <Typography
          textTransform="uppercase"
          color="secondary.darker"
          ml={1}
          fontWeight="medium"
          variant="h6"
        >
          {t("map.step.listOfSteps")}
        </Typography>
      </Box>
      <StepsDragGroup />
    </>
  );
};
