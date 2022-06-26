import { Box, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import api from "../../api/api";
import { InterestPoint } from "../../model/InterestPoint";
import { Step } from "../../model/Step";
import { useData } from "../../provider/DataProvider";
import { DraggableStepItem, StepItem } from "../MapItems/DraggableListItem";
import StyledMenu from "../MapItems/StyledMenu";
import StepTransfertList from "./StepTransferList";
import { useTranslation } from "react-i18next";

const modaleStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90%",
  bgcolor: "secondary.light",
  border: "2px solid",
  borderRadius: "8px",
  borderColor: "secondary.darky",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 4,
};

export const StepsDragGroup = (props: any) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const stepId = props?.stepId;

  const [stepList, setStepList] = useState<Step[]>([]);
  const [selectedStep, setSelectedStep] = useState<Step>();

  const { map } = useData();
  const navigate = useNavigate();

  const {
    steps,
    onDragEnd,
    isEditable,
  }: {
    steps: Step[];
    onDragEnd: ({ destination, source }: DropResult) => void;
    isEditable: boolean;
  } = useOutletContext();
  const queryClient = useQueryClient();

  const deleteStep = useMutation(api.delete, {
    onSuccess: (step, { id }) => {
      queryClient.setQueryData<Step[]>(["steps", id_travel], (steps) =>
        steps!?.filter((s) => s.id !== id)
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
    deleteStep.mutate({
      route: Step.routeName,
      id: item.id,
      idTravel: id_travel,
    });
  const onEdit = (itemId: number) =>
    navigate(`/travel/${id_travel}/steps/${itemId}/edit`);
  const onRead = (itemId: number) =>
    navigate(`/travel/${id_travel}/steps/${itemId}`);

  const onAddPois = (item: Step) => handleOpen(item);

  useEffect(() => {
    setStepList(
      steps ? steps?.filter((step) => !stepId || step.id === stepId) : []
    );
  }, [steps, stepId]);

  // Modale
  const [open, setOpen] = useState(false);
  const handleOpen = (item: Step) => {
    setSelectedStep(item);
    // console.log(selectedStep);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          backgroundColor: "secondary.lighter",
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
              {stepList && stepList.length > 0 ? (
                stepList.map((item, index) =>
                  // <Accordion>
                  isEditable ? (
                    <DraggableStepItem
                      icon={"location_on_icon"}
                      item={item}
                      index={index}
                      key={index}
                      isDraggingOver={snapshot.isDraggingOver}
                      styledMenu={
                        <StyledMenu
                          onLocate={() => onLocate(item)}
                          onDelete={() => onDelete(item)}
                          onEdit={() => item.id && onEdit(item.id)}
                          onRead={() => item.id && onRead(item.id)}
                          color="secondary"
                          type="step"
                          onAddPois={() => item.id && onAddPois(item)}
                        />
                      }
                    />
                  ) : (
                    <StepItem
                      icon={"location_on_icon"}
                      item={item}
                      styledMenu={
                        <StyledMenu
                          onLocate={() => onLocate(item)}
                          onDelete={() => onDelete(item)}
                          onEdit={() => item.id && onEdit(item.id)}
                          onRead={() => item.id && onRead(item.id)}
                          color="secondary"
                          type="step"
                          onAddPois={() => item.id && onAddPois(item)}
                        />
                      }
                    />
                  )
                )
              ) : (
                <Typography sx={{ ml: 2 }}>
                  {t("map.step.noStepToDisplay")}
                </Typography>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* Temporary modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modaleStyle}>
            <StepTransfertList step={selectedStep} close={setOpen} />
          </Box>
        </Modal>
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
