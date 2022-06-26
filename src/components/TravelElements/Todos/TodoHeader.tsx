import * as React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { useTranslation } from "react-i18next";

export const TodoHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box display="flex" sx={{ mt: 3 }}>
        <ListItem
          sx={{ backgroundColor: "primary.main" }}
          // key={todo}
          // onClick={() => toggleComplete(todo)}
          // secondaryAction={
          //   <Checkbox
          //     edge="end"
          //     // onChange={() => toggleComplete(todo)}
          //     checked={false}
          //     // onChange={handleToggle(value)}
          //     inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-all' }}
          //   />
          // }
          disablePadding
        >
          <ListItemButton>
            {/* <ListItemAvatar>
              <Avatar
            alt={`Avatar n°${todo + 1}`}
            src={`/static/images/avatar/${todo + 1}.jpg`}
          />
            </ListItemAvatar> */}
            {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
            <ListItemText
              sx={{ flex: 3, color: "primary.lightest" }}
              primary={t("task.taskName")}
            />
            <ListItemText
              sx={{ flex: 3, color: "primary.lightest" }}
              primary={t("task.associatedLabels")}
            />
            <ListItemText
              sx={{ flex: 4, color: "primary.lightest" }}
              primary={t("task.executionDate")}
            />
          </ListItemButton>
        </ListItem>
        {/* <Button variant='contained' sx={{ mx: 1, color: "primary.lightest" }}
          onClick={alert}>
          <Icon>delete</Icon>
        </Button> */}
        {/* <Button variant='text' sx={{ px: 1, color: "transparent", backgroundColor: "transparent", "&:hover": { backgroundColor: 'transparent', cursor: 'default' } }}>
        </Button>
        <Button variant='text' sx={{ px: 1, color: "transparent", backgroundColor: "transparent", "&:hover": { backgroundColor: 'transparent', cursor: 'default' } }}>
        </Button> */}
      </Box>
    </>
  );
};
