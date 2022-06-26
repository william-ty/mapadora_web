import { Travel } from "../../model/Travel";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PinDropIcon from "@mui/icons-material/PinDrop";

import RatingStars from "../PublicTravels/Rating";
import { Chip, Container, Typography } from "@mui/material";
import { Step } from "model/Step";
import api from "api/api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useAuth } from "provider/AuthProvider";

type CardSubHeaderProps = {
  travel: Travel;
};

let getSteps = async (travel: Travel) => {
  return api.get({ route: Step.routeName, idTravel: travel.id });
};

export const CardSubHeader = (props: CardSubHeaderProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [travelDuration, setTavelDuration] = useState<number>(0);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [stepList, setStepList] = useState<Step[]>([]);

  const {
    isLoading: traveltagIsLoading,
    isError: traveltagIsError,
    data: traveltag,
    error: traveltagError,
  } = useQuery(["traveltag", props.travel.id], () =>
    api.getOne({
      route: "traveltag",
      id: props.travel.id_traveltag
    }),
    {
      // The query will not execute until the id_step exists
      enabled: !!props.travel.id_traveltag,
    }
  );

  // const {
  //   isLoading: associatedStepIsLoading,
  //   isError: associatedStepIsError,
  //   data: associatedStep,
  //   error: associatedStepError,
  // } = useQuery(
  //   ["associatedStep" + item?.id_step, idTravel],
  //   () => api.getOne({ route: Step.routeName, hasToken: true, id: item?.id_step!, idTravel: id_travel }),
  //   {
  //     // The query will not execute until the id_step exists
  //     enabled: !!item.id_step,
  //   }
  // );

  // const {
  //   isLoading: travelreviewIsLoading,
  //   isError: travelreviewIsError,
  //   data: travelreview,
  //   error: travelreviewError,
  // } = useQuery(["travelreview", props.travel.id], () =>
  //   api.getOne({
  //     route: "travelreview",
  //     id: props.travel.id_traveltag
  //   })
  // );

  // const {
  //   isLoading: averagereviewIsLoading,
  //   isError: averagereviewIsError,
  //   data: averagereview,
  //   error: averagereviewError,
  // } = useQuery(["averagereview", props.travel.id], () =>
  //   api.getAverageReview({
  //     idTravel: props.travel.id
  //   })
  // );

  // useEffect(() => {
  //   console.log("averagereview")
  //   console.log(averagereview)
  // }, [averagereview])


  useEffect(() => {
    let duration = 0;

    getSteps(props.travel)
      .then((listOfSteps: Step[]) => {
        setStepList(listOfSteps);
        setStepNumber(listOfSteps && listOfSteps.length);
        return listOfSteps;
      })
      .then((listOfSteps) => {
        listOfSteps && listOfSteps.forEach((step: Step) => (duration += step.duration));
        setTavelDuration(duration);
      });
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <Box sx={{ display: "flex" }}>
          <AccessTimeIcon sx={{ marginRight: 1 }} />
          {/* {printDuration(props.travel)} */}
          {travelDuration > 0
            ? travelDuration + " " + t("common.days").toLocaleLowerCase()
            : "0 " + t("common.day").toLocaleLowerCase()}
        </Box>
        <Box sx={{ display: "flex" }}>
          <PinDropIcon sx={{ marginRight: 1 }} />
          {/* {printStepsNumber(props.travel)} */}
          {stepNumber > 0
            ? stepNumber + " " + t("common.steps").toLocaleLowerCase()
            : "0 " + t("common.step").toLocaleLowerCase()}
        </Box>
        {traveltag &&
          <Chip
            variant="outlined"
            sx={{
              m: 0.3,
              // backgroundColor: "gray.lighter",
              // color: "gray.dark",
              // border: "solid 1px",
              // borderColor: "gray.light",
              textTranform: 'capitalize',
            }}
            label={`${traveltag.name}`}
          />
        }
      </Stack>
      {/* {props.travel.is_public &&
        (
          <Stack>
            <Box sx={{ mt: "20px" }}>
              <RatingStars rating={averagereview} />
              {user && <div> test</div>}
            </Box>
          </Stack>
        )} */}
    </Box>
  );
};
