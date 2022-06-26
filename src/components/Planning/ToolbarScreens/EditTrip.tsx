import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Trip } from "../../../model/Trip";
import { TransportMode } from "../../../model/TransportMode";
import { Element } from "../../../model/Element";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../api/api";
import { useTranslation } from "react-i18next";

export type SelectedTrip = {
  id?: number;
  element?: Element;
  id_transportmode?: number;
};

export const EditTrip = () => {
  const { t } = useTranslation();

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedId = id ? parseInt(id) : null;

  const {
    trips,
    transportmodes,
  }: { trips: Trip[]; transportmodes: TransportMode[] } = useOutletContext();
  const [selectedTrip, setSelectedTrip] = useState<SelectedTrip>();
  const [tripToUpdate, setTripToUpdate] = useState<SelectedTrip>();

  // useEffect(() => {
  //   console.log(transportmodes);
  //   console.log(trips);
  // }, [transportmodes, trips]);

  useEffect(() => {
    trips.forEach((trip: Trip) => {
      trip?.id === selectedId && setSelectedTrip(trip);
      trip?.id === selectedId && setTripToUpdate(trip);
    });
  }, [selectedId, trips, selectedTrip]);

  const queryClient = useQueryClient();

  const updateTrip = useMutation(api.update, {
    onSuccess: (trip, { id }) => {
      // Solves an update bug
      queryClient.invalidateQueries(["trips", id_travel]);

      // queryClient.setQueryData<Trip[]>(["trips", id_travel], (trips) =>
      //   trips!.map((t) => (t.id === id ? trip : t))
      // );
    },
  });

  const handleCancel = () => navigate(-1);

  const handleSubmit = (event: any) => {
    updateTrip.mutate({
      route: Trip.routeName,
      id: selectedId!,
      body: tripToUpdate!,
      idTravel: id_travel,
    });
    navigate(-1);
  };

  const onChangeTransportMode = ({
    target: { name, value },
  }: SelectChangeEvent<string>) => {
    setTripToUpdate({ ...tripToUpdate, [name]: value });
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "accent.lighter",
          padding: 1,
          mb: 1,
          borderRadius: "4px",
        }}
      >
        <Typography
          textTransform="uppercase"
          color="accent.darker"
          ml={1}
          fontWeight="medium"
          variant="h6"
        >
          {t("map.trip.editTransport")} «{selectedTrip?.element?.name}»
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "accent.lighter",
          padding: 2,
          borderRadius: "4px",
        }}
        display="flex"
        flexDirection="column"
      >
        <FormControl>
          <InputLabel
            id="transportmode-label"
            sx={{
              "&.Mui-focused": {
                color: "accent.main",
              },
            }}
          >
            {t("map.trip.selectTransport")}
          </InputLabel>
          <Select
            native
            labelId="transportmode-label"
            id="transportmode"
            // value={selectedT          autoWidthransportMode!.id!.toString()}
            label={t("map.trip.transportMode")}
            name="id_transportmode"
            onChange={onChangeTransportMode}
          >
            {selectedTrip?.id_transportmode ? (
              <option value="none" selected disabled>
                {
                  transportmodes?.filter(
                    (transportmode) =>
                      selectedTrip?.id_transportmode === transportmode.id
                  )[0].name
                }
              </option>
            ) : (
              <option selected value="none" disabled>
                Choisir un mode de transport
              </option>
            )}
            {transportmodes.map((transportmode) => (
              <option value={transportmode.id}>{transportmode.name}</option>
            ))}
          </Select>
          <Box mt={2}>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "warning.darky",
                "&:hover": {
                  backgroundColor: "warning.main",
                  color: "warning.lighter",
                },
                color: "warning.lighter",
                borderColor: "warning.main",
                textAlign: "left",
                minHeight: 0,
                padding: "0.5rem",
                minWidth: "8rem",
              }}
              onClick={handleCancel}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "accent.darky",
                "&:hover": {
                  backgroundColor: "accent.main",
                  color: "accent.lighter",
                },
                color: "accent.lighter",
                borderColor: "accent.main",
                textAlign: "left",
                minHeight: 0,
                padding: "0.5rem",
                minWidth: "8rem",
                ml: 2,
              }}
              onClick={handleSubmit}
            >
              {t("common.validate")}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};
