import { HashLink } from "react-router-hash-link";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { CardMedia, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import theme from "../theme/theme";
import {
  EnumPublicPrivate,
  TravelCards,
} from "../components/TravelCards/TravelCards";
import { TitleCard } from "../components/Home/TitleCard";
import { Footer } from "../components/Footer";
import { travelsFactory } from "../components/PublicTravels/factories/travelsFactory";
import {
  ImgTextComponent,
  Position,
} from "../components/Home/ImgTextComponent";

import { useQuery, useQueryClient } from "react-query";
import { Travel } from "model/Travel";
import { useParams } from "react-router";
import api from "api/api";
import { useTranslation } from "react-i18next";
import Video from "../img/mapadora_home.mp4";
// import gsap from "gsap";
// import { TweenLite } from "gsap";

import { useEffect, useRef, useState } from "react";

export const ViewHomePublicTravels = () => {
  const { idTravel } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    isLoading: publicTravelsIsLoading,
    isError: publicTravelsIsError,
    data: publicTravels,
  } = useQuery<Travel[], Error>(
    ["publictravels"],
    () => api.get({ route: "publictravels" }),
    { structuralSharing: false }
  );

  // useEffect(() => {
  //   gsap.to(vanRef.current!, { rotation: "+=360" });
  // });

  return (
    <>
      <CssBaseline />

      <main>
        <Box
          sx={{
            // bgcolor: "background.paper",
            width: "100%",
            backgroundColor: "secondary.lighter",
          }}
        >
          {/* <CardMedia
            component='video'
            // className={classes.media}
            sx={{ height: '100%', width: '100%', zIndex: "10" }}
            image='../img/mapadora_home.mp4'
            autoPlay
          /> */}
          <video
            autoPlay
            src={Video}
            loop
            muted
            style={{
              backgroundSize: "cover",
              position: "absolute",
              bottom: 0,
              minHeight: "100vh",
              minWidth: "100%",
              overflow: "hidden",
              zIndex: "0",
            }}
          />
          {/* <Box sx={{
            overflow: 'hidden', minHeight: '100vh', minWidth: '100%', position: 'absolute', left: '0', right: '0', backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItem: 'center'
          }}>
            <video autoPlay src={Video} loop style={{zIndex: '0', minHeight: '100vh', minWidth:'100%'}} />
          </Box> */}
          <Container
            sx={{
              minWidth: "100%",
              height: "92vh",
              pt: 4,
              pb: 4,
              borderRadius: 0,
              position: "relative",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "primary.lighter",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgb(174,189,204,0.85)",
                display: "flex",
                height: "88%",
                padding: 2,
                minWidth: "40%",
                width: "40%",
                borderRadius: "40px",
                justifyContent: "center",
                alignItems: 'center'
              }}
            >
              {/* <div style={{
                backgroundColor: theme.palette.accent.main, position: 'absolute', zIndex: -1, transform: 'rotate(45deg)', padding: 2, width: '35rem', height: '35rem', borderRadius: '40px',
              }}
              /> */}
              <TitleCard
                title=""
                subtitle={t("home.subtitle")}
                image="require('../../../img/static/logo.png)'"
              />
            </Box>
          </Container>
          <Box
            sx={{
              backgroundColor: "secondary.lighter",
            }}
          >
            <Container
              sx={{
                maxWidth: "80%",
                pt: "4rem",
                backgroundColor: "secondary.lighter",
              }}
            >
              <ImgTextComponent
                title={t("home.box1.title")}
                imagePath={t("home.box1.image")}
                text={t("home.box1.text")}
                imgPosition={Position.Left}
              />
              <ImgTextComponent
                title={t("home.box2.title")}
                imagePath={t("home.box2.image")}
                text={t("home.box2.text")}
                imgPosition={Position.Right}
              />
              <ImgTextComponent
                title={t("home.box3.title")}
                imagePath={t("home.box3.image")}
                text={t("home.box3.text")}
                imgPosition={Position.Left}
              />
              <ImgTextComponent
                title={t("home.box4.title")}
                imagePath={t("home.box4.image")}
                text={t("home.box4.text")}
                imgPosition={Position.Right}
              />
              <Box>
                <Typography>
                  Bientôt, un nouveau moyen de gérer vos dépenses !
                </Typography>
              </Box>
              <ImgTextComponent
                title={t("home.box5.title")}
                imagePath={t("home.box5.image")}
                text={t("home.box5.text")}
                imgPosition={Position.Left}
              />
            </Container>
          </Box>
          {/* </video> */}
          {/* </CardMedia> */}
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 10,
            pb: 10,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "accent.light"
          }}
        >
          <div
          // ref={setAnchorEl}
          // style={{}}
          >
            <img
              src={require("../img/static/content/home/car.png")}
              style={{ height: "30vh" }}
              alt="car"
            />
          </div>
          <HashLink to="#publicTravels">
            <KeyboardArrowDownIcon
              sx={{ fontSize: "250px", mb: 1, color: "secondary.main" }}
            />
          </HashLink>

          <Typography variant="h3" sx={{ width: "80%", textAlign: "center" }}>
            {t("home.findInspiration")}
          </Typography>
        </Box>
        <Box id="publicTravels" sx={{ py: 2 }}>
          <TravelCards
            listOfTravels={publicTravels ? publicTravels : travelsFactory}
            typeOfComponent={EnumPublicPrivate.Public}
          />
        </Box>
      </main>
      <Footer />
    </>
  );
};
