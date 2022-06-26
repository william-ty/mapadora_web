import { Stack } from "@mui/material";
import { Diary as DiaryModel } from "../../model/Diary";
import { Participant as ParticipantModel } from "../../model/Participant";
import { InlineAlert } from "../../utility/alert/InlineAlert";
import DiaryCard from "./DiaryCard";
import { useTranslation } from "react-i18next";

export type DiariesAlbumProps = {
  diaries: DiaryModel[] | undefined; // Must be sorted
  participants: ParticipantModel[] | undefined;
};

const DiariesAlbum = ({ diaries, participants }: DiariesAlbumProps) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      {!diaries || diaries.length === 0 ? (
        <InlineAlert message={t("album.diary.noEntries")} severity="info" />
      ) : (
        diaries?.map((diary, index) => {
          const participant = participants?.find(
            (participant) => participant.id_traveler === diary.id_traveler
          )?.name;

          return (
            <DiaryCard
              key={index}
              content={diary.content}
              date={new Date(diary.updatedAt)}
              participant={participant}
            />
          );
        })
      )}
    </Stack>
  );
};

export default DiariesAlbum;
