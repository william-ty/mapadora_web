import { Button, Container, Fab, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Document } from "../../model/Document";
import * as React from "react";
import { Box } from "@mui/material";

import Stack from "@mui/material/Stack";

import { DocumentList } from "./DocumentList";
import { useTranslation } from "react-i18next";
import { AddCircleRounded } from "@mui/icons-material";

export const DocumentImport = () => {
  const { t } = useTranslation();

  // Access the client
  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel);

  // const getDocuments = () => {
  //   api.get({ route: Document.routeName, hasToken: true, idTravel: idTravel });
  // };

  const createDocument = async (formData) => {
    return api.createWithFormData({
      route: Document.routeName,
      formData: formData,
      idTravel: id_travel,
    });
  };

  const {
    isLoading: documentsIsLoading,
    isError: documentsIsError,
    data: documents,
    error: documentsError,
  } = useQuery(["documents", id_travel], () =>
    api.get({ route: Document.routeName, hasToken: true, idTravel: id_travel })
  );

  const createDocumentMutation = useMutation(createDocument, {
    onSuccess: (document) => {
      queryClient.setQueryData(["documents", id_travel], (documents) => [
        ...documents,
        document,
      ]);
    },
  });

  const deleteDocument = useMutation(api.delete, {
    onSuccess: (document, { id }) => {
      queryClient.setQueryData(["documents", id_travel], (documents) =>
        documents?.filter((d) => d.id !== id)
      );
    },
  });

  const removeDocumentMutation = async (idDocument) => {
    deleteDocument.mutate({
      route: Document.routeName,
      id: idDocument,
      idTravel: id_travel,
      hasToken: true,
    });
  };

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [customName, setCustomName] = useState("");

  const changeHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setCustomName(event.target.files[0].name);
    setIsSelected(true);
  };

  const handleChangeName = (event) => {
    setCustomName(event.target.value);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    const fileExtension = selectedFile.name.split(".").pop();
    formData.append("document", selectedFile, customName + "." + fileExtension);
    // formData.append("id_element", idTravel);
    createDocumentMutation.mutate(formData);
    setSelectedFile();
    setIsSelected(false);
    setCustomName("");
  };

  if (documentsIsLoading) {
    return <span>{t("common.loading")}</span>;
  }

  if (documentsIsError) {
    return (
      <span>
        {t("common.error")}: {documentsError.message}
      </span>
    );
  }

  return (
    <Box my={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <input type="file" name="file" onChange={changeHandler} /> */}
        <label htmlFor="file">
          <input
            style={{ display: "none" }}
            id="file"
            name="file"
            type="file"
            onChange={changeHandler}
          />

          <Button
            color="primary"
            variant="contained"
            size="large"
            component="span"
            aria-label="add"
            sx={{
              borderRadius: "4px",
              // boxShadow: 'none',
            }}
          >
            <AddCircleRounded sx={{ mr: 1 }} /> Parcourir...
          </Button>
        </label>
        {isSelected ? (
          <>
            <TextField
              id="outlined-disabled"
              value={customName}
              onChange={handleChangeName}
              size="small"
            />
            <Button
              variant="contained"
              component="span"
              size="large"
              onClick={handleSubmission}
            >
              {t("common.submit")}
            </Button>
          </>
        ) : (
          <>
            <TextField size="small" disabled />
            <Button
              variant="contained"
              component="span"
              onClick={handleSubmission}
              disabled
              size="large"
            >
              {t("common.submit")}
            </Button>
          </>
        )}
      </Stack>
      {documentsIsLoading ? (
        <Box>
          <Typography>{t("common.loading")}</Typography>
        </Box>
      ) : (
        <Box>
          <DocumentList
            listOfDoc={documents}
            onDelete={removeDocumentMutation}
          />
        </Box>
      )}
    </Box>
  );
};
