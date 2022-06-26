import { Box, Typography } from "@mui/material";
import api from "api/api";
import Album from "components/Album/Album";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export const PublicAlbum = () => {
  const { t } = useTranslation();

  const { uidTravel } = useParams();

  const { data: travelData, isLoading:dataLoading } = useQuery<{ is_album_public: boolean }>(
    ["album", "travel", uidTravel],
    () => {
      return api.get({
        route: `travel/getAlbumStatus/${uidTravel}`,
        hasToken: false,
      });
    }
  );

  return (
    <>
      {!dataLoading && travelData && travelData.is_album_public ? (
        <Album
          photoRoute={`view/${uidTravel}/photo`}
          diaryRoute={`view/${uidTravel}/diary`}
          positionRoute={`view/${uidTravel}/position`}
        />
      ) : (
        <Box style={{ display: "flex", height: "92vh", alignItems: "center" }}>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              alignSelf: "center",
            }}
            variant="h4"
            color="error"
          >
            {t("album.isPrivate")}
          </Typography>
        </Box>
      )}
    </>
  );
};
