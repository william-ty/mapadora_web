import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import { Task } from "model/Task";
import { EditTodo } from "./EditTodo";
import { SelectChangeEvent, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { TaskListTag } from "model/TaskListTag";
import { useTranslation } from "react-i18next";
import CircleCheckedFilled from "@mui/icons-material/CheckCircle";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import api from "api/api";
import { useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router";

export type ToggleComplete = (selectedTodo: Task) => void;
export type HandleDelete = (selectedTodo: Task) => void;
export type HandleUpdate = (selectedTodo: Task) => void;

export type AddTodo = (newTodo: Task) => void;

interface TodoListItemProps {
  todo: Task;
  toggleComplete?: ToggleComplete;
  handleDelete?: HandleDelete;
  newTodoName?: string;
  newTodoDate?: Date | null;
  onChangeTag?: ({
    target: { name, value },
  }: SelectChangeEvent<string>) => void;
  tags: TaskListTag[];
  handleClickTagToAdd?: (tag: TaskListTag, selectedTask: Task) => void;
  handleDeleteTagFromTask?: (tag: TaskListTag, selectedTodo: Task) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
  handleDelete,
  newTodoName,
  newTodoDate,
  handleClickTagToAdd,
  onChangeTag,
  tags,
  handleDeleteTagFromTask,
}) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const [newTodo, setNewTodo] = React.useState<Task>();
  // const [tagsToAdd, setTagsToAdd] = React.useState<TaskListTag[]>();

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const labelId = `checkbox-list-secondary-label-${todo}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMoreTag = Boolean(anchorEl);
  const handleClickMoreTag = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMoreTag = () => {
    setAnchorEl(null);
  };
  const [tagsNotIncluded, setTagsNotIncluded] = React.useState<TaskListTag[]>();

  React.useEffect(() => {
    if (tags) {
      if (todo.TaskListTags) {
        if (todo.TaskListTags.length > 0) {
          setTagsNotIncluded(
            tags?.filter((tag) => {
              let res = true;
              todo.TaskListTags.forEach((todoTag) => {
                if (todoTag.id === tag.id) res = false;
              });
              return res;
            })
          );
        } else {
          setTagsNotIncluded(tags);
        }
      }
    }
  }, [tags, todo]);

  React.useEffect(() => {
    setNewTodo(todo);
  }, [todo]);

  // React.useEffect(() => {
  //   console.log(tagsNotIncluded)
  // }, [tagsNotIncluded])

  const updateTodo = useMutation(api.update, {
    onSuccess: (todo, { id }) => {
      queryClient.setQueryData<Task[]>(["todos", id_travel], (todos) =>
        todos!.map((t) => (t.id === id ? todo : t))
      );
    },
  });

  const handleUpdate = () => {
    // console.log("UPDATE");
    // console.log(newTodo);
    updateTodo.mutate({
      route: Task.routeName,
      id: newTodo?.id!,
      body: newTodo,
      idTravel: id_travel,
    });
  };

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // setNewTagName(e.target.value);
  //   setTagToUpdate({
  //     ...tagToUpdate, "name": e.target.value
  //   })
  //   console.log(tagToUpdate)
  // };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo!, name: e.target.value });
    // console.log("NAME");
    // console.log(newTodo);
  };

  const handleDateChange = (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => {
    const d = date?.toISOString();
    setNewTodo({ ...newTodo!, execution_date: d! });
    // console.log("DATE");
    // console.log(newTodo);
  };

  return (
    <>
      <Box display="flex" sx={{ mb: 1 }}>
        {/* TASK EDIT MODE */}
        {editMode === true ? (
          <ListItem
            sx={{
              backgroundColor: "primary.lightest",
              p: 1.5,
              border: 2,
              borderColor: "primary.light",
            }}
            // key={todo}
          >
            <EditTodo
              todo={newTodo}
              newTodoName={newTodoName!}
              newTodoDate={newTodoDate!}
              handleNameChange={handleNameChange!}
              handleDateChange={handleDateChange!}
              // handleClickTagToAdd={handleClickTagToAdd}
              onChangeTag={onChangeTag}
              tags={tags}
            />
          </ListItem>
        ) : handleDelete ? (
          // {/* TASK REGULAR MODE */}
          <ListItem
            sx={{
              backgroundColor: "primary.lightest",
              pointer: "default",
              p: 1,
              pl: 2,
              border: 2,
              borderColor: "primary.light",
            }}
            secondaryAction={
              toggleComplete && (
                <Checkbox
                  onChange={() => toggleComplete(todo)}
                  edge="end"
                  checked={todo.is_terminated === true}
                  inputProps={{ "aria-labelledby": labelId }}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              )
            }
            disablePadding
          >
            {/* <ListItemButton> */}
            <ListItemText sx={{ flex: 3 }} primary={`${todo.name}`} />
            <Box sx={{ flex: 3, display: "flex", alignItems: "center" }}>
              <Box>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openMoreTag ? "long-menu" : undefined}
                  aria-expanded={openMoreTag ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClickMoreTag}
                  sx={{
                    border: "solid 1px",
                    borderColor: "gray.main",
                    padding: 0.3,
                    mr: 1,
                  }}
                  size="small"
                >
                  {openMoreTag ? (
                    <Icon fontSize="medium">remove</Icon>
                  ) : (
                    <Icon fontSize="medium">add</Icon>
                  )}
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={openMoreTag}
                  onClose={handleCloseMoreTag}
                  PaperProps={{
                    style: {
                      maxHeight: "20rem",
                      width: "auto",
                      maxWidth: "10rem",
                      padding: "0 0.1rem",
                    },
                  }}
                >
                  {tagsNotIncluded &&
                  handleClickTagToAdd &&
                  tagsNotIncluded.length > 0 ? (
                    tagsNotIncluded.map((tag, key) => {
                      return (
                        <Chip
                          variant="outlined"
                          key={key}
                          sx={{
                            m: 0.3,
                            backgroundColor: "secondary.darky",
                            color: "secondary.lightest",
                            border: "solid 1px",
                            borderColor: "secondary.light",
                            "&:hover": {
                              backgroundColor: "secondary.light",
                              color: "secondary.darker",
                            },
                          }}
                          label={`${tag.name}`}
                          onClick={() => handleClickTagToAdd(tag, todo)}
                        />
                      );
                    })
                  ) : (
                    <Typography sx={{ px: 1 }}>{t("label.noLabel")}</Typography>
                  )}
                </Menu>
              </Box>
              {todo.TaskListTags && todo.TaskListTags!.length > 0 ? (
                <ListItemText>
                  {todo.TaskListTags?.map((tag, key) => (
                    <Chip
                      key={key}
                      sx={{
                        mr: 0.3,
                        my: 0.3,
                        backgroundColor: "secondary.lighter",
                        border: "solid 1px",
                        borderColor: "secondary.light",
                      }}
                      label={`${tag.name}`}
                      onDelete={() =>
                        handleDeleteTagFromTask &&
                        handleDeleteTagFromTask(tag, todo)
                      }
                    />
                  ))}
                </ListItemText>
              ) : (
                <ListItemText sx={{ flex: 3 }} primary={t("label.noLabel")} />
              )}
            </Box>
            <ListItemText sx={{ flex: 2 }} primary={todo.execution_date} />
            {/* </ListItemButton> */}
          </ListItem>
        ) : (
          // {/* TASK PLANNING MODE (readonly) */}
          <ListItem
            sx={{
              backgroundColor: "primary.lightest",
              pointer: "default",
              p: 1,
              pl: 2,
              border: 2,
              borderColor: "primary.light",
            }}
            secondaryAction={
              toggleComplete && (
                <Checkbox
                  onChange={() => toggleComplete(todo)}
                  edge="end"
                  checked={todo.is_terminated === true}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              )
            }
            disablePadding
          >
            <ListItemText sx={{ flex: 3 }} primary={`"${todo.name}"`} />
            <ListItemText
              sx={{ flex: 1, display: "flex", justifyContent: "end", mr: 1 }}
              primary={
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={openMoreTag ? "long-menu" : undefined}
                      aria-expanded={openMoreTag ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClickMoreTag}
                      sx={{
                        border: "solid 1px",
                        borderColor: "gray.main",
                        padding: 0.3,
                        ml: 1,
                      }}
                      size="small"
                    >
                      {openMoreTag ? (
                        <Icon fontSize="medium">remove</Icon>
                      ) : (
                        <Icon fontSize="medium">visibility</Icon>
                      )}
                    </IconButton>
                    <Typography ml={1}>Labels</Typography>
                  </Box>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={openMoreTag}
                    onClose={handleCloseMoreTag}
                    PaperProps={{
                      style: {
                        maxHeight: "20rem",
                        width: "auto",
                        maxWidth: "10rem",
                        padding: "0 0.1rem",
                      },
                    }}
                  >
                    {todo.TaskListTags && todo.TaskListTags.length > 0 ? (
                      todo.TaskListTags.map((tag, key) => {
                        return (
                          <Chip
                            variant="outlined"
                            key={key}
                            sx={{
                              m: 0.3,
                              backgroundColor: "secondary.darky",
                              color: "secondary.lightest",
                              border: "solid 1px",
                              borderColor: "secondary.light",
                              "&:hover": {
                                backgroundColor: "secondary.light",
                                color: "secondary.darker",
                              },
                            }}
                            label={`${tag.name}`}
                            // onClick={() => handleClickTagToAdd(tag, todo)}
                          />
                        );
                      })
                    ) : (
                      <Typography px={1} fontSize="small">
                        {t("label.noLabel")}
                      </Typography>
                    )}
                  </Menu>
                </Box>
              }
            />
            <ListItemText sx={{ flex: 1 }} primary={todo.execution_date} />
          </ListItem>
        )}
        {editMode === false && handleDelete ? (
          <>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              onClick={() => handleDelete(todo)}
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
          handleDelete && (
            <>
              <Button
                variant="contained"
                sx={{ px: 3.5, ml: 1 }}
                onClick={() => {
                  // console.log(todo);
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
          )
        )}
      </Box>
    </>
  );
};
