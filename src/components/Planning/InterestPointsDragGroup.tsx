import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import api from "../../api/api";
import { InterestPoint } from "../../model/InterestPoint";
import { Step } from "../../model/Step";
import { useData } from "../../provider/DataProvider";
import { DraggableInterestPointItem } from "../MapItems/DraggableInterestPointItem";
import { InterestPointItem } from "../MapItems/DraggableListItem";
import StyledMenu from "../MapItems/StyledMenu";
import { useTranslation } from "react-i18next";

export const InterestPointsDragGroup = (props: any) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const stepId = props?.stepId;

  const [interestPointsList, setInterestPointsList] = useState<InterestPoint[]>(
    []
  );

  const { map } = useData();
  const navigate = useNavigate();

  const {
    interestPoints,
    onDragEndIp,
    isEditable,
  }: {
    interestPoints: InterestPoint[];
    onDragEndIp: ({ destination, source }: DropResult) => void;
    isEditable: boolean;
  } = useOutletContext();

  const queryClient = useQueryClient();

  const deleteInterestPoint = useMutation(api.delete, {
    onSuccess: (interestPoint, { id }) => {
      queryClient.setQueryData<InterestPoint[]>(
        ["interestPoints", id_travel],
        (interestPoints) =>
          interestPoints ? interestPoints?.filter((poi) => poi.id !== id) : []
      );
    },
  });

  const onLocate = (item: Step | InterestPoint) =>
    map?.current.flyTo({
      center: item.point.coordinates,
      zoom: map?.current.getZoom(),
      pitch: map?.current.getPitch(),
      bearing: map?.current.getBearing(),
    });
  const onDelete = (item: Step | InterestPoint) =>
    item?.id &&
    deleteInterestPoint.mutate({
      route: InterestPoint.routeName,
      id: item.id,
      idTravel: id_travel,
    });
  const onEdit = (itemId: number) =>
    navigate(`/travel/${id_travel}/interestpoints/${itemId}/edit`);
  const onRead = (itemId: number) =>
    navigate(`/travel/${id_travel}/interestpoints/${itemId}`);

  const compareOrder = (a: InterestPoint, b: InterestPoint) => {
    return a?.day! - b?.day!;
  };

  useEffect(() => {
    if (interestPoints) {
      const sortedInterestPoints = interestPoints.sort(compareOrder);
      // console.log(sortedInterestPoints);
    }
  }, [interestPoints]);

  useEffect(() => {
    let interestpointListWithSteps: any = [];

    if (interestPoints) {
      interestpointListWithSteps = interestPoints?.filter(
        (poi) => !stepId || poi.id_step === stepId
      );
      // Note to self: Should map result to query associated step here...
    } else {
      interestpointListWithSteps = [];
    }
    // console.log(interestPointsList);
    setInterestPointsList(interestpointListWithSteps);
  }, [interestPoints, stepId]);

  // useEffect(() => {
  //   steps &&
  //     steps.forEach((step: Step) => {
  //       step?.id === selectedId && setSelectedStep(step);
  //     });
  // }, [selectedId, steps]);

  useEffect(() => {
    // console.log(interestPoints);
  }, [interestPoints]);

  return (
    <DragDropContext onDragEnd={onDragEndIp}>
      <Box
        sx={{
          backgroundColor: "primary.lighter",
          padding: 1,
          borderRadius: "4px",
        }}
        classes={styles.flexPaper}
      >
        <Droppable droppableId="droppable-list">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ backgroundColor: "transparent" }}
            >
              {interestPointsList && interestPointsList.length > 0 ? (
                interestPointsList.map((item, index) =>
                  stepId && isEditable ? (
                    <DraggableInterestPointItem
                      icon={"location_on_icon"}
                      item={item}
                      stepDays={props.stepDays}
                      index={index}
                      key={index}
                      isDraggingOver={snapshot.isDraggingOver}
                      styledMenu={
                        <StyledMenu
                          onLocate={() => onLocate(item)}
                          onDelete={() => onDelete(item)}
                          onEdit={() => item.id && onEdit(item.id)}
                          onRead={() => item.id && onRead(item.id)}
                        />
                      }
                    />
                  ) : (
                    <InterestPointItem
                      icon={"location_on_icon"}
                      item={item}
                      key={item.id}
                      step={item.id_step && item.id_step}
                      styledMenu={
                        <StyledMenu
                          onLocate={() => onLocate(item)}
                          onDelete={() => onDelete(item)}
                          onEdit={() => item.id && onEdit(item.id)}
                          onRead={() => item.id && onRead(item.id)}
                        />
                      }
                    />
                  )
                )
              ) : (
                <Typography sx={{ ml: 2 }}>
                  {t("map.interestPoint.noIpToDisplay")}
                </Typography>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};

const styles = {
  flexPaper: {
    flex: 1,
    margin: 16,
    minWidth: 350,
  },
};
