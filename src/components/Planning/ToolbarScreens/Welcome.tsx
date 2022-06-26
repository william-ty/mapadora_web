import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Step } from "../../../model/Step";
import { StepsDragGroup } from "../StepsDragGroup";
import { useTranslation } from "react-i18next";
import ExploreIcon from "@mui/icons-material/Explore";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { CardSubHeader } from "components/TravelCards/SubHeaderCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "api/api";
import { url_prefix } from "api/util";
import { Travel } from "model/Travel";
import { InterestPointsDragGroup } from "../InterestPointsDragGroup";
import { TripGroup } from "../TripGroup";
import { DocumentList } from "components/TravelElements/DocumentList";
import { Document } from "model/Document";
import { Task } from "model/Task";
import { TodoHeader } from "components/TravelElements/Todos/TodoHeader";
import { TodoList } from "components/TravelElements/Todos/TodoList";
import { Todos } from "components/TravelElements/Todos/Todos";
import { TaskListTag } from "model/TaskListTag";

export const Welcome = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const params = useParams();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  const {
    steps,
    isEditable,
  }: {
    steps: Step[];
    isEditable: boolean;
  } = useOutletContext();

  const navigate = useNavigate();

  const {
    isLoading: travelIsLoading,
    isError: travelIsError,
    data: travel,
    error: travelError,
  } = useQuery(["selectedTravel", id_travel], () =>
    api.getTravelById({
      hasToken: true,
      id: id_travel,
    })
  );

  const {
    isLoading: documentsIsLoading,
    isError: documentsIsError,
    data: documents,
    error: documentsError,
  } = useQuery(["documents", id_travel], () =>
    api.get({ route: Document.routeName, hasToken: true, idTravel: id_travel })
  );

  const { data: todos } = useQuery<Task[], Error>(
    ["todos", id_travel],
    () => api.get({ route: Task.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );

  const { data: tags } = useQuery<TaskListTag[], Error>(
    ["tags", id_travel],
    () => api.get({ route: TaskListTag.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );

  return (
    <>
      {
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={1}
          // pt={10}
        >
          {/* <Typography
            variant="subtitle2"
            component="h4"
            sx={{ textAlign: "center", textJustify: "justify" }}
          >
            Veuillez placer une étape pour commencer 😎
          </Typography> */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              color: "primary",
              textAlign: "center",
              textJustify: "justify",
            }}
          >
            Récapitulatif du voyage
          </Typography>
          {travel && (
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "accent.light",
              }}
              key={travel.id}
            >
              <CardMedia
                component="img"
                sx={
                  {
                    // 16:9
                    // pt: 2,
                  }
                }
                height="100"
                image={
                  travel.path
                    ? `${url_prefix}/${travel.path}`
                    : "../../../img/static/publicTravels/montBlanc.jpg"
                }
                alt="random"
              />
              <CardContent
                sx={{
                  flexGrow: 3,
                  display: "flex",
                  flexDirection: "column",
                  pt: 1,
                  px: 2,
                  paddinBottom: 0,
                  backgroundColor: "accent.lightest",
                }}
              >
                <Box mb={1} display="flex" alignItems="center">
                  <ExploreIcon sx={{ marginRight: 1 }} />
                  <Typography variant="h6" component="h2">
                    {travel.name ? travel.name : "Voyage"}
                  </Typography>
                  {/* {props.typeOfComponent === EnumPublicPrivate.Private && travel.Travel_Traveler && travel.Travel_Traveler.id_permission === 2 ? <AdminPanelSettingsIcon sx={{ ml: "5px" }} /> : null} */}
                </Box>
                <CardSubHeader travel={travel} />
                {/* <TagList travel={travel} /> */}
              </CardContent>
            </Card>
          )}
          <>
            <Box
              sx={{
                backgroundColor: "secondary.lightest",
                padding: 1,
                mb: 1,
                borderRadius: "4px",
              }}
            >
              <Typography
                textTransform="uppercase"
                color="secondary.darker"
                // ml={1}
                my={1}
                fontWeight="medium"
                variant="h6"
              >
                {/* {t("map.step.listOfSteps")} */}
                étapes
              </Typography>
              <StepsDragGroup />
            </Box>
          </>
          <>
            <Box
              sx={{
                backgroundColor: "primary.lightest",
                padding: 1,
                mb: 1,
                borderRadius: "4px",
              }}
            >
              <Typography
                textTransform="uppercase"
                color="primary.darker"
                // ml={1}
                my={1}
                fontWeight="medium"
                variant="h6"
              >
                {/* {t("map.interestPoint.listOfInterestPoints")} */}
                Points d'intérêt
              </Typography>
              <InterestPointsDragGroup />
            </Box>
          </>
          <>
            <Box
              sx={{
                backgroundColor: "accent.lightest",
                padding: 1,
                mb: 1,
                borderRadius: "4px",
              }}
            >
              <Typography
                textTransform="uppercase"
                color="accent.darker"
                // ml={1}
                my={1}
                fontWeight="medium"
                variant="h6"
              >
                {/* {t("map.trip.listOfTrips")} */}
                Trajets
              </Typography>
              <TripGroup />
            </Box>
          </>
          {isEditable && (
            <>
              <Box
                sx={{
                  backgroundColor: "gray.lightest",
                  px: 1,
                  borderRadius: "4px",
                }}
              >
                <Typography
                  textTransform="uppercase"
                  color="accent.darker"
                  // ml={1}
                  my={1}
                  fontWeight="medium"
                  variant="h6"
                >
                  Documents
                </Typography>
                <DocumentList listOfDoc={documents} />
              </Box>
              <Box
                sx={{
                  backgroundColor: "gray.lightest",
                  px: 1,
                  borderRadius: "4px",
                }}
              >
                <Typography
                  textTransform="uppercase"
                  color="accent.darker"
                  // ml={1}
                  my={1}
                  fontWeight="medium"
                  variant="h6"
                >
                  Tâches
                </Typography>
                {/* <TodoHeader /> */}
                <TodoList
                  todos={todos}
                  // toggleComplete={toggleComplete}
                  // handleDelete={handleDelete}
                  // handleUpdate={handleUpdate}
                  // onChangeTag={onChangeTag}
                  // handleClickTagToAdd={handleClickTagToAdd}
                  tags={tags!}
                  // handleDeleteTagFromTask={handleDeleteTagFromTask}
                />
                {/* <Todos /> */}
              </Box>
            </>
          )}
        </Stack>
        // 1 + 1 === 2?
        //   <Stack
        //     direction="column"
        //     divider={<Divider orientation="horizontal" flexItem />}
        //     // spacing={4}
        //     // pt={10}
        //     display="flex"
        //     justifyContent="space-evenly"
        //     alignItems="center"
        //     height="100%"
        //   >
        //     <Button
        //       color={"secondary"}
        //       variant="contained"
        //       size="small"
        //       sx={{
        //         backgroundColor: "secondary.darky",
        //         "&:hover": {
        //           backgroundColor: "secondary.main",
        //           color: "secondary.lighter",
        //         },
        //         color: "secondary.lighter",
        //         borderColor: "secondary.main",
        //         width: "100%",
        //         height: "30%",
        //         mb: 1
        //       }}
        //       onClick={() => {
        //         navigate("steps");
        //       }}
        //     >
        //       <Icon fontSize="large">location_on</Icon>
        //       <Typography ml={1}>étapes</Typography>
        //     </Button>
        //     <Button
        //       color={"primary"}
        //       variant="contained"
        //       size="small"
        //       sx={{
        //         backgroundColor: "primary.darky",
        //         "&:hover": {
        //           backgroundColor: "primary.main",
        //           color: "primary.lighter",
        //         },
        //         color: "primary.lighter",
        //         borderColor: "primary.main",
        //         width: "100%",
        //         height: "30%",
        //         my: 1
        //       }}
        //       onClick={() => {
        //         navigate("interestpoints");
        //       }}
        //     >
        //       <Icon fontSize="large">location_on</Icon>
        //       <Typography ml={1}>points d'intérêt</Typography>
        //     </Button>
        //     <Button
        //       variant="contained"
        //       size="small"
        //       sx={{
        //         backgroundColor: "gray.darky",
        //         "&:hover": {
        //           backgroundColor: "gray.main",
        //           color: "gray.lighter",
        //         },
        //         color: "gray.lighter",
        //         borderColor: "gray.main",
        //         width: "100%",
        //         height: "30%",
        //         mt: 1
        //       }}
        //       onClick={() => {
        //         navigate("trips");
        //       }}
        //     >
        //       <Icon fontSize="large">moving</Icon>
        //       <Typography ml={1}>trajets</Typography>
        //     </Button>
        //   </Stack>
        //   :
        //   <Stack
        //     direction="column"
        //     divider={<Divider orientation="horizontal" flexItem />}
        //     spacing={4}
        //     pt={10}
        //   >
        //     <Typography
        //       variant="h5"
        //       component="h2"
        //       sx={{ color: "primary", textAlign: "center", textJustify: "justify" }}
        //     >
        //       Bienvenue sur l'outil de plannification de voyage ! <br />
        //       🚗🚅🛸🚀🚲
        //       <br />
        //     </Typography>
        //     <Typography
        //       variant="subtitle2"
        //       component="h4"
        //       sx={{ textAlign: "center", textJustify: "justify" }}
        //     >
        //       Veuillez placer une étape pour commencer 😎
        //     </Typography>
        //   </Stack>
      }
    </>
  );
};
