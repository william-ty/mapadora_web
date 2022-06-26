import { Box, Button, InputAdornment, TextField } from "@mui/material";
import api from "api/api";
import Album from "components/Album/Album";
import { Travel } from "model/Travel";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { ContentCopy } from "@mui/icons-material";
import { useMainData } from "provider/MainDataProvider";
import { useTranslation } from "react-i18next";

export const TravelAlbum = () => {
  const { t } = useTranslation();

  const { showFeedback } = useMainData();
  const queryClient = useQueryClient();
  const params = useParams();
  const idTravel = params.idTravel ? parseInt(params.idTravel) : 0;

  const {
    isLoading: isLoading,
    isError: isError,
    data: travelData,
  } = useQuery(["travelData", idTravel], () => {
    if (idTravel) {
      return api.get({ route: `travel/${idTravel}`, hasToken: true });
    }
  });

  const updateTravel = useMutation(api.update, {
    onSuccess: (newTravelData, { id }) => {
      queryClient.setQueryData<Travel>(
        ["travelData", idTravel],
        (travelData) => newTravelData
      );
    },
  });

  const copyToClipboard = (newClip: string) => {
    navigator.clipboard.writeText(newClip);
    showFeedback(t("textCopied"));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        {!isLoading && travelData.is_album_public ? (
          <>
            <TextField
              id="input-with-icon-textfield"
              label={t("dashboard.travelAlbum.shareLink")}
              defaultValue={`https://mapadora.fr/view/${travelData.path_uid}/album`}
              //   defaultValue={`${window.location.protocol}://${window.location.hostname}/view/${travelData.path_uid}/album`}
              disabled
              sx={{ width: 600 }}
              onClick={() =>
                copyToClipboard(
                  `https://mapadora.fr/view/${travelData.path_uid}/album`
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContentCopy />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {travelData && travelData.Travel_Traveler.id_permission === 2 && (
              <Button
                variant="contained"
                onClick={() => {
                  updateTravel.mutate({
                    route: Travel.routeName,
                    id: travelData?.id!,
                    body: {
                      ...travelData,
                      is_album_public: false,
                    },
                  });
                }}
                color="error"
              >
                {t("dashboard.travelAlbum.stopSharing")}
              </Button>
            )}
          </>
        ) : (
          <>
            {travelData && travelData.Travel_Traveler.id_permission === 2 && (
              <Button
                variant="contained"
                onClick={() => {
                  updateTravel.mutate({
                    route: Travel.routeName,
                    id: travelData?.id!,
                    body: {
                      ...travelData,
                      is_album_public: true,
                    },
                  });
                }}
              >
                {t("dashboard.travelAlbum.share")}
              </Button>
            )}{" "}
          </>
        )}
      </Box>
      <Album />
    </>
  );
};
