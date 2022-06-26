import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  FormControl,
  Input,
  Paper,
} from "@mui/material";
import api from "api/api";
import { Participant } from "../../model/Participant";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SendIcon from "@mui/icons-material/Send";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SecurityIcon from "@mui/icons-material/Security";
import { useState } from "react";
import { useAuth } from "provider/AuthProvider";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Participants = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showInputField, setShowInputField] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const params = useParams();
  const idTravel = params.idTravel ? parseInt(params.idTravel) : 0;
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm();
  const {
    isLoading: participantsIsLoading,
    data: participants,
    error: participantsError,
  } = useQuery(["participants", idTravel], async () => {
    return api.get({
      route: Participant.routeName,
      hasToken: true,
      idTravel: idTravel,
    });
  });

  const { data: travelData } = useQuery(["travelData", idTravel], () => {
    return api.get({ route: `travel/${idTravel}`, hasToken: true });
  });

  const { data: admin } = useQuery(["admin", idTravel], () => {
    return api.get({ route: `admin`, hasToken: true, idTravel: idTravel });
  });

  const participantsAccepted = participants
    ? participants?.filter((part: Participant) => {
        return (
          (part.id_traveler !== null || part.email === null) &&
          part.id_traveler !== user?.id
        );
      })
    : [];

  const participantsWaiting = participants
    ? participants?.filter((part: Participant) => {
        return part.id_traveler === null && part.email !== null;
      })
    : [];

  const showInput = () => {
    setShowInputField(!showInputField);
  };
  const handleChangeName = (event: any) => {
    if (createParticipantMutation.isError) {
      createParticipantMutation.reset();
    }
    setName(event.target.value);
  };
  const handleChangeEmail = (event: any) => {
    if (createParticipantMutation.isError) {
      createParticipantMutation.reset();
    }
    setEmail(event.target.value);
  };

  const createParticipant = (participant: any) => {
    return api.create({
      route: Participant.routeName,
      body: participant,
      hasToken: true,
      idTravel: idTravel,
    });
  };

  const deleteParticipant = (participant: any) => {
    return api.delete({
      route: Participant.routeName,
      id: participant.id_participant,
      hasToken: true,
      idTravel: idTravel,
    });
  };

  const createParticipantMutation = useMutation(createParticipant, {
    onSuccess: (participant) => {
      queryClient.setQueryData(
        ["participants", idTravel],
        (participants: any) => [...participants, participant]
      );
    },
  });

  const deleteParticipantMutation = useMutation(deleteParticipant, {
    onSuccess: (participant) => {
      queryClient.setQueryData(
        ["participants", idTravel],
        (participants: any) =>
          participants?.filter(
            (part: any) => part.id_participant !== participant.id
          )
      );
    },
  });

  const sendInvitation = () => {
    const participant = {
      name: name,
      email: email ? email : null,
      hasRefused: false,
      id_traveler: undefined,
    };
    if (!errors.name && !errors.email) {
      createParticipantMutation.mutate(participant);

      if (!createParticipantMutation.isError) {
        resetFields();
      } else {
        setEmail(participant.email ? participant.email : "");
        setName(participant.name);
      }
    }
  };

  const resetFields = (): void => {
    setEmail("");
    setName("");
  };

  return (
    <>
      {travelData && travelData.Travel_Traveler.id_permission === 2 ? (
        <Box mt={2}>
          <Box my={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={showInput}
              endIcon={<GroupAddIcon />}
            >
              <Typography
                sx={{ textDecoration: "none", color: "primary.darker" }}
              >
                {t("dashboard.participants.addParticipant")}
              </Typography>
            </Button>
            {travelData && travelData.Travel_Traveler.id_permission === 2 ? (
              <Paper
                sx={{
                  display: "inline-flex",
                  px: 2,
                  backgroundColor: "warning.lighter",
                  py: 1,
                }}
              >
                <SecurityIcon sx={{ mr: 1, color: "warning.main" }} />
                <Typography variant="subtitle1" sx={{ color: "warning.darky" }}>
                  {t("dashboard.participants.youAreAdmin")}
                </Typography>
              </Paper>
            ) : admin ? (
              <Paper
                sx={{
                  display: "inline-flex",
                  px: 2,
                  backgroundColor: "gray.lighter",
                  py: 1,
                }}
              >
                <SecurityIcon sx={{ mr: 1, color: "gray.main" }} />
                <Typography>
                  {" "}
                  {t("dashboard.participants.travelAdministratedBy")}
                  {admin.firstname} {admin.lastname} | {admin.email}{" "}
                </Typography>
              </Paper>
            ) : null}
          </Box>
          {showInputField ? (
            <Box sx={{ my: "20px" }}>
              <form onSubmit={handleSubmit(sendInvitation)}>
                <TextField
                  {...register("nameInput", {
                    required: true,
                  })}
                  label={t("dashboard.participants.name")}
                  onChange={handleChangeName}
                  value={name}
                  required
                />

                {errors.name && <p>Nom requis</p>}

                <TextField
                  {...register("emailInput", {
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  })}
                  label={t("dashboard.participants.mail")}
                  onChange={handleChangeEmail}
                  value={email}
                  type="email"
                  sx={{ mx: "10px" }}
                />

                {errors.email && <p>Email non valide</p>}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ height: "56px" }}
                  // onClick={sendInvitation}
                  endIcon={<SendIcon />}
                  disabled={name.length === 0}
                >
                  {t("dashboard.participants.sendInvitation")}
                  {createParticipantMutation.isLoading ? (
                    <CircularProgress />
                  ) : null}
                </Button>
              </form>
            </Box>
          ) : null}
        </Box>
      ) : null}
      {createParticipantMutation.isError ? (
        <Typography color="error">
          {t("dashboard.participants.participantAlreadyAssociated")}
        </Typography>
      ) : null}
      {!participantsIsLoading && !participantsError ? (
        <Box mt={3}>
          <Box>
            <Typography variant="h5" sx={{ my: 1 }}>
              {t("dashboard.participants.participantsAssociated")}
            </Typography>
            {/* {travelData && travelData.Travel_Traveler.id_permission === 2 ? (
              <Typography> Vous êtes administrateur du voyage </Typography>
            ) : admin ? (
              <Typography>
                {" "}
                Voyage administré par {admin.firstname} {admin.lastname} |{" "}
                {admin.email}{" "}
              </Typography>
            ) : null} */}
            {participantsAccepted && participantsAccepted.length > 0 ? (
              <List>
                {participantsAccepted.map((part: Participant) => {
                  return (
                    <ListItem
                      sx={{
                        width: "50%",
                        backgroundColor: "secondary.lighter",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography>
                            {" "}
                            {part.name}
                            {part.email && ` | ${part.email}`}{" "}
                          </Typography>
                        }
                      />

                      {travelData &&
                      travelData.Travel_Traveler.id_permission === 2 ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteParticipantMutation.mutate(part)}
                        >
                          <GroupRemoveIcon />
                        </IconButton>
                      ) : null}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography>
                {t("dashboard.participants.noParticipants")}
              </Typography>
            )}
            <Typography variant="h5" sx={{ my: 1 }}>
              {t("dashboard.participants.pendingInvitations")}
            </Typography>
            {participantsWaiting && participantsWaiting.length > 0 ? (
              <List>
                {participantsWaiting.map((part: Participant) => {
                  return (
                    <ListItem
                      sx={{
                        width: "50%",
                        backgroundColor: "secondary.lighter",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography>
                            {" "}
                            {part.name} | {part.email}{" "}
                          </Typography>
                        }
                      />

                      {travelData &&
                      travelData.Travel_Traveler.id_permission === 2 ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteParticipantMutation.mutate(part)}
                        >
                          <GroupRemoveIcon />
                        </IconButton>
                      ) : null}
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography>
                {t("dashboard.participants.noPendingInvitations")}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <>"{t("dashboard.participants.loading")}"</>
      )}{" "}
    </>
  );
};

export default Participants;
