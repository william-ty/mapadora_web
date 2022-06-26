import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../api/api";
import { Document } from "../../model/Document";
import { url_prefix } from "../../api/util";
import { Done, MoreVert } from "@mui/icons-material";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export const DocumentList = (props: any) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectedDocument, setSelectedDocument] = useState<Document>(
    new Document({})
  );
  const [isInNameEdition, setIsInNameEdition] = useState(false);
  const [newName, setNewName] = useState("");

  const elementId = props.elementId;

  // Access the client
  const queryClient = useQueryClient();

  const documentQuery = useQuery<Document[], Error>(
    ["documents", id_travel],
    () => api.get({ route: Document.routeName, idTravel: id_travel })
  );
  const documentList = Array.isArray(documentQuery.data) //TODO: DELETE THIS VERIFICATIONS? API MUST BE RETURNED [] WHEN NO OBJECT
    ? documentQuery.data?.filter((doc) =>
        elementId ? doc.id_element === elementId : true
      )
    : [];

  // Mutations
  const createDocument = useMutation(api.createWithFormData, {
    onSuccess: (document) => {
      resetStates(); // Reset all state from view
      queryClient.setQueryData<Document[]>(
        ["documents", id_travel],
        (documents) => (documents ? [...documents, document] : [document])
      );
    },
  });

  const removeDocument = useMutation(api.delete, {
    onSuccess: (_, params) => {
      resetStates(); // Reset all state from view
      queryClient.setQueryData<Document[] | null>(
        ["documents", id_travel],
        (documents) => {
          // console.log("documents")
          return documents ? documents?.filter((d) => d.id !== params.id) : [];
        }
      );
    },
  });
  const updateDocument = useMutation(api.update, {
    onSuccess: (_, params) => {
      resetStates(); // Reset all state from view
      queryClient.setQueryData<Document[] | null>(
        ["documents", id_travel],
        (documents) => {
          if (documents) {
            const docIndex = documents?.findIndex(
              (doc) => doc.id === params.body?.id
            );
            if (docIndex) documents[docIndex] = params.body;
            return documents;
          } else return null;
        }
      );
    },
  });

  const editDocumentName = () => {
    handleClose();
    setIsInNameEdition(true);
  };

  const updateDocumentName = (document: Document) => {
    // Update document
    let updatedDocument = document;
    updatedDocument.name = newName;

    if (document.id)
      updateDocument.mutate({
        route: Document.routeName,
        id: document.id,
        body: updatedDocument,
        idTravel: id_travel,
      });
    else alert("ID Non renseigné");
  };

  const resetStates = () => {
    setSelectedDocument(new Document({}));
    handleClose();
    setIsInNameEdition(false);
    setNewName("");
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    document: Document
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocument(document);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    selectedDocument?.name && setNewName(selectedDocument.name);
  }, [selectedDocument]);

  return (
    <>
      <List
        sx={{
          padding: 0,
          maxWidth: "100%",
          borderRadius: "4px",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Collapse in timeout="auto" unmountOnExit>
          <List component="div" disablePadding></List>
          {documentList && documentList.length > 0 ? (
            documentList.map((doc, idx) => (
              <Box key={idx}>
                {isInNameEdition && doc.id === selectedDocument.id ? (
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      style={{ display: "flex", flexShrink: 1, flexGrow: 1 }}
                    />
                    <IconButton onClick={() => updateDocumentName(doc)}>
                      <Done />
                    </IconButton>
                  </Box>
                ) : (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary={doc.name}
                      onClick={() =>
                        window.open(url_prefix + "/" + doc?.path, "_blank")
                      }
                      style={{ overflow: "hidden" }}
                    />
                    <IconButton onClick={(e) => doc?.id && handleClick(e, doc)}>
                      <MoreVert />
                    </IconButton>
                  </ListItemButton>
                )}
              </Box>
            ))
          ) : (
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary="Aucun document à afficher" />
            </ListItem>
          )}
          <input
            id="document-input"
            type="file"
            hidden
            onChange={(event) => {
              event.preventDefault();
              const files = event?.target?.files;
              const fileToUpload = files && files[0] ? files[0] : null;

              if (fileToUpload) {
                // Update the formData object
                const formData = new FormData();
                formData.append("document", fileToUpload);
                formData.append("id_element", elementId);
                // console.log(formData);
                createDocument.mutate({
                  route: Document.routeName,
                  formData: formData,
                  hasToken: true,
                  idTravel: id_travel,
                });
              }
            }}
          />
          <label htmlFor="document-input">
            <Box
              sx={{
                backgroundColor: "gray.light",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <ListItemButton
                sx={{
                  textTransform: "uppercase",
                  color: "grey",
                  textAlign: "center",
                }}
              >
                <ListItemText>
                  {t("common.document.importDocument")}
                </ListItemText>
              </ListItemButton>
            </Box>
          </label>
        </Collapse>
      </List>

      {/* Dialog */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editDocumentName}>{t("common.rename")}</MenuItem>
        <MenuItem
          onClick={() => {
            const documentId = selectedDocument.id;
            if (documentId)
              removeDocument.mutate({
                route: Document.routeName,
                id: documentId,
                idTravel: id_travel,
              });
            handleClose();
          }}
        >
          {t("common.delete")}
        </MenuItem>
        <MenuItem onClick={handleClose}>{t("common.toCancel")}</MenuItem>
      </Menu>
    </>
  );
};
