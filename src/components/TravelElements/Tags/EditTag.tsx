import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import { TaskListTag } from "model/TaskListTag";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import api from "api/api";

export const EditTag = ({
  tag
}: {
  tag?: TaskListTag;
}) => {
  const [newTagName, setNewTagName] = useState<string>("");
  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTagName(e.target.value);
  };

  React.useEffect(() => {
    tag && setNewTagName(tag.name);
  }, [tag]);


  return (
    <>
      <TextField
        type="text"
        placeholder="Label name"
        value={newTagName}
        onChange={handleNameChange}
      />
    </>
  );
};
