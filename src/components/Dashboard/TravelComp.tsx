import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Chip,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Travel } from "../../model/Travel";
import api from "../../api/api";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/fr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { TaskListTag } from "./../../model/TaskListTag";
import { useParams } from "react-router-dom";

type NewTravelProps = {
  travel: Travel | undefined;
  onSubmitAction: any;
};

export const TravelComp = (props: NewTravelProps) => {
  const { t } = useTranslation();

  const [travel, setTravel] = useState<Travel>({
    name: "",
    duration: 0,
    start_date: "",
    end_date: "",
    stepsNumber: 0,
    is_public: false,
    is_album_public: false,
    path_uid: "",
    commentary: "",
    path: "",
    id_traveltag: 0,
    Travel_Traveler: {},
  });

  type TravelTag = {
    name: string;
    id: number;
  };

  const [idTag, setIdTag] = useState<number>();
  const [tagName, setTagName] = useState<string>("Tag");
  const [listTag, setListTag] = useState<Array<TravelTag>>([]);

  const [idPermission, setIdPermission] = useState<number>(1);
  const [travelName, setTravelName] = useState<string>("");
  const [travelCommentary, setTravelCommentary] = useState<string>("");

  const [travelDate, setTravelDate] = useState<Date | null>(null);

  const { idTravel } = useParams();
  const id_travel = parseInt(idTravel!);

  useEffect(() => {
    getListTags().then((list) => {
      setListTag(list);
    });
  }, []);

  useEffect(() => {
    if (props.travel) {
      setTravel(props.travel);
      setTravelName(props.travel.name);
      props.travel.start_date &&
        setTravelDate(new Date(props.travel.start_date));
      setTravelCommentary(props.travel.commentary);
      setIdTag(props.travel.id_traveltag);
      setIdPermission(props.travel.Travel_Traveler.id_permission);
    }
  }, [props.travel, listTag]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTravelName(event.target.value);
  };

  const handleChangeCommentary = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTravelCommentary(event.target.value);
  };

  const handleChangeTag = (event: SelectChangeEvent) => {
    setIdTag(parseInt(event.target.value));
    setTagName(
      listTag?.filter(
        (tag: TravelTag) => tag.id === parseInt(event.target.value)
      )[0].name
    );
  };

  const handleDateChange = (
    date: Date | null,
    keyboardInputValue?: string | undefined
  ) => {
    date && setTravelDate(date);
  };

  const getListTags = () => {
    return api.get({ route: "traveltag", hasToken: true });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const travelToSave = {
      commentary: travelCommentary,
      name: travelName,
      is_public: false,
      start_date: travelDate && travelDate.toISOString(),
      end_date: null,
      id_traveltag: idTag ? idTag : null,
    };
    props.onSubmitAction(event, travelToSave);
  };

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;

  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  return (
    <>
      {/* <Container> */}
      <Box component="form" onSubmit={onSubmit} sx={{ width: "100%", mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          required
          id="name"
          name="name"
          label={t("dashboard.travelComp.name")}
          value={travelName}
          onChange={handleChangeName}
          autoFocus
          sx={{ my: 1 }}
        />
        <TextField
          fullWidth
          margin="normal"
          required
          name="commentary"
          label={t("dashboard.travelComp.commentary")}
          value={travelCommentary}
          type="text"
          id="commentary"
          onChange={handleChangeCommentary}
          sx={{ my: 1 }}
        />
        <Box sx={{ my: 1 }}>
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={frLocale}
            >
              <DatePicker
                mask={"__/__/____"}
                label={t("dashboard.travelComp.date")}
                value={travelDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="traveltags">
            {t("dashboard.travelComp.tag")}
          </InputLabel>
          <Select
            sx={{ width: "100%", my: 1 }}
            value={idTag?.toString()}
            onChange={handleChangeTag}
            label={t("dashboard.travelComp.tag")}
            id="tagInput"
            labelId="traveltags"
            placeholder="Choisir un label"
          >
            {/* {tagName ? (
              <option value="none" selected disabled>
                {tagName}
              </option>
            ) : (
              <option selected value="none" disabled>
                Choisir une étape
              </option>
            )} */}
            {listTag &&
              listTag.map((tag: any) => {
                return (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                );
              })}
          </Select>
          {!travel.id || idPermission === 2 ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, py: 1, fontSize: "1rem" }}
            >
              {t("common.save")}
            </Button>
          ) : null}
        </FormControl>
      </Box>
    </>
  );
};
