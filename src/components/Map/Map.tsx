import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import theme from "./../../theme/theme";
import { Button, Box, Grid, Tooltip } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { useData } from "../../provider/DataProvider";
import mapboxgl, { LngLatBounds, Marker } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useMutation, useQueryClient } from "react-query";
import { Step } from "../../model/Step";
import api from "../../api/api";
import { mapboxToken } from "../../mapboxToken";
import { InterestPoint } from "../../model/InterestPoint";
import { saveStep } from "../../utility/map/step/saveStep";
import { saveInterestPoint } from "../../utility/map/interestPoint/saveInterestPoint";
import { handleStepPopup } from "../../utility/map/step/handleStepPopup";
import { handleInterestPointPopup } from "../../utility/map/interestPoint/handleInterestPointPopup";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Map = ({ isEditable }: { isEditable: boolean }) => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const [mapLoaded, isMapLoaded] = useState(false);

  // Refs
  const onMoveRef = useRef<any>();

  const {
    map,
    popUpRef,
    isSelectedInterestPoints,
    isSelectedSteps,
    setAreTripsUpToDate,
    setIsSelectedSteps,
    setIsSelectedInterestPoints,
    setSelectedId,
  } = useData();
  const navigate = useNavigate();

  // Mapboxgl API token
  mapboxgl.accessToken = mapboxToken;
  // Access the client
  const queryClient = useQueryClient();

  //Queries
  const steps = queryClient.getQueryData<Step[]>(["steps", id_travel]);
  const interestPoints = queryClient.getQueryData<InterestPoint[]>([
    "interestPoints",
    id_travel,
  ]);

  // Mutations;
  const addStep = useMutation(api.create, {
    onSuccess: (step) => {
      queryClient.setQueryData<Step[]>(["steps", id_travel], (steps) =>
        steps ? [...steps, step] : []
      );
    },
  });
  const addInterestPoint = useMutation(api.create, {
    onSuccess: (poi) => {
      queryClient.setQueryData<Step[]>(
        ["interestPoints", id_travel],
        (interestpoints) => (interestpoints ? [...interestpoints, poi] : [])
      );
    },
  });
  const updateStep = useMutation(api.update, {
    onSuccess: (step, { id }) => {
      queryClient.setQueryData<Step[]>(["steps", id_travel], (steps) =>
        steps!.map((s) => (s.id === id ? step : s))
      );
    },
  });
  const updateInterestPoint = useMutation(api.update, {
    onSuccess: (interestPoint, { id }) => {
      queryClient.setQueryData<InterestPoint[]>(
        ["interestPoints", id_travel],
        (interestPoints) =>
          interestPoints!.map((ip) => (ip.id === id ? interestPoint : ip))
      );
    },
  });
  const deleteStep = useMutation(api.delete, {
    onSuccess: (step, { id }) => {
      queryClient.setQueryData<Step[]>(["steps", id_travel], (steps) =>
        steps!?.filter((s) => s.id !== id)
      );
    },
  });
  const deleteInterestPoint = useMutation(api.delete, {
    onSuccess: (interestPoint, { id }) => {
      queryClient.setQueryData<InterestPoint[]>(
        ["interestPoints", id_travel],
        (interestPoints) => interestPoints!?.filter((ip) => ip.id !== id)
      );
    },
  });

  const displayTrips = () => {
    let trips: any[] = [];
    Array.isArray(steps) &&
      steps?.forEach((step, idx) => {
        if (idx < steps?.length - 1) {
          trips.push({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [step.point.coordinates[0], step.point.coordinates[1]],
                [
                  steps[idx + 1].point.coordinates[0],
                  steps[idx + 1].point.coordinates[1],
                ],
              ],
            },
            properties: {
              title: ``,
            },
          });
        }
      });
    return trips;
  };

  // On map load
  useEffect(() => {
    // console.log("map");
    // console.log(map);

    map.current = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [7.751154323216781, 48.58156854870154],
      zoom: 11,
      pitch: 15,
    });

    map.current
      .addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          placeholder: "Rechercher une adresse sur la carte",
          marker: false,
        })
      )
      .addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

    map.current.on("load", () => {
      var geojson = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      };

      map.current.addSource("route", geojson);

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": `${theme.palette.accent.main}`,
          "line-width": 8,
        },
      });

      map.current.addLayer({
        id: "symbols",
        type: "symbol",
        source: "route",
        layout: {
          "symbol-placement": "line-center",
          "text-font": ["Open Sans Regular"],
          "text-field": "{title}",
          "text-size": 16,
          "text-rotate": -4,
          "symbol-spacing": 1,
        },
        paint: {
          "text-translate": [0, -20],
        },
      });
      setAreTripsUpToDate(false);
    });

    map.current.on("click", "route", (e: any) => {
      alert(e.features[0].properties.title);
      // console.log(e);
    });
  }, [map, setAreTripsUpToDate]);

  // Draw step markers
  useEffect(() => {
    let markersSteps = Array.isArray(steps)
      ? steps?.map((step: Step) => {
          let marker = saveStep(
            map.current,
            step,
            id_travel,
            setAreTripsUpToDate,
            deleteStep.mutate,
            setSelectedId,
            isEditable
          );

          // Update point on drag event
          const onDragEnd = () => {
            const coordinates = marker.getLngLat();
            if (step.id) {
              step.point.coordinates = [coordinates.lng, coordinates.lat];
              updateStep.mutate({
                route: Step.routeName,
                id: step.id,
                body: step,
                idTravel: id_travel,
              });
            }
          };

          marker.on("dragend", onDragEnd);

          return marker;
        })
      : new Array<Marker>();

    if (!mapLoaded) {
      if (markersSteps && markersSteps.length > 0) {
        map.current.setCenter(markersSteps[0].getLngLat());
        map.current.setZoom(10);
      } else {
        map.current.setZoom(1);
      }
      isMapLoaded(true);
    }

    return () => {
      markersSteps.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, steps, updateStep, setAreTripsUpToDate, id_travel, isEditable]);

  // Draw interestpoint markers
  useEffect(() => {
    let markersInterestPoints = Array.isArray(interestPoints)
      ? interestPoints?.map((interestPoint: InterestPoint) => {
          let marker = saveInterestPoint(
            map.current,
            interestPoint,
            id_travel,
            deleteInterestPoint.mutate,
            setSelectedId,
            isEditable
          );

          // Update point on drag event
          const onDragEnd = () => {
            const coordinates = marker.getLngLat();
            if (interestPoint.id) {
              interestPoint.point.coordinates = [
                coordinates.lng,
                coordinates.lat,
              ];
              updateInterestPoint.mutate({
                route: InterestPoint.routeName,
                id: interestPoint.id,
                body: interestPoint,
                idTravel: id_travel,
              });
            }
          };

          marker.on("dragend", onDragEnd);

          return marker;
        })
      : new Array<Marker>();

    return () => {
      markersInterestPoints.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, interestPoints, updateInterestPoint, id_travel, isEditable]);

  useEffect(() => {
    const marker = new mapboxgl.Marker({
      color: isSelectedSteps
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
      draggable: true,
    });

    const onMove = (e: any) => {
      marker.setLngLat(e.lngLat).addTo(map.current);
    };

    let cursorOn = isSelectedSteps || isSelectedInterestPoints;

    // Add map events
    if (cursorOn) {
      map.current.getCanvasContainer().style.cursor = "none";
      map.current.on("mousemove", onMove);
      onMoveRef.current = onMove;
      map.current.on("contextmenu", () => {
        map.current.off("mousemove", onMove);
        marker.remove();
        setIsSelectedSteps(false);
        setIsSelectedInterestPoints(false);
      });
      map.current.on("click", () => {
        map.current.getCanvasContainer().style.cursor = "default";
        marker.remove();
      });
    } else if (onMoveRef.current) {
      map.current.getCanvasContainer().style.cursor = "grab";
      map.current.off("mousemove", onMoveRef.current);
      onMoveRef.current = {};
    }

    const _map = document.getElementById("my-map");

    _map?.addEventListener("mouseleave", () => {
      marker.remove();
    });
  }, [
    map,
    isSelectedSteps,
    isSelectedInterestPoints,
    setIsSelectedSteps,
    setIsSelectedInterestPoints,
  ]);

  // Display trips on map
  useEffect(() => {
    var geojson = {
      type: "FeatureCollection",
      features: displayTrips(),
    };

    map.current.getSource("route")?.setData(geojson);

    setAreTripsUpToDate(true);
  }, [
    map,
    steps,
    displayTrips,
    setAreTripsUpToDate,
    isSelectedSteps,
    isSelectedInterestPoints,
  ]);

  return (
    <>
      <Grid item xs={12} md={7}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {isEditable && (
            <Box
              ml={2}
              mt={2}
              sx={{
                position: "absolute",
                zIndex: "5",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                {isSelectedInterestPoints ? (
                  <Button
                    disabled
                    color={"secondary"}
                    variant="contained"
                    size="large"
                    sx={{
                      marginBottom: "1rem",
                      textAlign: "left",
                      width: "12rem",
                      justifyContent: "flex-start",
                    }}
                  >
                    <AddLocationAltIcon
                      sx={{
                        color: theme.palette.primary.darker,
                      }}
                    />
                    &nbsp;&nbsp;{t("map.addStepToMap")}
                  </Button>
                ) : (
                  <Tooltip title={t("map.addStep")} arrow>
                    <Button
                      color={"secondary"}
                      variant="contained"
                      size="large"
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
                        marginBottom: "1rem",
                        textAlign: "left",
                        width: "12rem",
                        justifyContent: "flex-start",
                      }}
                      onClick={() => {
                        setIsSelectedSteps(true);
                        setIsSelectedInterestPoints(false);
                        handleStepPopup(
                          map.current,
                          popUpRef,
                          id_travel,
                          setAreTripsUpToDate,
                          addStep.mutate
                        );
                        navigate("steps");
                      }}
                    >
                      <AddLocationAltIcon
                        sx={{
                          color: theme.palette.primary.darker,
                        }}
                      />
                      &nbsp;&nbsp;{t("map.addStepToMap")}
                    </Button>
                  </Tooltip>
                )}
              </div>
              <div>
                {isSelectedSteps ? (
                  <Button
                    disabled
                    variant="contained"
                    size="large"
                    sx={{
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                  >
                    <AddLocationAltIcon
                      sx={{ color: theme.palette.secondary.darker }}
                    />
                    &nbsp;&nbsp;{t("map.addInterestPointToMap")}
                  </Button>
                ) : (
                  <Tooltip title="Ajouter un point d'intérêt à la carte" arrow>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        opacity: steps ? "1" : "0.5",
                        backgroundColor: !isSelectedSteps
                          ? "primary.lighty"
                          : "primary.darky",
                        "&:hover": {
                          backgroundColor: isSelectedSteps
                            ? "primary.darky"
                            : "primary.main",
                          color: isSelectedSteps
                            ? "primary.lighter"
                            : "primary.lighter",
                          opacity: !steps ? "0.5" : "1",
                        },
                        color: !isSelectedSteps
                          ? "primary.dark"
                          : "primary.lighter",
                        borderColor: "primary.main",
                        textAlign: "left",
                        justifyContent: "flex-start",
                      }}
                      onClick={() => {
                        if (steps) {
                          setIsSelectedSteps(false);
                          setIsSelectedInterestPoints(true);
                          handleInterestPointPopup(
                            map.current,
                            popUpRef,
                            id_travel,
                            addInterestPoint.mutate
                          );
                        }
                        navigate("interestpoints");
                      }}
                    >
                      <AddLocationAltIcon
                        sx={{ color: theme.palette.secondary.darker }}
                      />
                      &nbsp;&nbsp;{t("map.addInterestPointToMap")}
                    </Button>
                  </Tooltip>
                )}
              </div>
              <div>
                {(isSelectedSteps || isSelectedInterestPoints) && (
                  <Button
                    color={"secondary"}
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: !isSelectedSteps
                        ? "accent.lighty"
                        : "accent.darky",
                      "&:hover": {
                        backgroundColor: isSelectedSteps
                          ? "accent.darky"
                          : "accent.main",
                        color: isSelectedSteps
                          ? "accent.lighter"
                          : "accent.lighter",
                      },
                      color: !isSelectedSteps
                        ? "accent.dark"
                        : "accent.lighter",
                      borderColor: "accent.main",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                    onClick={() => {
                      setIsSelectedSteps(false);
                      setIsSelectedInterestPoints(false);
                    }}
                  >
                    <ClearIcon sx={{ color: theme.palette.accent.darker }} />
                    &nbsp;&nbsp;{t("common.toCancel")}
                  </Button>
                )}
              </div>
            </Box>
          )}
        </Box>
        <Box
          bgcolor={theme.palette.primary.light}
          id="my-map"
          borderRadius={theme.shape.borderRadius}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid>
    </>
  );
};
