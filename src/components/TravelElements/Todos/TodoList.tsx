import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { Task } from "model/Task";
import { TaskListTag } from "model/TaskListTag";
import React from "react";
import { ToggleComplete, HandleDelete, HandleUpdate } from "./TodoListItem";
import { TodoListItem } from "./TodoListItem";
import { useTranslation } from "react-i18next";

interface TodoListProps {
  todos?: Array<Task>;
  toggleComplete?: ToggleComplete;
  handleDelete?: HandleDelete;
  handleUpdate?: HandleUpdate;
  handleClickTagToAdd?: (tag: TaskListTag, selectedTask: Task) => void;
  onChangeTag?: ({
    target: { name, value },
  }: SelectChangeEvent<string>) => void;
  tags: TaskListTag[];
  handleDeleteTagFromTask?: (tag: TaskListTag, selectedTodo: Task) => void;
  handleDateChange?: (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  handleDelete,
  handleUpdate,
  onChangeTag,
  handleClickTagToAdd,
  handleDeleteTagFromTask,
  handleDateChange,
  tags,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          {t("task.planifiedTasks")}
        </Typography>
        {todos && todos?.filter((todo) => !todo.is_terminated).length > 0 ? (
          todos
            ?.filter((todo) => !todo.is_terminated)
            .map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                onChangeTag={onChangeTag}
                handleClickTagToAdd={handleClickTagToAdd}
                tags={tags}
                handleDeleteTagFromTask={handleDeleteTagFromTask}
              />
            ))
        ) : (
          <Typography variant="subtitle2">{t("task.noTasksYet")}</Typography>
        )}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          {t("task.completedTask")}:
        </Typography>
        {todos && todos?.filter((todo) => todo.is_terminated).length > 0 ? (
          todos
            ?.filter((todo) => todo.is_terminated)
            .map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                onChangeTag={onChangeTag}
                handleClickTagToAdd={handleClickTagToAdd}
                tags={tags}
                handleDeleteTagFromTask={handleDeleteTagFromTask}
              />
            ))
        ) : (
          <Typography variant="subtitle2">{t("task.noTasksYet")}</Typography>
        )}
      </Box>
    </>
  );
};
