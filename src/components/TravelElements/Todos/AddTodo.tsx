import React, { ChangeEvent } from "react";
import frLocale from "date-fns/locale/fr";
import {
  Box,
  Chip,
  Divider,
  Icon,
  IconButton,
  Menu,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TaskListTag } from "model/TaskListTag";
import theme from "../../../theme/theme";
import { useTranslation } from "react-i18next";
import { Task } from "model/Task";

export const AddTodo = ({
  newTodoName,
  newTodoDate,
  handleNameChange,
  handleDateChange,
  onChangeTag,
  tags,
  tagsToAdd,
  setTagsToAdd,
  handleClickTagsToAdd,
  todo,
}: {
  todo?: Task;
  newTodoName: string;
  newTodoDate: Date;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
  onChangeTag?: ({
    target: { name, value },
  }: SelectChangeEvent<string>) => void;
  tags: TaskListTag[];
  tagsToAdd?: TaskListTag[];
  setTagsToAdd?: (value: TaskListTag[]) => void;
  handleClickTagsToAdd?: (tag: TaskListTag) => void;
}) => {
  const { t } = useTranslation();

  const [tagsFound, setTagsFound] = React.useState<TaskListTag[]>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMoreTag = Boolean(anchorEl);

  React.useEffect(() => {
    let _tags = tagsToAdd
      ? tags?.filter((tag) => !tagsToAdd.includes(tag))
      : tags;

    // console.log("TAGS");
    // console.log(_tags);

    setTagsFound(_tags);

    // return () => {
    //   _tags = [];
    //   // tagsToAdd && _tags?.filter(_tag => !tagsToAdd.includes(_tag));
    // }
  }, [tags, tagsToAdd]);

  // React.useEffect(() => {
  //   setTagsFound(tagsToAdd ? tags?.filter(tag => !tagsToAdd.includes(tag)) : tags);

  // }, [tags, tagsToAdd])

  // React.useEffect(() => {
  //   console.log("tagsToAdd")
  //   console.log(tagsToAdd)
  //   console.log("tags")
  //   console.log(tags)
  //   console.log("tagsFound")
  //   console.log(tagsFound)

  // }, [tags, tagsToAdd, tagsFound])

  const handleClickMoreTag = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMoreTag = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        sx={{ mr: 1 }}
        type="text"
        placeholder={t("task.taskName")}
        value={todo && todo.name}
        onChange={handleNameChange}
      />
      {handleClickTagsToAdd && tags && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pr: 2,
              flexWrap: "nowrap",
              border: "solid 1px",
              borderColor: "gray.light",
              mr: 1,
              height: "100%",
            }}
          >
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
            </Box>
            <Typography>{t("common.labels")}</Typography>
          </Box>
          <Box>
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
              {tagsToAdd ? (
                setTagsToAdd &&
                tagsToAdd.map((tag, key) => {
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
                        "& svg": {
                          fill: theme.palette.secondary.lighty,
                          "&:hover": {
                            fill: theme.palette.secondary.lighter,
                          },
                        },
                        // , "&:hover": {
                        //   backgroundColor: 'secondary.light', color: 'secondary.darker'
                        // }
                        //
                      }}
                      label={`${tag.name}`}
                      onDelete={() =>
                        tagsToAdd
                          ? setTagsToAdd(
                              tagsToAdd?.filter((_tag) => _tag.id !== tag.id)
                            )
                          : setTagsToAdd([tag])
                      }
                    />
                  );
                })
              ) : (
                <Typography sx={{ px: 1 }}>{t("label.noLabel")}</Typography>
              )}
              <Divider sx={{ my: 1, width: "auto" }} />
              {tagsFound &&
                tagsFound
                  ?.filter((tag) =>
                    tagsToAdd ? !tagsToAdd.includes(tag) : tagsFound
                  )
                  .map((tag, key) => {
                    // tagsToAdd?.filter((tagToAdd) => tagToAdd.id !== tag.id)

                    return (
                      <Chip
                        variant="outlined"
                        key={key}
                        sx={{
                          m: 0.3,
                          backgroundColor: "secondary.lighter",
                          color: "secondary.dark",
                          border: "solid 1px",
                          borderColor: "secondary.light",
                          "&:hover": {
                            backgroundColor: "secondary.light",
                            color: "secondary.darker",
                          },
                        }}
                        label={`${tag.name}`}
                        onClick={() =>
                          tagsToAdd
                            ? setTagsToAdd?.([...tagsToAdd, tag])
                            : setTagsToAdd?.([tag])
                        }
                      />
                    );
                  })}
              {/* <InputLabel id="tasklisttag">
            Ajouter un label
          </InputLabel>
          <Select
            labelId="tasklisttag"
            id="tasklisttag"
            // value={todo!.id!.toString()}
            autoWidth
            label="Age"
            name="tag_id"
            onChange={onChangeTag}
          >
          {tags!.length > 0 && tags!.map((tag, key) => (
            <MenuItem key={key} value={tag.id}>{tag.name}</MenuItem>
            ))}
          </Select> */}
            </Menu>
          </Box>
        </Box>
      )}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={frLocale}
      >
        <DatePicker
          mask={"__/__/____"}
          label={t("task.executionDate")}
          value={newTodoDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};
