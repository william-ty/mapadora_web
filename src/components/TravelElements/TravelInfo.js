import { Container, Typography, Button, Box, Divider } from "@mui/material";

import { tagList } from "../Tags/factories/tagListFactory";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { Travel } from "../../model/Travel";
import AlertDialog from "../../utility/alert/alertToUser";
import { url_prefix } from "../../api/util";
import { TravelComp } from "../Dashboard/TravelComp";
import { useMainData } from "provider/MainDataProvider";
import { useTranslation } from "react-i18next";

export const TravelInfo = () => {
  const { t } = useTranslation();

  const { showFeedback } = useMainData();

  const [travelInfo, setTravelInfo] = useState({});
  const [travelUpdated, setTravelUpdated] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const params = useParams();
  const idTravel = params.idTravel;
  const queryClient = useQueryClient();

  const { isLoading: isLoading, data: travelData } = useQuery(
    ["travelData", idTravel],
    () => {
      return api.get({ route: `travel/${idTravel}`, hasToken: true });
    }
  );

  // console.log("travelData");
  // console.log(travelData);
  const [dialog, setDialog] = useState(false);
  travelInfo.id = 0;
  if (params.idTravel) {
    travelInfo.id = parseInt(params.idTravel);
  }

  const navigate = useNavigate();
  const travelUrl = `${url_prefix}/travel/${travelInfo.id}`;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  // useEffect(() => {
  //   setDialog(false);
  // }, []);

  const onChange = ({ target: { name, value } }) => {
    setTravelUpdated({ ...travelUpdated, [name]: value });
  };

  const updateTravel = async (travel) => {
    api.update({
      route: Travel.routeName,
      id: idTravel,
      body: travel,
      hasToken: true,
    });
  };

  const deleteTravel = async () => {
    api.delete({
      route: Travel.routeName,
      id: idTravel,
      hasToken: true,
    });
  };

  const updateTravelMutation = useMutation(updateTravel, {
    onSuccess: (travelUp) => {
      setError(false);
      setTravelInfo(travelUp);
    },

    onError: (errorFetch) => {
      setErrorMsg(errorFetch);
      setError(true);
    },
  });

  const deleteTravelMutation = useMutation(deleteTravel, {
    onSuccess: () => {
      setError(false);
      setDialog(false);
      showFeedback(t("travel.travelDeleted"));
      navigate("/dashboard/travel");
    },

    onError: (errorFetch) => {
      setErrorMsg(errorFetch);
      setError(true);
      setDialog(false);
    },
  });
  const [customListTags, setCustomListTags] = useState([]);
  const listTags = tagList.placeTagList;

  const onSubmit = (event, travelToSave) => {
    if (event) {
      event.preventDefault();
    }
    // updateTravelMutation.mutate(travelToSave);
    updateTravel(travelToSave).then((res) => navigate("/dashboard/travel"));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        {!isLoading && travelData ? (
          <Box sx={{ flex: 1, pr: 4 }}>
            {/* <Typography variant="h5">{travelData?.name}</Typography> */}

            {dialog ? (
              <AlertDialog
                activate={true}
                dialogTitle={t("dashboard.personalForm.areYouSure")}
                dialogDescription={t(
                  "dashboard.personalForm.dataWillBeDeleted"
                )}
                onCloseYesAction={() => {
                  deleteTravelMutation.mutate();
                }}
                onCloseNoAction={() => setDialog(false)}
              />
            ) : null}

            <TravelComp travel={travelData} onSubmitAction={onSubmit} />

            {!isLoading && travelData.Travel_Traveler.id_permission === 2 ? (
              <Box>
                <Button
                  variant="contained"
                  data-cy="deleteAccountButton"
                  onClick={() => {
                    setDialog(true);
                  }}
                  color="error"
                  sx={{ mt: 1, mb: 0 }}
                >
                  {t("travel.deleteTravel")}
                </Button>
              </Box>
            ) : null}
          </Box>
        ) : (
          <Typography>{t("common.loading")}</Typography>
        )}
      </Box>
      <Divider orientation="vertical" sx={{ mx: 1 }} />
      {!isLoading && travelData.Travel_Traveler.id_permission === 2 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 2,
            mt: 2,
          }}
        >
          <Typography sx={{ flexWrap: "nowrap" }} variant="h5">
            {t("travel.publishTravel")}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              api
                .create({
                  route: "clone",
                  body: { is_public: true },
                  idTravel: travelData?.id,
                })
                .then(() => {
                  showFeedback(t("travel.travelPublished"));
                  queryClient.invalidateQueries(["travelData", idTravel]);
                });
            }}
          >
            {travelData?.id_public_travel
              ? t("travel.updatePublication")
              : t("travel.publishMyTravel")}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};
