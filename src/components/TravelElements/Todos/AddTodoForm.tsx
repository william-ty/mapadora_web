import React from "react";
import { Button, Box, SelectChangeEvent } from "@mui/material";
import { EditTodo } from "./EditTodo";
import { TaskListTag } from "model/TaskListTag";
import { useTranslation } from "react-i18next";
import { AddTodo } from "./AddTodo";

interface AddTodoFormProps {
  newTodoName: string;
  newTodoDate: Date;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onChangeTag: ({ target: { name, value } }: SelectChangeEvent<string>) => void;
  tags: TaskListTag[];
  handleClickTagsToAdd: (tag: TaskListTag) => void;
  tagsToAdd?: TaskListTag[];
  setTagsToAdd: (value: TaskListTag[]) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  newTodoName,
  newTodoDate,
  handleNameChange,
  handleDateChange,
  handleSubmit,
  onChangeTag,
  tags,
  tagsToAdd,
  setTagsToAdd,
  handleClickTagsToAdd,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <AddTodo
          newTodoName={newTodoName}
          newTodoDate={newTodoDate!}
          handleNameChange={handleNameChange}
          handleDateChange={handleDateChange}
          onChangeTag={onChangeTag}
          tags={tags}
          tagsToAdd={tagsToAdd}
          setTagsToAdd={setTagsToAdd}
          handleClickTagsToAdd={handleClickTagsToAdd}
        />
        <Button
          sx={{ ml: 2, height: "3.4rem" }}
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          {t("common.add")}
        </Button>
      </Box>
    </>
  );
};
