import * as React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

export const TagHeader = () => {
  return (
    <>
      <Box display="flex" sx={{ mt: 2 }}>
        <ListItem sx={{ backgroundColor: "primary.main" }}>
          <ListItemButton>
            <ListItemText
              sx={{ flex: 5, color: "primary.lightest" }}
              primary={"Label name"}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </>
  );
};
