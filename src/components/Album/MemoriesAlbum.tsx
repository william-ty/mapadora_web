import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Diary as DiaryModel } from "../../model/Diary";
import { Participant as ParticipantModel } from "../../model/Participant";
import { Photo as PhotoModel } from "../../model/Photo";
import { InlineAlert } from "../../utility/alert/InlineAlert";
import DiaryCard from "./DiaryCard";
import { useTranslation } from "react-i18next";

export type MemoriesAlbumProps = {
  photos: PhotoModel[] | undefined; // Must be sorted
  diaries: DiaryModel[] | undefined;
  participants: ParticipantModel[] | undefined;
};

const MemoriesAlbum = ({
  photos,
  diaries,
  participants,
}: MemoriesAlbumProps) => {
  const { t } = useTranslation();

  // Prepares data for ImageViewer
  const [dataViewer, setDataViewer] = useState<string[]>([]);

  useEffect(() => {
    const dataViewerTemp: string[] = [];

    photos?.forEach((photo) => {
      dataViewerTemp.push(photo.path);
    });

    setDataViewer(dataViewerTemp);
  }, [photos]);

  // Prepares data for memories
  const [memories, setMemories] = useState<(PhotoModel | DiaryModel)[]>([]);

  useEffect(() => {
    const memoriesTemp: any = photos?.slice();

    diaries?.forEach((diary) => {
      memoriesTemp?.push(diary);
    });

    memoriesTemp.sort(function (a: any, b: any) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      if (a.updatedAt < b.updatedAt) {
        return 1;
      }

      return 0;
    });

    setMemories(memoriesTemp);
  }, [photos, diaries]);

  // ImageViewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(
    (path) => {
      setCurrentImage(dataViewer.indexOf(path));
      setIsViewerOpen(true);
    },
    [dataViewer]
  );

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {memories.length === 0 ? (
        <InlineAlert message={t("album.memory.noEntries")} severity="info" />
      ) : (
        <>
          <Timeline>
            {memories?.map((memory, index) => {
              const isAnotherDay = (
                currentDayString: string,
                otherDayString: string
              ) => {
                const currentDay = new Date(currentDayString);
                const otherDay = new Date(otherDayString);

                return (
                  currentDay.getDay() !== otherDay.getDay() ||
                  currentDay.getMonth() !== otherDay.getMonth() ||
                  currentDay.getFullYear() !== otherDay.getFullYear()
                );
              };

              const getFullDayString = (date: string) => {
                const dateString = new Intl.DateTimeFormat("fr-FR", {
                  hour12: false,
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(date));

                return dateString[0].toUpperCase() + dateString.substring(1);
              };

              return (
                <>
                  {/* Display the day */}
                  {index === 0 ||
                  isAnotherDay(
                    memory.updatedAt,
                    memories[index - 1].updatedAt
                  ) ? (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent
                        sx={{
                          minWidth: "25%",
                          maxWidth: "25%",
                          margin: "auto 0",
                        }}
                        variant="h6"
                      >
                        {getFullDayString(memory.updatedAt)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent />
                    </TimelineItem>
                  ) : (
                    <Box key={index} />
                  )}

                  <TimelineItem>
                    {/* Display the time */}
                    <TimelineOppositeContent
                      color="text.secondary"
                      sx={{
                        minWidth: "25%",
                        maxWidth: "25%",
                        margin: "auto 0",
                      }}
                    >
                      {new Intl.DateTimeFormat("fr-FR", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(memory.updatedAt))}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>

                    {/* Display the image or diary */}
                    <TimelineContent>
                      {memory.hasOwnProperty("path") ? (
                        <img
                          // @ts-ignore
                          src={memory?.path}
                          alt=""
                          loading="lazy"
                          style={{
                            maxWidth: "100%",
                          }}
                          // @ts-ignore
                          onClick={() => openImageViewer(memory?.path)}
                        />
                      ) : (
                        <DiaryCard // @ts-ignore
                          content={memory?.content}
                          participant={
                            participants?.find((participant) => {
                              return (
                                // @ts-ignore
                                participant.id_traveler === memory?.id_traveler
                              );
                            })?.name
                          }
                        />
                      )}
                    </TimelineContent>
                  </TimelineItem>
                </>
              );
            })}
          </Timeline>

          {/* ImageViewer */}
          {isViewerOpen && (
            <ImageViewer
              src={dataViewer}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
                zIndex: 2000,
              }}
              closeOnClickOutside={true}
            />
          )}
        </>
      )}
    </>
  );
};

export default MemoriesAlbum;
