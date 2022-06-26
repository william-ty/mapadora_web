import { useQuery } from "react-query";
import api from "../../api/api";
import { url_prefix } from "../../api/util";
import PhotosGallery from "./PhotosGallery";
import { Participant as ParticipantModel } from "../../model/Participant";
import { Photo as PhotoModel } from "../../model/Photo";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import DiariesAlbum from "./DiariesAlbum";
import { Diary, Diary as DiaryModel } from "../../model/Diary";
import React from "react";
import { TabContext, TabPanel } from "@mui/lab";
import MemoriesAlbum from "./MemoriesAlbum";
import { InlineAlert } from "../../utility/alert/InlineAlert";
import { useParams } from "react-router";
import { Position } from "model/Position";
import { MapAlbum } from "./MapAlbum";
import { useTranslation } from "react-i18next";

const Album = (props: any) => {
  const { t } = useTranslation();

  // Tabs
  const [value, setValue] = React.useState("gallery");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  // Data recovery
  const { idTravel } = useParams();
  let id_travel = idTravel ? parseInt(idTravel) : null;
  const photoRoute =
    props.photoRoute || `travel/${id_travel}/${PhotoModel.routeName}`;
  const diaryRoute =
    props.diaryRoute || `travel/${id_travel}/${Diary.routeName}`;
  const positionRoute =
    props.positionRoute || `travel/${id_travel}/${Position.routeName}`;

  const {
    isLoading: photosIsLoading,
    isError: photosIsError,
    error: photosError,
    data: photos,
  } = useQuery<PhotoModel[], Error>(["photos", id_travel], () =>
    api
      .get({ route: photoRoute })
      .then((photos) => {
        return photos.sort(function (a: PhotoModel, b: PhotoModel) {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          if (a.updatedAt < b.updatedAt) {
            return 1;
          }

          return 0;
        });
      })
      .then((photosSorted) => {
        photosSorted.forEach((photo: PhotoModel) => {
          photo.path = url_prefix + "/" + photo.path;
        });

        return photosSorted;
      })
  );

  const {
    isLoading: diariesIsLoading,
    isError: diariesIsError,
    error: diariesError,
    data: diaries,
  } = useQuery<DiaryModel[], Error>(["diaries", id_travel], () =>
    api.get({ route: diaryRoute }).then((diaries) => {
      return diaries.sort((a: DiaryModel, b: DiaryModel) => {
        if (a.updatedAt > b.updatedAt) {
          return -1;
        }
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }

        return 0;
      });
    })
  );

  const {
    isLoading: positionsIsLoading,
    isError: positionsIsError,
    error: positionsError,
    data: positions,
  } = useQuery<Position[], Error>(["positions", id_travel], () =>
    api.get({ route: positionRoute })
  );

  const { data: participants } = useQuery<ParticipantModel[], Error>(
    ["participants", id_travel],
    () =>
      api
        .get({ route: ParticipantModel.routeName, idTravel: id_travel! })
        .then((participants) => {
          return participants?.filter((participant: ParticipantModel) => {
            return participant.id_traveler !== null;
          });
        })
  );

  return (
    <Box>
      {/* <Typography component="h1" variant="h4" gutterBottom>        {t("album.title")}
</Typography> */}
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              centered
              onChange={handleChange}
              value={value}
            >
              <Tab label={t("album.gallery.title")} value="gallery" />
              <Tab label={t("album.diary.title")} value="diaries" />
              <Tab label={t("album.memory.title")} value="memories" />
              <Tab label={t("album.map.title")} value="map" />
            </Tabs>
          </Box>

          <TabPanel value="gallery">
            {photosIsLoading ? (
              <InlineAlert
                message={t("album.gallery.loading")}
                severity="info"
                isLoading
              />
            ) : photosIsError ? (
              <InlineAlert message={photosError.message} severity="error" />
            ) : (
              <PhotosGallery photos={photos} />
            )}
          </TabPanel>

          <TabPanel value="diaries">
            {diariesIsLoading ? (
              <InlineAlert
                message={t("album.diary.loading")}
                severity="info"
                isLoading
              />
            ) : diariesIsError ? (
              <InlineAlert message={diariesError.message} severity="error" />
            ) : (
              <DiariesAlbum diaries={diaries} participants={participants} />
            )}
          </TabPanel>

          <TabPanel value="memories">
            {photosIsLoading || diariesIsLoading ? (
              <InlineAlert
                message={t("album.memory.loading")}
                severity="info"
                isLoading
              />
            ) : photosIsError ? (
              <InlineAlert message={photosError.message} severity="error" />
            ) : diariesIsError ? (
              <InlineAlert message={diariesError.message} severity="error" />
            ) : (
              <MemoriesAlbum
                photos={photos}
                diaries={diaries}
                participants={participants}
              />
            )}
          </TabPanel>

          <TabPanel value="map">
            {photosIsLoading || positionsIsLoading ? (
              <InlineAlert
                message={t("album.map.loading")}
                severity="info"
                isLoading
              />
            ) : photosIsError ? (
              <InlineAlert message={photosError.message} severity="error" />
            ) : positionsError ? (
              <InlineAlert message={positionsError.message} severity="error" />
            ) : (
              <MapAlbum photos={photos} positions={positions} />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Album;
