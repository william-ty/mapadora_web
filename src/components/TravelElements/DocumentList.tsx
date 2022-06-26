import { List, Box, Typography } from "@mui/material";
import { DocumentListItem } from "./DocumentListItem";
import { Document } from "../../model/Document";
import { useTranslation } from "react-i18next";

type DocumentListProps = {
  listOfDoc: Array<Document>;
};

export const DocumentList = (props: DocumentListProps) => {
  const { t } = useTranslation();

  if (props.listOfDoc && props.listOfDoc.length > 0) {
    return (
      <List sx={{ width: "100%", my: 2 }}>
        {props.listOfDoc?.map((doc: Document) => {
          if (doc)
            return <DocumentListItem key={doc.id} document={doc ? doc : {}} />;
          else return <Typography>{t("common.loading")}</Typography>;
        })}
      </List>
    );
  } else {
    return (
      <Box my={2}>
        <Typography>{t("common.document.noDocuments")}</Typography>
      </Box>
    );
  }
};
