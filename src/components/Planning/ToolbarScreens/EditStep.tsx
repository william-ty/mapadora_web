import { useEffect } from "react";
import { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Step } from "../../../model/Step";
import { Element } from "../../../model/Element";
import { Point } from "../../../model/Point";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../api/api";
import { useTranslation } from "react-i18next";

export type SelectedStep = {
  id?: number;
  element?: Element;
  point?: Point;
  order?: number;
  duration?: number;
  id_trip?: number;
};

export const EditStep = () => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedId = id ? parseInt(id) : null;

  const { steps }: { steps: Step[] } = useOutletContext();
  const [selectedStep, setSelectedStep] = useState<SelectedStep>();
  const [stepToUpdate, setStepToUpdate] = useState<SelectedStep>();

  // const onChange = (e: any) => setTextValue(e.target.value);

  useEffect(() => {
    steps.forEach((step: Step) => {
      step?.id === selectedId && setSelectedStep(step);
      step?.id === selectedId && setStepToUpdate(step);
    });
    // console.log(JSON.stringify(selectedStep, null, 2));
  }, [selectedId, steps, selectedStep]);

  const queryClient = useQueryClient();

  const updateStep = useMutation(api.update, {
    onSuccess: (step, { id }) => {
      // Solves an update bug
      queryClient.invalidateQueries(["steps", id_travel]);

      // queryClient.setQueryData<Step[]>(
      //   ["steps", id_travel],
      //   (steps) =>
      //     steps!.map((s) =>
      //       (s.id === id ? step : s)
      //     )
      // );
    },
  });

  // useEffect(() => {
  //   console.log(stepToUpdate)
  // }, [stepToUpdate])
  // const onTextChange = (e: any) => setTextValue(e.target.value);

  const handleCancel = () => navigate(-1);

  const handleSubmit = (event: any) => {
    // event.preventDefault();

    // console.log("ON SUBMIT : " + JSON.stringify(stepToUpdate, null, 2))

    // selectedStep &&
    updateStep.mutate({
      route: Step.routeName,
      id: stepToUpdate?.id!,
      body: stepToUpdate!,
      idTravel: id_travel,
    });
    navigate(-1);
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setStepToUpdate({ ...stepToUpdate, [name]: value });
  };

  // useEffect(() => {
  //   console.log("stepToUpdate");
  //   console.log(stepToUpdate);
  // }, [stepToUpdate]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "secondary.lighter",
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
          {t("map.step.edit")} «{selectedStep?.element?.name}»
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "secondary.lighter",
          padding: 2,
          borderRadius: "4px",
        }}
        display="flex"
        flexDirection="column"
      >
        <TextField
          name="element"
          // required
          id="filled-required"
          label={t("common.name")}
          focused
          variant="filled"
          sx={{ my: 2, backgroundColor: "white" }}
          value={stepToUpdate?.element?.name}
          onChange={({
            target: { name, value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            const element = stepToUpdate?.element;
            setStepToUpdate({
              ...stepToUpdate,
              [name]: { ...element, name: value },
            });
          }}
          color="secondary"
        />
        <TextField
          name="element"
          focused
          id="filled-required"
          label={t("common.description")}
          variant="filled"
          sx={{ my: 2, backgroundColor: "white" }}
          value={stepToUpdate?.element?.description}
          onChange={({
            target: { name, value },
          }: React.ChangeEvent<HTMLInputElement>) => {
            const element = stepToUpdate?.element;
            setStepToUpdate({
              ...stepToUpdate,
              [name]: { ...element, description: value },
            });
          }}
          color="secondary"
        />
        <TextField
          name="duration"
          focused
          id="filled-required"
          label={t("common.duration")}
          variant="filled"
          sx={{ my: 2, backgroundColor: "white" }}
          type="number"
          inputProps={{ min: 1 }}
          value={stepToUpdate?.duration?.toString()}
          onChange={onChange}
          color="secondary"
        />
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
              backgroundColor: "secondary.darky",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "secondary.lighter",
              },
              color: "secondary.lighter",
              borderColor: "secondary.main",
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
      </Box>
    </Box>
  );
};
