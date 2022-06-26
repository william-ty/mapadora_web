import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

// import makeStyles from '@mui/material/styles/makeStyles';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import { Box, Typography, Tooltip } from "@mui/material";
import { Step } from "../../model/Step";
import { InterestPoint } from "../../model/InterestPoint";
import { Trip } from "../../model/Trip";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const styles = {
  draggingListItem: {
    borderRadius: "4px",
    backgroundColor: "gray.lighter",
    border: 2,
    borderColor: "gray.lightest",
    padding: "0.5rem 0.3rem",
  },
  stepItem: {
    margin: "5px 0",
    borderRadius: "4px",
    border: 2,
    borderColor: "transparent",
    backgroundColor: "secondary.lightest",
    "&:hover": {
      borderColor: "gray.lighty",
    },
    "&:hover .drag-icon": {
      opacity: "1",
    },
    padding: "0.5rem 0.3rem",
  },
  interestPointItem: {
    borderRadius: "4px",
    border: 2,
    borderColor: "gray.light",
    backgroundColor: "primary.lightest",
    "&:hover": {
      borderColor: "gray.lighty",
    },
    "&:hover .drag-icon": {
      opacity: "1",
    },
    padding: "0.5rem 0.3rem",
  },
};

// const DraggableListItem = styled.div<{ isDraggingOver: boolean }>`
//   background-color: ${props => (props.isDraggingOver ? 'primary.light' : 'white')}
// `;

// Emotion example
// const Fancy = styled(ListItem)`
//   background: 'rgb(235,235,235)'
// `
// render(Fancy)

// sx={{ '&hover': { color: 'black' } }}

export type DraggableListItemProps = {
  item: InterestPoint;
  stepDays: number;
  index: number;
  icon: string;
  isDraggingOver: any;
  styledMenu: JSX.Element;
};
export type DraggableStepItemProps = {
  item: Step;
  index: number;
  icon: string;
  isDraggingOver?: any;
  styledMenu: JSX.Element;
};

export type TripStep = {
  departure: Step;
  arrival: Step;
  trip: Trip;
};

export type TripListItemProps = {
  tripInfos: TripStep;
  icon: string;
  styledMenu: JSX.Element;
};

// type InterestPointStep = {
//   interestPoint: InterestPoint;
//   step: Step;
// }

export type InterestPointItemProps = {
  item: InterestPoint;
  icon: string;
  styledMenu: JSX.Element;
  step?: number;
};

export type StepItemProps = {
  item: Step;
  icon: string;
  styledMenu: JSX.Element;
};

// const TaskList = styled.div<{ isDraggingOver: boolean }>`
//   background-color: ${props => (props.isDraggingOver ? 'primary.light' : 'white')}
// `;

export const DraggableStepItem = ({
  item,
  index,
  icon,
  styledMenu,
}: DraggableStepItemProps) => {
  const { t } = useTranslation();

  return (
    // <Accordion>
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    <>
      {item.id && (
        <Draggable draggableId={item.id.toString()} index={index}>
          {(provided, snapshot) => (
            <ListItem
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              sx={
                snapshot.isDragging ? styles.draggingListItem : styles.stepItem
              }
            >
              <Icon
                fontSize="medium"
                className="drag-icon"
                sx={{ opacity: "0" }}
              >
                drag_indicator
              </Icon>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.light" }}>
                  <Icon sx={{ color: "secondary.dark" }} fontSize="large">
                    {icon}
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{ flex: 4 }}
                primary={item.element?.name || ""}
              />
              <Box sx={{ display: "flex" }} pr={5}>
                <Typography>{item.duration}</Typography>
                <Tooltip title={t("map.durationInDay")} arrow>
                  <Icon>calendar_month_icon</Icon>
                </Tooltip>
              </Box>
              <Box>{styledMenu}</Box>
            </ListItem>
          )}
        </Draggable>
      )}
    </>
  );
};

