import { Button, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { Document } from "../../model/Document";
import DocViewer from "react-doc-viewer";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import Stack from "@mui/material/Stack";

import { DocumentList } from "./DocumentList";

export const DocumentImport = () => {
  // Access the client
  const queryClient = useQueryClient();
  const params = useParams();
  const idTravel = params.idTravel;

  const getDocuments = () => {
    api.get({ route: Document.routeName, hasToken: true, idTravel: idTravel });
  };

  const createDocument = async (formData) => {
    return api.createWithFormData({
      route: Document.routeName,
      formData: formData,
      idTravel: idTravel,
    });
  };

  const deleteDocument = async (idDocument) => {
    return api.delete({
      route: Document.routeName,
      id: idDocument,
      idTravel: idTravel,
      hasToken: true,
    });
  };

  const {
    isLoading: documentsIsLoading,
    isError: documentsIsError,
    data: documents,
    error: documentsError,
  } = useQuery(["documents", idTravel], () =>
    api.get({ route: Document.routeName, hasToken: true, idTravel: idTravel })
  );

  const createDocumentMutation = useMutation(createDocument, {
    onSuccess: (document) => {
      queryClient.setQueryData(["documents", idTravel], (documents) => [
        ...documents,
        document,
      ]);
    },
  });

  const removeDocumentMutation = useMutation(deleteDocument, {
    onSuccess: (message, params) => {
      queryClient.setQueryData(["documents", idTravel], (params) => {
        return documents?.filter((d) => d.id !== params.id);
      });
    },
  });

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
    return <span>Loading...</span>;
  }

  if (documentsIsError) {
    return <span>Error: {documentsError.message}</span>;
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" spacing={2}>
        <input type="file" name="file" onChange={changeHandler} />

        {isSelected ? (
          <>
            <TextField
              id="outlined-disabled"
              value={customName}
              onChange={handleChangeName}
            />
            <Button
              variant="contained"
              component="span"
              onClick={handleSubmission}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <TextField disabled />
            <Button
              variant="contained"
              component="span"
              onClick={handleSubmission}
              disabled
            >
              Envoyer
            </Button>
          </>
        )}
      </Stack>
      {documentsIsLoading ? (
        <Box>
          <Typography>LOADING...</Typography>
        </Box>
      ) : (
        <Box>
          <DocumentList
            listOfDoc={documents}
            onDelete={removeDocumentMutation}
          />
        </Box>
      )}
    </Container>
  );
};
