import { Box, Typography } from "@mui/material";
import React from "react";
import { InterestPointsDragGroup } from "../InterestPointsDragGroup";
import { useTranslation } from "react-i18next";

export const InterestPointList = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.lightest",
          padding: 1,
          mb: 1,
          borderRadius: "4px",
        }}
      >
        <Typography
          textTransform="uppercase"
          color="primary.darker"
          ml={1}
          fontWeight="medium"
          variant="h6"
        >
          {t("map.interestPoint.listOfInterestPoints")}
        </Typography>
      </Box>
      <InterestPointsDragGroup />
    </>
  );
};
