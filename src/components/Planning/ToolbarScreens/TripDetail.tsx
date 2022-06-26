import { Typography, Box, Divider } from "@mui/material";
import { TripStep } from "components/MapItems/DraggableListItem";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { DocumentList } from "../DocumentList";
import { useTranslation } from "react-i18next";

export const TripDetail = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  // const { selectedId } = useData();
  const { id } = useParams();
  const {
    tripSteps,
    isEditable,
  }: { tripSteps: TripStep[]; isEditable: boolean } = useOutletContext();

  const [selectedTripStep, setSelectedTripStep] = useState<TripStep>();

  useEffect(() => {
    tripSteps.forEach((tripStep: TripStep) => {
      tripStep?.trip?.id?.toString() === id && setSelectedTripStep(tripStep);
      tripStep?.trip?.id?.toString() === id && console.log(tripStep);
    });
  }, [id, tripSteps]);

  // useEffect(() => {
  //   console.log(selectedTripStep);
  // }, [selectedTripStep]);

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
          {t("map.trip.detailsOfTrip")} «{selectedTripStep?.trip?.element?.name}
          »
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "accent.lightest",
          padding: 2,
          borderRadius: "4px",
        }}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("common.information")}
        </Typography>
        <Typography
          textTransform="capitalize"
          variant="body1"
          style={styles.title}
        >
          {t("map.trip.departureStep")}
        </Typography>
        <Typography
          textTransform="capitalize"
          variant="body1"
          style={styles.info}
        >
          {selectedTripStep?.departure?.element?.name}
        </Typography>
        <Typography
          textTransform="capitalize"
          sx={{ mt: 1 }}
          variant="body1"
          style={styles.title}
        >
          {t("map.trip.arrivalStep")}
        </Typography>
        <Typography
          textTransform="capitalize"
          variant="body1"
          style={styles.info}
        >
          {selectedTripStep?.arrival?.element?.description}
        </Typography>
        <Typography
          textTransform="capitalize"
          sx={{ mt: 1 }}
          variant="body1"
          style={styles.title}
        >
          — {t("map.trip.transportMode")} :
        </Typography>
        <Typography
          textTransform="capitalize"
          variant="body1"
          style={styles.info}
        >
          {selectedTripStep?.trip?.transport_mode?.name}
        </Typography>
        {isEditable && (
          <>
            <Box sx={{ my: 2 }}>
              <Divider orientation="horizontal" flexItem />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t("common.documents")}
            </Typography>
            <DocumentList elementId={selectedTripStep?.trip?.element?.id} />
          </>
        )}
      </Box>
    </>
  );
};

const styles = {
  title: { fontWeight: "bold" },
  info: { marginLeft: 20 },
};