export const StepItem = ({ item, icon, styledMenu }: StepItemProps) => {
  const { t } = useTranslation();

  return (
    <>
      {item.id && (
        <ListItem sx={{ my: 1, backgroundColor: "secondary.lightest" }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "secondary.light" }}>
              <Icon sx={{ color: "secondary.dark" }} fontSize="large">
                {icon}
              </Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText sx={{ flex: 4 }} primary={item.element?.name || ""} />
          <Box sx={{ display: "flex" }} pr={5}>
            <Typography>{item.duration}</Typography>
            <Tooltip title={t("map.durationInDay")} arrow>
              <Icon>calendar_month_icon</Icon>
            </Tooltip>
          </Box>
          <Box>{styledMenu}</Box>
        </ListItem>
      )}
    </>
  );
};

export const InterestPointItem = ({
  item,
  icon,
  styledMenu,
  step,
}: InterestPointItemProps) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const {
    steps,
  }: {
    steps: Step[];
  } = useOutletContext();

  // const {
  //   isLoading: associatedStepIsLoading,
  //   isError: associatedStepIsError,
  //   data: associatedStep,
  //   error: associatedStepError,
  // } = useQuery(
  //   ["associatedStep" + item?.id_step, idTravel],
  //   () => api.getOne({ route: Step.routeName, hasToken: true, id: item?.id_step!, idTravel: id_travel }),
  //   {
  //     // The query will not execute until the id_step exists
  //     enabled: !!item.id_step,
  //   }
  // );

  const [associatedStep, setAssociatedStep] = React.useState<Step>();

  useEffect(() => {
    const stepFound = steps?.filter((_step) => _step.id === step).shift();
    step && setAssociatedStep(stepFound);
    // console.log(associatedStep);
  }, [associatedStep, steps, step]);

  return (
    <>
      {item.id && (
        <ListItem sx={{ my: 1, backgroundColor: "primary.lightest" }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "primary.light" }}>
              <Icon sx={{ color: "primary.dark" }} fontSize="large">
                {icon}
              </Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText sx={{ flex: 4 }} primary={item.element?.name || ""} />
          {associatedStep && (
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={associatedStep.element.name}
              secondary={t("map.associatedStep")}
            />
          )}
          <Box>{styledMenu}</Box>
        </ListItem>
      )}
    </>
  );
};

export const TripItem = ({
  tripInfos,
  icon,
  styledMenu,
}: TripListItemProps) => {
  const { t } = useTranslation();
  // useEffect(() => { console.log(tripInfos) }
  //   , [tripInfos])
  return (
    <>
      {/* {item.id && ( */}
      <ListItem sx={{ my: 1, backgroundColor: "accent.lightest" }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "accent.light" }}>
            <Icon sx={{ color: "accent.dark" }} fontSize="large">
              {icon}
            </Icon>
          </Avatar>
        </ListItemAvatar>
        <Box display="flex" sx={{ flex: 4, flexDirection: "column" }}>
          <Box
            display="flex"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "1000px",
                backgroundColor: "accent.main",
              }}
            ></Box>
            <Box
              sx={{ flex: 1, height: "3px", backgroundColor: "accent.main" }}
            ></Box>
            <Box
              sx={{
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "1000px",
                backgroundColor: "accent.main",
                mr: "45%",
              }}
            ></Box>
          </Box>
          <Box display="flex" sx={{ flex: 1 }}>
            <ListItemText
              sx={{ flex: 2 }}
              primary={tripInfos?.departure?.element.name || ""}
              secondary={t("map.departure")}
            />
            <ListItemText
              sx={{ flex: 2 }}
              primary={tripInfos?.arrival?.element.name || ""}
              secondary={t("map.arrival")}
            />
          </Box>
        </Box>
        <ListItemText
          sx={{ flex: 2, textTransform: "capitalize" }}
          primary={tripInfos?.trip?.transport_mode?.name || "N/A"}
          secondary={t("map.transport")}
        />
        <Box>{styledMenu}</Box>
      </ListItem>
      {/* )} */}
    </>
  );
};
