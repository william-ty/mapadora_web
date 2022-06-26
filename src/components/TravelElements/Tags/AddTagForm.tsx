import React, { ChangeEvent, FormEvent, useState } from "react";
import frLocale from "date-fns/locale/fr";
import { Button, FormControl, TextField, Box, Typography } from "@mui/material";
import { AddTag } from "./TagListItem";
import { EditTag } from "./EditTag";
import { useTranslation } from "react-i18next";
import { TaskListTag } from "model/TaskListTag";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import api from "api/api";

interface AddTagFormProps {}

export const AddTagForm: React.FC<AddTagFormProps> = () => {
  const { t } = useTranslation();
  const [newTagName, setNewTagName] = useState<string>("");
  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const createTag = useMutation(api.create, {
    onSuccess: (tag) => {
      queryClient.setQueryData<TaskListTag[]>(["tags", id_travel], (tags) =>
        tags ? [...tags, tag] : []
      );
    },
  });

  const addTag = (newTag: TaskListTag) => {
    // console.log(newTag);
    createTag.mutate({
      route: TaskListTag.routeName,
      body: newTag,
      idTravel: id_travel,
    });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    newTagName && addTag(new TaskListTag({ name: newTagName }));
    setNewTagName("");
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          type="text"
          placeholder="Label name"
          value={newTagName}
          onChange={handleNameChange}
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
