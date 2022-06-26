import React, { useEffect, useState } from "react";
import theme from "./../../theme/theme";
import {
  Container,
  Box,
  Grid,
  Paper,
  Button,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { Map } from "./../Map/Map";
import { reorder } from "../../helpers";
import { DropResult } from "react-beautiful-dnd";
import { Step } from "../../model/Step";
import { useQuery, useQueryClient } from "react-query";
import api from "../../api/api";
import { InterestPoint } from "../../model/InterestPoint";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { useData } from "../../provider/DataProvider";
import { Trip } from "../../model/Trip";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { TransportMode } from "model/TransportMode";
import { TripStep } from "components/MapItems/DraggableListItem";
import { Travel } from "model/Travel";
import { useMainData } from "provider/MainDataProvider";
import { useAuth } from "provider/AuthProvider";
import { useTranslation } from "react-i18next";

export const Planning = () => {
  const { t } = useTranslation();

  const { showFeedback } = useMainData();

  // States
  const [tripSteps, setTripSteps] = useState<TripStep[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const { isSelectedInterestPoints, isSelectedSteps } = useData();

  // Access the client
  const queryClient = useQueryClient();
  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  // Queries
  const {
    isLoading: travelIsLoading,
    isError: travelIsError,
    data: travel,
  } = useQuery<Travel, Error>(
    ["travel", id_travel],
    () =>
      api.get({
        route: `${Travel.routeName}/${id_travel}`,
      }),
    { structuralSharing: false }
  );
  const {
    isLoading: stepsIsLoading,
    isError: stepsIsError,
    data: steps,
  } = useQuery<Step[], Error>(
    ["steps", id_travel],
    () => api.get({ route: Step.routeName, idTravel: id_travel }),
    { structuralSharing: false }
  );

  const {
    isLoading: interestPointIsLoading,
    isError: interestPointIsError,
    data: interestPoints,
  } = useQuery<InterestPoint[], Error>(["interestPoints", id_travel], () =>
    api.get({ route: InterestPoint.routeName, idTravel: id_travel })
  );
  const {
    isLoading: tripIsLoading,
    isError: tripIsError,
    data: trips,
  } = useQuery<Trip[], Error>(["trips", id_travel], () =>
    api.get({ route: Trip.routeName, idTravel: id_travel })
  );
  const {
    isLoading: transportmodeIsLoading,
    isError: transportmodeIsError,
    data: transportmodes,
  } = useQuery<TransportMode, Error>(["transportmodes"], () => {
    return api.get({ route: TransportMode.routeName });
  });

  useEffect(() => {
    travel && setIsEditable(!travel.is_public);
  }, [travel]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(steps!, source.index, destination.index);
    let orderedSteps = [];
    for (let i = 0; i < newItems.length; i++) {
      let itemToOrder = newItems[i];
      itemToOrder.order = i + 1;
      orderedSteps.push(itemToOrder);
    }
    api.reorder({ route: "steps", body: orderedSteps, idTravel: id_travel });
    queryClient.setQueryData<Step[]>(["steps", id_travel], newItems);
  };

  const onDragEndIp = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(interestPoints!, source.index, destination.index);
    let orderedInterestPoints = [];
    for (let i = 0; i < newItems.length; i++) {
      // console.log(i + 1);
      let itemToOrder = newItems[i];
      // console.log(itemToOrder);
      itemToOrder.order = i + 1;
      orderedInterestPoints.push(itemToOrder);
    }
    api.reorder({
      route: "steps",
      body: orderedInterestPoints,
      idTravel: id_travel,
    });
    queryClient.setQueryData<InterestPoint[]>(
      ["interestPoints", id_travel],
      newItems
    );
  };

  const compareOrder = (a: Step, b: Step) => {
    return a.order - b.order;
  };

  useEffect(() => {
    if (steps && trips) {
      let result: any = [];
      let tripsById: any = [];
      const sortedSteps = steps.sort(compareOrder);

      trips.forEach((trip) => {
        // console.log(trips)
        if (trip.id) tripsById[trip.id.toString()] = trip;
      });

      sortedSteps.forEach((step, idx) => {
        step.id_trip &&
          result.push({
            departure: idx > 0 ? sortedSteps[idx - 1] : null,
            arrival: step,
            trip: tripsById[step.id_trip.toString()] || null,
          });
        // console.log(result);
        setTripSteps(result);
      });

      // console.log(trips)
    }
  }, [trips, steps]);

  const styles = {
    scrollbar: {
      overflow: "scroll",
      margin: 0,
      padding: 0,
      listStyle: "none",
      height: "100%",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
    },
  };

  return (
    <>
      <Box
        // maxWidth="xl"
        sx={{ height: "92vh", width: "100%", p: 2 }}
      >
        <div className="map--section">
          <Grid container spacing={theme.spacing(2)}>
            <Map isEditable={isEditable} />
            <Grid item xs={12} md={5} p={0} style={{ height: "100%" }}>
              <Box
                bgcolor={theme.palette.accent.lighty}
                borderRadius={theme.shape.borderRadius}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                p={2}
              >
                <Box
                  bgcolor={theme.palette.accent.darky}
                  borderRadius={theme.shape.borderRadius}
                  sx={{
                    // height: "10%",
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                  p={1}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "accent.lighty",
                      "&:hover": {
                        backgroundColor: "accent.main",
                        color: "accent.lighter",
                      },
                      color: "accent.dark",
                      borderColor: "accent.main",
                      textAlign: "left",
                      minHeight: 0,
                      minWidth: 0,
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      navigate(`/travel/${id_travel}`);
                    }}
                  >
                    <Icon>home</Icon>
                  </Button>
                  <Button
                    color={"secondary"}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: !isSelectedSteps
                        ? "secondary.lighty"
                        : "secondary.darky",
                      "&:hover": {
                        backgroundColor: isSelectedSteps
                          ? "secondary.darky"
                          : "secondary.main",
                        color: isSelectedSteps
                          ? "secondary.lighter"
                          : "secondary.lighter",
                      },
                      color: !isSelectedSteps
                        ? "secondary.dark"
                        : "secondary.lighter",
                      borderColor: "secondary.main",
                      textAlign: "left",
                      minHeight: 0,
                      minWidth: 0,
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      navigate("steps");
                    }}
                  >
                    <Icon>location_on</Icon>
                  </Button>
                  <Button
                    color={"primary"}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: !isSelectedInterestPoints
                        ? "primary.lighty"
                        : "primary.darky",
                      "&:hover": {
                        backgroundColor: isSelectedInterestPoints
                          ? "primary.darky"
                          : "primary.main",
                        color: isSelectedInterestPoints
                          ? "primary.lighter"
                          : "primary.lighter",
                      },
                      color: !isSelectedInterestPoints
                        ? "primary.dark"
                        : "primary.lighter",
                      borderColor: "primary.main",
                      textAlign: "left",
                      minHeight: 0,
                      minWidth: 0,
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      navigate("interestpoints");
                    }}
                  >
                    <Icon>location_on</Icon>
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "gray.darky",
                      "&:hover": {
                        backgroundColor: "gray.main",
                        color: "gray.lighter",
                      },
                      color: "gray.lighter",
                      borderColor: "gray.main",
                      textAlign: "left",
                      minHeight: 0,
                      minWidth: 0,
                      padding: "0.5rem",
                    }}
                    onClick={() => {
                      navigate("trips");
                    }}
                  >
                    <Icon>moving</Icon>
                  </Button>
                  {isEditable && (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "gray.lighter",
                        "&:hover": {
                          backgroundColor: "gray.lightest",
                          color: "gray.darky",
                        },
                        color: "gray.darky",
                        borderColor: "gray.main",
                        textAlign: "left",
                        minHeight: 0,
                        minWidth: 0,
                        padding: "0.5rem",
                      }}
                      onClick={() => {
                        navigate(`todos`);
                      }}
                    >
                      <Icon>format_list_bulleted</Icon>
                    </Button>
                  )}
                </Box>
                <Box
                  // height="100%"
                  display="flex"
                  flexDirection="column"
                  // justifyContent="space-around"
                  py={2}
                  sx={{
                    flexGrow: 1,
                    flexBasis: "auto",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none"
                  }}
                // style={styles.scrollbar}
                >
                  <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} />
                  <Outlet
                    context={{
                      steps,
                      interestPoints,
                      trips,
                      transportmodes,
                      tripSteps,
                      onDragEnd,
                      onDragEndIp,
                      isEditable,
                    }}
                  />
                </Box>
                <Box
                  width="100%"
                  sx={{
                    paddingTop: "2",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    boxShadow: "0px 4px 10px 4px",
                    color: "accent.darky",
                    clipPath: "inset(-15px 0px 0px 0px)",
                  }}
                >
                  {/* <Tooltip title="Précedent" arrow> */}
                  <Button
                    variant="text"
                    size="medium"
                    sx={{
                      backgroundColor: "accent.lighty",
                      "&:hover": {
                        backgroundColor: "accent.main",
                        color: "accent.light",
                        borderColor: "accent.light",
                        // borderWidth: 2,
                      },
                      color: "accent.dark",
                      borderColor: "accent.dark",
                      // borderWidth: 2,
                      textAlign: "left",
                      minHeight: 0,
                      minWidth: 0,
                      padding: "0.5rem",
                      mt: 1,
                    }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <KeyboardReturnIcon fontSize="large"
                    // sx={{
                    //   fontSize: '1.7rem',
                    // }} 
                    />
                  </Button>
                  {!isEditable && (
                    <Button
                      variant="text"
                      size="medium"
                      sx={{
                        backgroundColor: "accent.lighty",
                        "&:hover": {
                          backgroundColor: "accent.main",
                          color: "accent.lighter",
                        },
                        color: "accent.dark",
                        borderColor: "accent.main",
                        textAlign: "left",
                        minHeight: 0,
                        minWidth: 0,
                        padding: "0.5rem",
                      }}
                      onClick={() => {
                        user
                          ? api
                            .create({
                              route: "clone",
                              body: {},
                              idTravel: id_travel,
                            })
                            .then((travelCloned) => {
                              if (travelCloned) {
                                showFeedback(t("travel.travelCloned"));
                                navigate(
                                  `/travel/${travelCloned.idTravelCloned}`
                                );
                              } else {
                                showFeedback("Oups...");
                              }
                            })
                          : navigate("/signup");
                      }}
                    >
                      {t("map.cloneTravel")}
                    </Button>
                  )}
                  {/* </Tooltip> */}
                  {travel && (
                    <Box
                      sx={{
                        borderRadius: "4px",
                        backgroundColor: "accent.light",
                        p: 1,
                        mt: 1,
                        color: "black"
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "capitalise" }}
                      >
                        {t("map.selectedTravel")}:
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ textTransform: "capitalise" }}
                      >
                        {travel.name}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};
