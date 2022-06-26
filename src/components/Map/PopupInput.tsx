import { useState } from "react";
import { Element } from "../../model/Element";
import { Step } from "../../model/Step";
import { CreateType } from "../../api/api";
import mapboxgl from "mapbox-gl";
import { InterestPoint } from "../../model/InterestPoint";
import { Button, Input, Box, InputBase, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type PopupType = {
  title: string;
  object: Step | InterestPoint;
  map: any;
  action: any;
  currentTravelId: number;
  setAreTripsUpToDate?: (value: boolean) => void;
  addMutation: (variables: CreateType) => void;
};

export const PopupInput = ({
  title,
  object,
  map,
  action,
  currentTravelId,
  setAreTripsUpToDate,
  addMutation,
}: PopupType) => {
  const { t } = useTranslation();

  const [nameValue, setNameValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [durationValue, setDurationValue] = useState<number>(0);

  const createPoint = async (e: any, map: any) => {
    const element = new Element({
      name: nameValue,
      description: descriptionValue,
      predicted_date: new Date(),
      id_travel: currentTravelId,
    });
    if (object instanceof Step) {
      const stepToStore = object;
      stepToStore.element = element;
      stepToStore.duration = durationValue;
      // Send request to save point in DB
      addMutation({
        route: Step.routeName,
        body: stepToStore,
        idTravel: currentTravelId,
      });
    } else if (object instanceof InterestPoint) {
      const interestPointToStore = object;
      interestPointToStore.element = element;
      // Send request to save point in DB
      addMutation({
        route: InterestPoint.routeName,
        body: interestPointToStore,
        idTravel: currentTravelId,
      });
    }
    action();
  };

  return (
    <Box className="popup">
      <form>
        <Typography
          my={1}
          sx={{ textTransform: "uppercase" }}
          align="center"
          variant="subtitle1"
          component="h4"
        >
          {title}
        </Typography>
        <Box>
          <Input
            id="name-input"
            type="text"
            placeholder={t("map.title")}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <br />
          <Input
            id="description-input"
            type="text"
            placeholder={t("map.description")}
            onChange={(e: any) => setDescriptionValue(e.target.value)}
          />
          {object instanceof Step ? (
            <Box>
              <Input
                id="duration-input"
                type="number"
                placeholder={t("map.duration")}
                defaultValue="1"
                inputProps={{ min: 1 }}
                onChange={(e: any) => setDurationValue(e.target.value)}
              />
            </Box>
          ) : null}
          <Box mt={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="small"
              onClick={(e: any) => createPoint(e, map)}
            >
              {t("common.validate")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
