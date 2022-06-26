import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Document } from "../../model/Document";
import { url_prefix } from "../../api/util";
import { Box, Link } from "@mui/material";
import { useParams } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import api from "api/api";

type DocumentListItemProps = {
  document: Document;
};

export const DocumentListItem = (props: DocumentListItemProps) => {
  const docPath: string = props.document.path
    ? url_prefix + "/" + props.document.path
    : "../../img/static/logo.png";

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  //   const docToView: any = { uri: require(docPath)};
  const queryClient = useQueryClient();

  const removeDocument = useMutation(api.delete, {
    onSuccess: (_, params) => {
      queryClient.setQueryData<Document[] | null>(
        ["documents", id_travel],
        (documents) =>
          documents ? documents?.filter((d) => d.id !== params.id) : []
      );
    },
  });

  return (
    <>
      <ListItem
        sx={{
          backgroundColor: "gray.lighter",
          my: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListItemText sx={{ flex: 12 }} primary={props.document.name} />
        <Box sx={{ flex: 1, flexDirection: "row", display: "flex" }}>
          <Link
            sx={{ display: "flex", alignItems: "center", mx: 2 }}
            target="_blank"
            href={docPath}
          >
            <VisibilityIcon sx={{ color: "gray.main" }} />
          </Link>
          <DeleteIcon
            sx={{ color: "gray.main", cursor: "pointer" }}
            onClick={() =>
              props.document.id &&
              removeDocument.mutate({
                route: Document.routeName,
                id: props.document.id,
                idTravel: id_travel,
              })
            }
          />
        </Box>
      </ListItem>
    </>
  );
};
