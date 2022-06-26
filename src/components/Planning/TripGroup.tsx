import { Box, Typography } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useData } from "../../provider/DataProvider";
import { TripItem, TripStep } from "../MapItems/DraggableListItem";
import StyledMenu from "../MapItems/StyledMenu";
import { useTranslation } from "react-i18next";

export const TripGroup = (props: any) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();

  const { map } = useData();
  const navigate = useNavigate();

  const {
    tripSteps,
    isEditable,
  }: {
    tripSteps: TripStep[];
    isEditable: boolean;
  } = useOutletContext();

  // // const deleteTrip = useMutation(api.delete, {
  // //   onSuccess: (trip, { id }) => {
  // //     queryClient.setQueryData<Step[]>(
  // //       ["trip", id_travel],
  // //       (trip) => trip!?.filter((poi) => poi.id !== id)
  // //     );
  // //   },
  // // });

  // // const onLocate = (item: Step | Trip) =>
  // //   map?.current.flyTo({
  // //     center: item.point.coordinates,
  // //     zoom: map?.current.getZoom(),
  // //     pitch: map?.current.getPitch(),
  // //     bearing: map?.current.getBearing(),
  // //   });
  // // const onDelete = (item: Step | Trip) =>
  // //   item?.id &&
  // //   deleteTrip.mutate({
  // //     route: Trip.routeName,
  // //     id: item.id,
  // //     idTravel: id_travel,
  // //   });
  const onEdit = (itemId: number) =>
    navigate(`/travel/${idTravel}/trips/${itemId}/edit`);
  const onRead = (itemId: number) =>
    navigate(`/travel/${idTravel}/trips/${itemId}`);

  // useEffect(() => {
  //   console.log(tripSteps)
  // }, [tripSteps]);

  // steps!?.filter((step) => step.id_trip)

  return (
    <Box
      sx={{
        backgroundColor: "accent.lighter",
        padding: 1,
        borderRadius: "4px",
      }}
      classes={styles.flexPaper}
    >
      {tripSteps && tripSteps.length > 1 ? (
        tripSteps.map(
          (item, index) =>
            item.departure && (
              <TripItem
                key={index}
                icon={"location_on_icon"}
                tripInfos={item}
                styledMenu={
                  <>
                    {/* {isEditable && ( */}
                    <StyledMenu
                      // onLocate={() => onLocate(item)}
                      onEdit={() => item.trip?.id && onEdit(item.trip.id)}
                      onRead={() => item.trip?.id && onRead(item.trip.id)}
                      color="accent"
                      type="trip"
                    />
                    {/* )} */}
                  </>
                }
              />
            )
        )
      ) : (
        <Typography sx={{ ml: 2 }}>{t("map.trip.noTripToDisplay")}</Typography>
      )}
    </Box>
  );
};

const styles = {
  flexPaper: {
    flex: 1,
    margin: 16,
    minWidth: 350,
  },
};
