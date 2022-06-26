import react, { useEffect, useState } from "react";
import {
  Button,
  Box,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { InterestPoint } from "../../../model/InterestPoint";
import { Step } from "../../../model/Step";
import { Element } from "../../../model/Element";
import { Point } from "../../../model/Point";
import { useMutation, useQueryClient, useQuery } from "react-query";
import api from "../../../api/api";
import { SelectedStep } from "./EditStep";
import EventIcon from "@mui/icons-material/Event";
import React from "react";
import { useTranslation } from "react-i18next";

export type SelectedInterestPoint = {
  id?: number;
  element?: Element;
  point?: Point;
  order?: number;
  id_step?: number;
  day?: number;
};

export const EditInterestPoint = () => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedId = id ? parseInt(id) : null;

  const {
    interestPoints,
    steps,
  }: { interestPoints: InterestPoint[]; steps: Step[] } = useOutletContext();

  const queryClient = useQueryClient();

  const [selectedInterestPoint, setSelectedInterestPoint] =
    useState<SelectedInterestPoint>();
  const [selectedStep, setSelectedStep] = useState<Step>();

  const [interestpointToUpdate, setInterestPointToUpdate] =
    useState<SelectedInterestPoint>();
  const [days, setDays] = React.useState<number[]>([]);
  const [dayEditAvailable, setDayEditAvailable] =
    React.useState<boolean>(false);

  useEffect(() => {
    // console.log("selectedId")
    // console.log(selectedId)

    interestPoints.forEach((interestpoint: InterestPoint) => {
      interestpoint?.id === selectedId &&
        setSelectedInterestPoint(interestpoint);

      interestpoint?.id === selectedId &&
        setInterestPointToUpdate(interestpoint);
    });
  }, [selectedId, interestPoints]);

  useEffect(() => {
    selectedInterestPoint &&
      steps.forEach((step: Step) => {
        selectedInterestPoint.id_step === step.id && setSelectedStep(step);
      });
  }, [selectedInterestPoint, steps]);

  const updateInterestPoint = useMutation(api.update, {
    onSuccess: (interestpoint, { id }) => {
      // Solves an update bug
      queryClient.invalidateQueries(["interestPoints", id_travel]);

      // queryClient.setQueryData<InterestPoint[]>(
      //   ["interestPoints", id_travel],
      //   (interestPoints) =>
      //     interestPoints!.map((i) =>
      //       (i.id === id ? interestpoint : i)
      //     )
      // );
    },
  });

  // useEffect(() => {
  //   // if (selectedInterestPoint && selectedInterestPoint.id) {
  //   //   const _step = () => api.getOne({ route: Step.routeName, id: selectedInterestPoint.id, idTravel: id_travel });
  //   //   setSelectedStep(_step);
  //   // }
  //   // if(step) {
  //   //   setSelectedStep(_step);
  //   // }
  // }, [selectedInterestPoint]);

  // useEffect(() => {
  //   console.log("interestpointToUpdate");
  //   console.log(interestpointToUpdate);
  //   console.log("selectedInterestPoint")
  //   console.log(selectedInterestPoint)
  //   console.log("days")
  //   console.log(days)
  // }, [interestpointToUpdate, selectedInterestPoint, days]);

  // useEffect(() => {
  //   console.log("interestpointToUpdate");
  //   console.log(interestpointToUpdate);
  // }, [interestpointToUpdate]);

  useEffect(() => {
    if (selectedStep && selectedStep.duration) {
      let _days: any = [];
      for (let i = 1; i <= selectedStep.duration; i++) {
        _days.push(i);
      }
      // console.log("_days");
      // console.log(_days);
      setDays(_days);
    }
  }, [selectedInterestPoint, selectedStep]);

  // const onTextChange = (e: any) => setTextValue(e.target.value);
  const handleCancel = () => navigate(-1);

  const handleSubmit = (event: any) => {
    updateInterestPoint.mutate({
      route: InterestPoint.routeName,
      id: interestpointToUpdate?.id!,
      body: interestpointToUpdate!,
      idTravel: id_travel,
    });
    navigate(-1);
  };

  const onChangeStep = ({
    target: { name, value },
  }: SelectChangeEvent<string>) => {
    setInterestPointToUpdate({ ...interestpointToUpdate, [name]: value });
    setDayEditAvailable(true);
  };

  const onChangeDays = async ({
    target: { name, value },
  }: SelectChangeEvent<string>) => {
    setInterestPointToUpdate({
      ...interestpointToUpdate,
      [name]: value,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.lighter",
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
          {t("map.interestPoint.edit")} «{selectedInterestPoint?.element?.name}»
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.lighter",
          padding: 2,
          borderRadius: "4px",
        }}
        display="flex"
        flexDirection="column"
      >
        <FormControl>
          <TextField
            focused
            name="element"
            id="filled-required"
            label={t("common.name")}
            variant="filled"
            sx={{ my: 2, backgroundColor: "white" }}
            value={interestpointToUpdate?.element?.name}
            onChange={({
              target: { name, value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              const element = interestpointToUpdate?.element;
              setInterestPointToUpdate({
                ...interestpointToUpdate,
                [name]: { ...element, name: value },
              });
            }}
            color="primary"
          />
          <TextField
            name="element"
            focused
            id="filled-required"
            label={t("common.description")}
            variant="filled"
            sx={{ my: 2, backgroundColor: "white" }}
            value={interestpointToUpdate?.element?.description}
            onChange={({
              target: { name, value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              const element = interestpointToUpdate?.element;
              setInterestPointToUpdate({
                ...interestpointToUpdate,
                [name]: { ...element, description: value },
              });
            }}
            color="primary"
          />
          <FormControl>
            <InputLabel id="interestpoint-step">{t("common.step")}</InputLabel>
            <Select
              native
              labelId="interestpoint-step"
              id="interestpoint-step"
              // value={selectedStep!.element?.name}
              // value={selectedStep!.id!.toString()}
              autoWidth
              autoFocus
              label={t("common.step")}
              name="id_step"
              onChange={onChangeStep}
            >
              {selectedInterestPoint?.id_step ? (
                <option value="none" selected disabled>
                  {
                    steps?.filter(
                      (step) => step.id === selectedInterestPoint.id_step
                    )[0].element.name
                  }
                </option>
              ) : (
                <option selected value="none" disabled>
                  Choisir une étape
                </option>
              )}
              {/* <MenuItem value="">
            <em>Sélectionner une étape</em>
          </MenuItem> */}
              {steps?.map((step) => (
                <option value={step.id}>{step.element.name}</option>
              ))}
            </Select>
          </FormControl>
          {selectedInterestPoint &&
            (selectedInterestPoint.id_step || dayEditAvailable) && (
              <Box sx={{ flex: 2, mt: 2 }}>
                <FormControl
                  sx={{ flexDirection: "row", alignItems: "center", mx: 2 }}
                >
                  {/* <EventIcon /> */}
                  <Select
                    labelId="interestpoint-day"
                    id="interestpoint-day"
                    name="day"
                    // autoWidth
                    defaultValue=""
                    displayEmpty
                    variant="standard"
                    disableUnderline
                    onChange={onChangeDays}
                    renderValue={(value) => {
                      return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          {/* <SvgIcon color="primary"> */}
                          <EventIcon sx={{ ml: 1 }} />
                          {/* </SvgIcon> */}
                          {interestpointToUpdate?.day
                            ? interestpointToUpdate?.day +
                              "/" +
                              selectedStep?.duration
                            : "N/A"}
                        </Box>
                      );
                    }}
                    // MenuProps={MenuProps}
                  >
                    {days && days.length > 0 ? (
                      days.map((option: any) => (
                        <MenuItem key={option} value={option}>
                          {t("map.day")} {option}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>Aucuns jours</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            )}

          <Box mt={2}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "warning.darky",
                "&:hover": {
                  backgroundColor: "warning.main",
                  color: "warning.lighter",
                },
                color: "warning.lighter",
                borderColor: "warning.main",
                textAlign: "left",
                minHeight: 0,
                padding: "0.5rem",
                minWidth: "8rem",
              }}
              onClick={handleCancel}
            >
              {t("common.toCancel")}
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "primary.darky",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "primary.lighter",
                },
                color: "primary.lighter",
                borderColor: "primary.main",
                textAlign: "left",
                minHeight: 0,
                padding: "0.5rem",
                minWidth: "8rem",
                ml: 2,
              }}
              onClick={handleSubmit}
            >
              {t("common.validate")}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
