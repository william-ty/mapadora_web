import React from "react";
import { TagList } from "./TagList";
import { AddTagForm } from "./AddTagForm";
import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TaskListTag } from "model/TaskListTag";
import api from "api/api";
import { TagHeader } from "./TagHeader";
import { useTranslation } from "react-i18next";

export const Tags: React.FC = () => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const { data: tags } = useQuery<TaskListTag[], Error>(
    ["tags", id_travel],
    () => api.get({ route: TaskListTag.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        {t("common.labels")}
      </Typography>
      <AddTagForm/>
      <TagHeader />
      <TagList
        tags={tags}
      />
    </Box>
  );
};
