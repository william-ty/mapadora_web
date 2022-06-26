import { Typography, Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";
import { InterestPoint } from "../../../model/InterestPoint";
import { useData } from "../../../provider/DataProvider";
import { DocumentList } from "../DocumentList";
import { Step } from "../../../model/Step";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../api/api";
import { Task } from "model/Task";
import { useTranslation } from "react-i18next";

export const InterestPointDetail = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const {
    interestPoints,
    isEditable,
    steps,
  }: { interestPoints: InterestPoint[]; isEditable: boolean; steps: Step[] } =
    useOutletContext();
  const queryClient = useQueryClient();

  const { map } = useData();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const selectedId = id ? parseInt(id) : null;
  const [selectedStep, setSelectedStep] = useState<Step>();

  const [selectedInterestPoint, setSelectedInterestPoint] =
    useState<InterestPoint>();

  const [ipTasks, setIpTasks] = useState<Task[]>([]);

  useEffect(() => {
    interestPoints.forEach((interestPoint: InterestPoint) => {
      interestPoint?.id === selectedId &&
        setSelectedInterestPoint(interestPoint);
    });
  }, [selectedId, interestPoints]);

  useEffect(() => {
    if (selectedInterestPoint?.id_step) {
      steps.forEach((step: Step) => {
        step?.id === selectedInterestPoint?.id_step && setSelectedStep(step);
      });
    }
  }, [selectedInterestPoint, steps]);

  const {
    isLoading: taskIsLoading,
    isError: taskIsError,
    data: tasks,
  } = useQuery<Task[], Error>(
    ["tasks", id_travel],
    () =>
      api.get({
        route: Task.routeName,
        idTravel: id_travel,
      }),
    { structuralSharing: false }
  );

  useEffect(() => {
    // (tasks && tasks.length > 0) && tasks.forEach((task: Task) => {
    //   (task?.TaskListTags?.filter(tag => tag.name === selectedInterestPoint?.element.name)) &&
    //     (ipTasks ? setIpTasks([...ipTasks, task]) : setIpTasks([task]));
    // });

    // tasks?.forEach((task: Task) => {
    //   const result = task?.TaskListTags?.filter(tag => tag.name === selectedInterestPoint?.element.name);

    //   if (result.length !== 0) {
    //     console.log(task);
    //   }
    // });

    tasks
      ? setIpTasks(
          tasks?.filter(
            (task: Task) =>
              task?.TaskListTags?.filter(
                (tag) => tag.name === selectedInterestPoint?.element.name
              ).length > 0
          )
        )
      : setIpTasks([]);

    // console.log("tasks")
    // console.log(tasks)
    // console.log("ipTasks")
    // console.log(ipTasks)
  }, [tasks, selectedInterestPoint]);

  const deleteStep = useMutation(api.delete, {
    onSuccess: (step, { id }) => {
      queryClient.setQueryData<Step[]>(["steps", id_travel], (steps) =>
        steps!?.filter((s) => s.id !== id)
      );
    },
  });

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
          {t("map.interestPoint.detailsOfInterestPoint")} «
          {selectedInterestPoint?.element?.name}»
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "primary.lightest",
          padding: 2,
          borderRadius: "4px",
          // textTransform: 'capitalize'
        }}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("common.information")}
        </Typography>
        <Typography variant="body1" style={styles.title}>
          — {t("common.name")} :
        </Typography>
        <Typography variant="body1" style={styles.info}>
          {selectedInterestPoint?.element?.name}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
          — {t("common.description")} :
        </Typography>
        <Typography variant="body1" style={styles.info}>
          {selectedInterestPoint?.element?.description}
        </Typography>
        {selectedStep && (
          <>
            <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
              — {t("map.associatedStep")} :
            </Typography>
            <Typography
              variant="body1"
              sx={{ textTransform: "capitalize" }}
              style={styles.info}
            >
              {selectedStep?.element?.name}
            </Typography>
            <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
              {t("map.interestPoint.dayDescription")}
            </Typography>
            {selectedInterestPoint?.day ? (
              <>
                <Typography variant="body1" style={styles.info}>
                  {selectedInterestPoint?.day} / {selectedStep?.duration}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" style={styles.info}>
                {t("map.interestPoint.noDay")} {selectedStep?.duration}
              </Typography>
            )}
          </>
        )}
        {ipTasks && ipTasks.length > 0 && (
          <Typography sx={{ mt: 1 }} variant="body1" style={styles.title}>
            {t("map.associatedTasks")}
          </Typography>
        )}
        {ipTasks?.map((task, key) => (
          <Typography key={key} variant="body1" style={styles.info}>
            {task.name}
          </Typography>
        ))}
        {isEditable && (
          <>
            <Box sx={{ my: 2 }}>
              <Divider orientation="horizontal" flexItem />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t("common.documents")}
            </Typography>
            <DocumentList elementId={selectedInterestPoint?.element?.id} />
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
