import { Box, Typography } from "@mui/material";
import React from "react";
import { TripGroup } from "../TripGroup";
import { useTranslation } from "react-i18next";
import api from "api/api";
import { Task } from "model/Task";
import { TaskListTag } from "model/TaskListTag";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { TodoList } from 'components/TravelElements/Todos/TodoList';

export const TodoListPlanning = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const params = useParams();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);


  const { data: todos } = useQuery<Task[], Error>(
    ["todos", id_travel],
    () => api.get({ route: Task.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );

  const { data: tags } = useQuery<TaskListTag[], Error>(
    ["tags", id_travel],
    () => api.get({ route: TaskListTag.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );


  return (
    <>      <Box
      sx={{
        backgroundColor: "gray.lightest",
        padding: 1,
        mb: 1,
        borderRadius: "4px",
      }}
    >
      <Typography
        textTransform="uppercase"
        color="accent.darker"
        ml={1}
        // my={1}
        fontWeight="medium"
        variant="h6"
      >
        Liste de tâches
      </Typography>
    </Box>
      <Box
        sx={{
          backgroundColor: "gray.lightest",
          px: 1,
          borderRadius: "4px",
        }}
      >
        <TodoList
          todos={todos}
          tags={tags!}
        />
      </Box>
    </>
  );
};
