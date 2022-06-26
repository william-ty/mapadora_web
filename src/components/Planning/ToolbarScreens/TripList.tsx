import { Box, Typography } from "@mui/material";
import React from "react";
import { TripGroup } from "../TripGroup";
import { useTranslation } from "react-i18next";

export const TripList = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          backgroundColor: "accent.lightest",
          padding: 1,
          mb: 1,
          borderRadius: "4px",
        }}
      >
        <Typography
          textTransform="uppercase"
          color="accent.darker"
          ml={1}
          fontWeight="medium"
          variant="h6"
        >
          {t("map.trip.listOfTrips")}
        </Typography>
      </Box>
      <TripGroup />
    </>
  );
};
