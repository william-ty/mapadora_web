import { Container, Box, Typography, Divider } from "@mui/material";
import api from "api/api";

import { useQuery } from "react-query";
import { useAuth } from "provider/AuthProvider";
import {
  EnumPublicPrivate,
  TravelCards,
} from "components/TravelCards/TravelCards";
import { Travel } from "model/Travel";
import { useTranslation } from "react-i18next";

export const Notifications = () => {
  const { t } = useTranslation();
  const listOfInvitationsTravel = [] as Travel[];

  const { user } = useAuth();

  const {
    isLoading: invitationsIsLoading,
    isError: invitationsIsError,
    data: invitations,
    error: invitationsError,
  } = useQuery("invitations", async () => {
    if (user) {
      return api.get({
        route: `traveler/invitations`,
      });
    } else {
      return [];
    }
  });
  let idParticipant = 0;
  if (invitations && invitations !== null && invitations !== undefined) {
    invitations.map((invitations: Invitations) => {
      listOfInvitationsTravel.push(invitations.participant_travel);
    });
    idParticipant = invitations.length > 0 ? invitations[0].id_participant : 0;
  }

  return (
    <Box>
      <Box>
        <Typography variant="h5">
          {t("dashboard.notifications.pendingInvitations")}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {!invitationsIsLoading &&
          invitations &&
          listOfInvitationsTravel.length > 0 ? (
          <Box mt={1}>
            <TravelCards
              listOfTravels={listOfInvitationsTravel}
              typeOfComponent={EnumPublicPrivate.DealWithInvitations}
              idParticipant={idParticipant}
            />
          </Box>
        ) : (
          <Typography mt={2}>
            {t("dashboard.notifications.noPendingInvitations")}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

type Invitations = {
  id_travel: number;
  id_participant: number;
  participant_travel: Travel;
};
