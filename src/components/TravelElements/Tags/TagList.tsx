import { Box, Typography } from "@mui/material";
import { TaskListTag } from "model/TaskListTag";
import React from "react";
import { HandleDelete, HandleUpdate } from "./TagListItem";
import { TagListItem } from "./TagListItem";
import { useTranslation } from "react-i18next";

interface TagListProps {
  tags?: Array<TaskListTag>;
}

export const TagList: React.FC<TagListProps> = ({
  tags
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ my: 2 }}>
      {tags ? (
        tags?.map((tag, index) => (
          <TagListItem
            key={index}
            tag={tag}
          />
        ))
      ) : (
        <Typography variant="subtitle2">{t("label.noLabelsYet")}</Typography>
      )}
    </Box>
  );
};
