import { Button, Typography, Grid, Box } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Travel } from "../../model/Travel";
import { useAuth } from "provider/AuthProvider";
import api from "api/api";
import { useNotificationQuery } from "components/Dashboard/NotificationHook";
import { useTranslation } from "react-i18next";

type ButtonProps = {
  travel: Travel;
  idParticipant: number;
};

export const InvitationsButtons = (props: ButtonProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { refetch: refetchInvitation } = useNotificationQuery("invitations");

  const postResponse = async (hasRefused: boolean) => {
    if (user) {
      api
        .create({
          route: `traveler/invitations`,
          hasToken: true,
          body: {
            idTravel: props.travel.id,
            hasRefused: hasRefused,
            idParticipant: props.idParticipant,
          },
        })
        .then(() => {
          refetchInvitation();
        });
    }
  };

  const acceptInvitation = () => {
    postResponse(false).then((res: any) => {
      navigate("/dashboard/travel");
    });
  };

  const refuseInvitation = () => {
    postResponse(true).then((res: any) => {
      navigate("/dashboard/travel");
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Button
          variant="contained"
          color="success"
          onClick={acceptInvitation}
          endIcon={<CheckCircleOutlineIcon />}
          sx={{
            textDecoration: "none",
            color: "gray.darkest",
            backgrounColor: "green",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          <Typography>{t("common.accept")}</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="error"
          onClick={refuseInvitation}
          endIcon={<HighlightOffIcon />}
          sx={{
            textDecoration: "none",
            color: "warning.darker",
            "&:hover": {
              backgroundColor: "warning.darky",
            },
          }}
        >
          <Typography>{t("common.decline")}</Typography>
        </Button>
      </Grid>
      {/* </Box> */}
    </Grid>
  );
};
