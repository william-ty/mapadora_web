import React, { ChangeEvent, FormEvent, useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import { ToggleComplete, HandleUpdate } from "./TodoListItem";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Task } from "model/Task";
import api from "api/api";
import { TodoHeader } from "./TodoHeader";
import { TaskListTag } from "model/TaskListTag";
import { useTranslation } from "react-i18next";

export const Todos: React.FC = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const [newTodo, setNewTodo] = useState<Task>();
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [newTodoDate, setNewTodoDate] = React.useState<Date | null>(null);
  const [tagsToAdd, setTagsToAdd] = React.useState<TaskListTag[]>();

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

  // Mutations
  const createTodo = useMutation(api.create, {
    onSuccess: (todo) => {
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos ? [...todos, todo] : []
      );
    },
  });

  // const addTagsToTask = useMutation(api.addTagsToTask, {
  //   onSuccess: (_, { taskId, body }) => {
  //     console.log("body")
  //     console.log(body)
  //     const tags = queryClient.getQueryData<TaskListTag[]>(["tags", id_travel]);
  //     queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
  //       (todos && tags) ? todos.map((t) => (t.id === taskId ? new Task({
  //         ...t,
  //         TaskListTags: body
  //       }) : t))
  //         : new Array<Task>()
  //     );
  //   },
  // });

  const addTagToTask = useMutation(api.addTagToTask, {
    onSuccess: (_, { tagId, taskId }) => {
      const tag = queryClient
        .getQueryData<TaskListTag[]>(["tags", id_travel])
        ?.find((t) => t.id === tagId);
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos && tag
          ? todos.map((t) =>
              t.id === taskId
                ? new Task({
                    ...t,
                    TaskListTags: [...t.TaskListTags, tag],
                  })
                : t
            )
          : new Array<Task>()
      );
    },
  });

  const deleteTodo = useMutation(api.delete, {
    onSuccess: (todo, { id }) => {
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos!?.filter((t) => t.id !== id)
      );
    },
  });
  const updateTodo = useMutation(api.update, {
    onSuccess: (todo, { id }) => {
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos!.map((t) => (t.id === id ? todo : t))
      );
    },
  });

  const removeTagFromTask = useMutation(api.removeTagFromTask, {
    onSuccess: (_, { taskId, tagId }) => {
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos!.map((t) =>
          t.id === taskId
            ? {
                ...t,
                TaskListTags: t.TaskListTags?.filter((tag) => tag.id !== tagId),
              }
            : t
        )
      );
    },
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("newTodoName")
    // console.log(newTodoName)
    // console.log("newTodo")
    // console.log(newTodo)
    setNewTodoName(e.target.value);
    setNewTodo({ ...newTodo!, name: newTodoName! });
  };
  const handleDateChange = (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => {
    setNewTodoDate(date);
    const d = newTodoDate?.toISOString();
    setNewTodo({ ...newTodo!, execution_date: d! });
  };

  // const addTodo: AddTodo = newTodo => {
  //   // console.log(newTodo)
  //   return createTodo.mutate({
  //     route: Task.routeName,
  //     body: newTodo,
  //     idTravel: id_travel,
  //   })
  // };

  // const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   newTodo && addTodo(new Task({
  //     name: newTodoName,
  //     execution_date: (newTodoDate !== null) ? newTodoDate.toISOString() : null,
  //     is_terminated: false,
  //     TaskListTags: []
  //   }));
  //   setNewTodoName("");
  //   setNewTodoDate(null);
  // };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    newTodo &&
      createTodo.mutate({
        route: Task.routeName,
        body: new Task({
          name: newTodoName,
          execution_date:
            newTodoDate !== null ? newTodoDate.toISOString() : null,
          is_terminated: false,
          TaskListTags: tagsToAdd ?? [],
        }),
        idTravel: id_travel,
      });
    setNewTodoName("");
    setNewTodoDate(null);
    setTagsToAdd([]);
  };

  const handleClickTagToAdd = (tag: TaskListTag, selectedTodo: Task) => {
    addTagToTask.mutate({
      idTravel: id_travel,
      taskId: selectedTodo.id,
      tagId: tag.id,
    });
  };

  const handleClickTagsToAdd = (tag: TaskListTag) => {};

  const handleDelete = (selectedTodo: Task) => {
    // console.log(selectedTodo);
    deleteTodo.mutate({
      route: Task.routeName,
      id: selectedTodo.id!,
      idTravel: id_travel,
    });
  };

  const toggleComplete: ToggleComplete = (selectedTodo) => {
    const checked = selectedTodo.is_terminated ? "false" : "true";

    Object.assign(selectedTodo, { is_terminated: checked });

    updateTodo.mutate({
      route: Task.routeName,
      id: selectedTodo?.id!,
      body: selectedTodo,
      idTravel: id_travel,
    });
  };

  const handleUpdate: HandleUpdate = (selectedTodo) => {
    // console.log("UPDATE");
    // console.log(selectedTodo);
    updateTodo.mutate({
      route: Task.routeName,
      id: selectedTodo?.id!,
      body: selectedTodo,
      idTravel: id_travel,
    });
  };

  const onChangeTag = ({
    target: { name, value },
  }: SelectChangeEvent<string>) => {
    value && setNewTodo({ ...newTodo!, [name]: value });
  };

  const handleDeleteTagFromTask = (tag: TaskListTag, selectedTodo: Task) => {
    removeTagFromTask.mutate({
      idTravel: id_travel,
      taskId: selectedTodo.id,
      tagId: tag.id,
    });
  };

  // React.useEffect(() => {
  //   console.log(newTodo);
  // }, [newTodo]);

  return (
    <Box my={2}>
      {/* <Typography variant="h4" sx={{ my: 2 }}>{t("task.taskList")}
</Typography> */}
      <AddTodoForm
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        newTodoName={newTodoName}
        newTodoDate={newTodoDate!}
        onChangeTag={onChangeTag}
        handleClickTagsToAdd={handleClickTagsToAdd}
        tags={tags!}
        tagsToAdd={tagsToAdd}
        setTagsToAdd={setTagsToAdd}
      />
      <TodoHeader />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        onChangeTag={onChangeTag}
        handleClickTagToAdd={handleClickTagToAdd}
        tags={tags!}
        handleDeleteTagFromTask={handleDeleteTagFromTask}
      />
    </Box>
  );
};
