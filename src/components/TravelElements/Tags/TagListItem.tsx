import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { TaskListTag } from "model/TaskListTag";
import { EditTag } from "./EditTag";
import { TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import api from "api/api";
import { useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router";

export type ToggleComplete = (selectedTag: TaskListTag) => void;
export type HandleDelete = (selectedTag: TaskListTag) => void;
export type HandleUpdate = (selectedTag: TaskListTag) => void;

export type AddTag = (newTag: TaskListTag) => void;

interface TagListItemProps {
  tag?: TaskListTag;
}

export const TagListItem: React.FC<TagListItemProps> = ({ tag }) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const [tagToUpdate, setTagToUpdate] = React.useState<TaskListTag>();

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const deleteTag = useMutation(api.delete, {
    onSuccess: (tag, { id }) => {
      queryClient.setQueryData<TaskListTag[]>(["tags", id_travel], (tags) =>
        tags!?.filter((t) => t.id !== id)
      );
    },
  });
  const updateTag = useMutation(api.update, {
    onSuccess: (tag, { id }) => {
      queryClient.setQueryData<TaskListTag[]>(["tags", id_travel], (tags) =>
        tags!.map((t) => (t.id === id ? tag : t))
      );
    },
  });

  React.useEffect(() => {
    tag && setTagToUpdate(tag);
  }, [tag]);

  const handleDelete = (selectedTag: TaskListTag) => {
    // console.log(selectedTag);
    deleteTag.mutate({
      route: TaskListTag.routeName,
      id: selectedTag.id!,
      idTravel: id_travel,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNewTagName(e.target.value);
    setTagToUpdate({
      ...tagToUpdate,
      name: e.target.value,
    });
    // console.log(tagToUpdate);
  };

  const handleUpdate = () => {
    updateTag.mutate({
      route: TaskListTag.routeName,
      id: tagToUpdate?.id!,
      body: tagToUpdate,
      idTravel: id_travel,
    });
  };

  return (
    <>
      <Box display="flex" sx={{ mb: 1 }}>
        {editMode === true ? (
          <ListItem
            sx={{ backgroundColor: "primary.lighter", p: 1.5 }}
            // key={tag}
          >
            <TextField
              type="text"
              placeholder="Label name"
              value={tagToUpdate?.name}
              onChange={handleNameChange}
            />
          </ListItem>
        ) : (
          <ListItem
            sx={{ backgroundColor: "primary.lighter" }}
            // key={tag}
          >
            <ListItemText sx={{ flex: 5 }} primary={`${tag?.name}`} />
          </ListItem>
        )}
        {editMode === false ? (
          <>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              onClick={() => handleDelete(tag!)}
            >
              <Icon>delete</Icon>
            </Button>
            <Button
              variant="contained"
              sx={{ px: 1 }}
              onClick={() => {
                editMode ? setEditMode(false) : setEditMode(true);
              }}
            >
              <Icon>edit</Icon>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ px: 3.5, ml: 1 }}
              onClick={() => {
                // console.log(tag);
                handleUpdate();
                editMode ? setEditMode(false) : setEditMode(true);
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {t("common.confirm")}
              </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                px: 3.5,
                ml: 1,
                backgroundColor: "gray.lighty",
                "&:hover": { backgroundColor: "gray.darky" },
              }}
              onClick={() => {
                editMode ? setEditMode(false) : setEditMode(true);
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {t("common.toCancel")}
              </Typography>
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
