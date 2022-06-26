import { Link as RouterLink } from "react-router-dom";

import { Travel } from "../../model/Travel";
// import { travelsFactory } from "./factories/travelsFactory";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { url_prefix } from "api/util";
import { CardSubHeader } from "components/TravelCards/SubHeaderCard";
import { useTranslation } from "react-i18next";

export enum EnumPublicPrivate {
  Public,
  Private,
}

type PublicTravelsProps = {
  typeOfComponent: EnumPublicPrivate;
  listOfTravels: Array<Travel>;
};

export const PrivateTravelComponent = (props: PublicTravelsProps) => {
  const { t } = useTranslation();

  if (props.listOfTravels.length > 0) {
    return (
      <>
        <Box pt={3} pb={2}>
          {props.listOfTravels?.map((travel: Travel) => (
            <Grid item key={travel.id} xs={12} sm={6} md={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                key={travel.id}
              >
                <CardMedia
                  component="img"
                  sx={{
                    pt: 2,
                  }}
                  height="220"
                  image={
                    travel.path
                      ? props.typeOfComponent === EnumPublicPrivate.Private
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
                    pb: 0,
                  }}
                >
                  <Box mb={1} display="flex" alignItems="center">
                    <ExploreIcon sx={{ marginRight: 1 }} />
                    <Typography variant="h6" component="h2">
                      {travel.name ? travel.name : t("common.travel")}
                    </Typography>
                  </Box>
                  <CardSubHeader travel={travel} />
                  {/* <TagList travel={travel} /> */}
                </CardContent>
                <CardActions>
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
                    {props.typeOfComponent === EnumPublicPrivate.Public ? (
                      <Button
                        variant="contained"
                        endIcon={<TravelExploreIcon />}
                      >
                        <Typography
                          sx={{
                            textDecoration: "none",
                            color: "accent.darker",
                          }}
                          component={RouterLink}
                          to={`travel/${travel.id}`}
                        >
                          {t("common.see")}
                        </Typography>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            mr: 2,
                            backgroundColor: "secondary.main",
                            "&:hover": {
                              backgroundColor: "secondary.darky",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              textDecoration: "none",
                              color: "accent.darker",
                            }}
                            component={RouterLink}
                            to={`/travel/${travel.id}`}
                          >
                            {t("common.planify")}
                          </Typography>
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "accent.main",
                            "&:hover": {
                              backgroundColor: "accent.darky",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              textDecoration: "none",
                              color: "accent.darker",
                            }}
                            component={RouterLink}
                            to={`${travel.id}`}
                          >
                            {t("common.edit")}
                          </Typography>
                        </Button>
                      </>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Box>
      </>
    );
  } else {
    return (
      <Container>
        <Typography>{t("common.nothingToDisplay")}</Typography>
      </Container>
    );
  }
};
