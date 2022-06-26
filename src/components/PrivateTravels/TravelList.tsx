import { Alert, Grid, Typography } from "@mui/material";
import TravelListItem from "./TravelListItem";
import { Travel } from "./Travels";
import { useTranslation } from "react-i18next";

export type TravelListProps = {
  title: string;
  travels: Travel[];
  filter(travel: Travel): boolean;
  removeFonction(travel: Travel): void;
};

const TravelList = ({
  title,
  travels,
  filter,
  removeFonction,
}: TravelListProps) => {
  const { t } = useTranslation();

  let printTravels = () => {
    let travelsFiltered: Travel[] = travels?.filter(filter);

    if (travelsFiltered.length === 0) {
      return (
        <Alert severity="info" variant="outlined">
          {t("travel.noTravelToDisplay")}
        </Alert>
      );
    } else {
      return (
        <>
          {travelsFiltered?.map((travel) => (
            <Grid item key={travel.id}>
              <TravelListItem travel={travel} removeFonction={removeFonction} />
            </Grid>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Typography component="h2" variant="h4">
        {title}
      </Typography>

      <Grid container spacing={4}>
        {printTravels()}
      </Grid>
    </>
  );
};

export default TravelList;
