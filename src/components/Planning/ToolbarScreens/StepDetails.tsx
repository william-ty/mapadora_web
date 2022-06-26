import { Divider, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Step } from "../../../model/Step";
import { DocumentList } from "../DocumentList";
import { InterestPointsDragGroup } from "../InterestPointsDragGroup";
import { useTranslation } from "react-i18next";

export const StepDetails = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams();
  const { steps, isEditable }: { steps: Step[]; isEditable: boolean } =
    useOutletContext();
  const selectedId = id ? parseInt(id) : null;

  const [selectedStep, setSelectedStep] = useState<Step>();

  useEffect(() => {
    steps &&
      steps.forEach((step: Step) => {
        step?.id === selectedId && setSelectedStep(step);
      });
  }, [selectedId, steps]);

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
          {t("map.step.detailsOfStep")} «{selectedStep?.element?.name}»
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "secondary.lightest",
          padding: 2,
          borderRadius: "4px",
        }}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("common.information")} «{selectedStep?.element?.name}»
        </Typography>
        <Typography variant="body1" style={styles.title}>
          — {t("common.name")} :
        </Typography>
        <Typography variant="body1" style={styles.info}>
          {selectedStep?.element?.name}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
          — {t("common.description")} :
        </Typography>
        <Typography variant="body1" style={styles.info}>
          {selectedStep?.element?.description}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
          — Durée:
        </Typography>
        <Typography variant="body1" style={styles.info}>
          {selectedStep?.duration} jour(s)
        </Typography>
        <Box sx={{ my: 2 }}>
          <Divider orientation="horizontal" flexItem />
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("map.associatedinterestPoints")}
        </Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          <InterestPointsDragGroup
            stepId={selectedId}
            stepDays={selectedStep?.duration}
          />
        </Box>
        {isEditable && (
          <>
            <Box sx={{ my: 2 }}>
              <Divider orientation="horizontal" flexItem />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t("common.documents")}
            </Typography>
            <DocumentList elementId={selectedStep?.element?.id} />
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
