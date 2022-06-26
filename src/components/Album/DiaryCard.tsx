import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type DiaryCardProps = {
  content: string;
  date?: Date;
  participant?: string;
};

const DiaryCard = ({ content, date, participant }: DiaryCardProps) => {
  const { t } = useTranslation();

  const [diaryDate, setDiaryDate] = useState("");
  const [diaryAuthor, setDiaryAuthor] = useState("");

  useEffect(() => {
    if (participant === undefined) {
      setDiaryAuthor("");
    } else {
      setDiaryAuthor(t("album.diary.diaryAuthor") + participant);
    }

    if (date === undefined) {
      setDiaryDate("");
    } else {
      const dateString = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(date);

      if (diaryAuthor === "") {
        setDiaryDate(t("album.diary.diaryDate") + dateString);
      } else {
        setDiaryDate(t("album.diary.diaryDateWithAuthor") + dateString);
      }
    }
  }, [date, diaryAuthor, diaryDate, participant]);

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{content}</Typography>
        {diaryAuthor !== "" || diaryDate !== "" ? (
          <Typography variant="body2" color="text.secondary">
            {diaryAuthor + diaryDate}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default DiaryCard;
