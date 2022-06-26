import { List, Box, Typography } from "@mui/material";
import { DocumentListItem } from "./DocumentListItem";
import { Document } from "../../../model/Document";

type DocumentListProps = {
  listOfDoc: Array<Document>;
  onDelete: any;
};

export const DocumentList = (props: DocumentListProps) => {
  if (props.listOfDoc && props.listOfDoc.length > 0) {
    return (
      <List sx={{ width: "60%" }}>
        {props.listOfDoc?.map((doc: Document) => {
          if (doc)
            return (
              <DocumentListItem
                key={doc.id}
                onDelete={props.onDelete}
                document={doc ? doc : {}}
              />
            );
          else return <Typography>LOADING....</Typography>;
        })}
      </List>
    );
  } else {
    return (
      <Box>
        <Typography>Vous n'avez aucun document.</Typography>
      </Box>
    );
  }
};
