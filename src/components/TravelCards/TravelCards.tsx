import { Travel } from "../../model/Travel";
import { CardSubHeader } from "./SubHeaderCard";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ExploreIcon from "@mui/icons-material/Explore";
import { url_prefix } from "api/util";
import { InvitationsButtons } from "./InvitationsButtons";
import { PrivateButtons } from "./PrivateButtons";
import { PublicButtons } from "./PublicButtons";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export enum EnumPublicPrivate {
  Public,
  Private,
  DealWithInvitations,
}

type PublicTravelsProps = {
  typeOfComponent: any;
  listOfTravels: Array<Travel>;
  idParticipant?: number;
};

export const TravelCards = (props: PublicTravelsProps) => {
  const { t } = useTranslation();

  const [randomTravels, setRandomTravels] = useState<Travel[]>([]);

  useEffect(() => {
    const travels = [...props.listOfTravels];
    travels.sort((a, b) => Math.random() * 3 - 1);

    if (props.typeOfComponent === EnumPublicPrivate.Private)
      setRandomTravels(props.listOfTravels);
    else setRandomTravels(travels.slice(0, 6));
  }, [props.listOfTravels, props.typeOfComponent]);

  if (randomTravels?.length > 0) {
    return (
      <Container sx={{ py: 1 }} maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={5}>
          {randomTravels?.map((travel: Travel, key) => (
            // console.log(travel.path),
            <Grid item key={key} xs={12} sm={6} md={4}>
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
                  sx={{
                    // 16:9
                    pt: 2,
                  }}
                  height="220"
                  image={
                    travel.path
                      ? props.typeOfComponent === EnumPublicPrivate.Private ||
                        EnumPublicPrivate.DealWithInvitations
                        ? `${url_prefix}/${travel.path}`
                        : `${travel.path}`
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
                    pb: 1,
                    backgroundColor: "accent.lightest",
                  }}
                >
                  <Box mb={1} display="flex" alignItems="center">
                    <ExploreIcon sx={{ marginRight: 1 }} />
                    <Typography variant="h6" component="h2">
                      {travel.name ? travel.name : "Voyage"}
                    </Typography>
                    {props.typeOfComponent === EnumPublicPrivate.Private &&
                    travel.Travel_Traveler &&
                    travel.Travel_Traveler.id_permission === 2 ? (
                      <AdminPanelSettingsIcon sx={{ ml: "5px" }} />
                    ) : null}
                  </Box>
                  <CardSubHeader travel={travel} />
                  {/* <TagList travel={travel} /> */}
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor: "accent.light",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      p: 1,
                      // my: 2,
                      // mx: 5,
                    }}
                  >
                    {props.typeOfComponent === EnumPublicPrivate.Private ? (
                      <PrivateButtons travel={travel} />
                    ) : props.typeOfComponent ===
                        EnumPublicPrivate.DealWithInvitations &&
                      props.idParticipant ? (
                      <InvitationsButtons
                        travel={travel}
                        idParticipant={props.idParticipant}
                      />
                    ) : (
                      <PublicButtons
                        redirectTo={`${
                          travel.is_public
                            ? `travel/${travel.id}`
                            : `${travel.id}`
                        }`}
                      />
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return (
      <Box pl={3}>
        <Typography>{t("common.nothingToDisplay")}</Typography>
      </Box>
    );
  }
};
