import { EnumPublicPrivate } from "../TravelCards/TravelCards";
import { TravelCards } from "../TravelCards/TravelCards";
import { Typography, Box, Button, Divider } from "@mui/material";
import { Travel } from "../../model/Travel";
import { Loading } from "../../utility/loading/isLoading";
import { useQuery } from "react-query";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { Link } from "react-router-dom";
import api from "api/api";
import { useTranslation } from "react-i18next";

export const PrivateTravels = () => {
  const { t } = useTranslation();

  const { isLoading: travelIsLoading, data: travels } = useQuery<Travel[]>(
    "travels",
    () => {
      return api.get({ route: "mytravels" });
    }
  );

  // useEffect(() => {
  //   setLoading(true);

  //   api.get({ route: "mytravels" }).then((res) => {
  //     setTravelList(res);
  //     setLoading(false);
  //   });
  // }, []);

  if (travels && travels?.length > 0) {
    return (
      <Box>
        {/* <Paper sx={{ p: 1 }}> */}
        <Typography variant="h5">
          {t("dashboard.privateTravels.myTravels")}
        </Typography>
        {/* </Paper> */}
        <Divider sx={{ my: 1 }} />
        {travelIsLoading ? (
          <Loading />
        ) : (
          <Box>
            <Box sx={{ py: 1, mb: 1, backcgroundColor: "secondary.lighty" }}>
              <Typography variant="h6" sx={{ pl: 3, mb: 1, fontWeight: "500" }}>
                {t("dashboard.privateTravels.travelsInProgress")}
              </Typography>
              <TravelCards
                listOfTravels={travels?.filter((travel) => !travel.end_date)}
                typeOfComponent={EnumPublicPrivate.Private}
              />
            </Box>
            {/* <Divider /> */}
            <Box sx={{ py: 1, backcgroundColor: "secondary.lighty" }}>
              <Typography variant="h6" sx={{ pl: 3, mb: 1, fontWeight: "500" }}>
                {t("dashboard.privateTravels.completedTravels")}
              </Typography>
              <TravelCards
                listOfTravels={travels?.filter((travel) => travel.end_date)}
                typeOfComponent={EnumPublicPrivate.Private}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  } else {
    return (
      <>
        <Typography>{t("dashboard.privateTravels.noTravels")}</Typography>
        <Button
          to={"/dashboard/newTravel"}
          component={Link}
          variant="outlined"
          sx={{ width: "50%", mt: "30px" }}
          endIcon={<ModeOfTravelIcon />}
        >
          {t("dashboard.privateTravels.createTravel")}
        </Button>
      </>
    );
  }
};
