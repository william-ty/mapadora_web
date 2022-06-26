import { Stack } from "@mui/material";
import { useState } from "react";

import TravelList from "./TravelList";

export type Travel = {
  id: number;
  name: string;
  departureDate: Date | undefined;
  duration: number;
  isFinished: boolean;
  stepsNumber: number;
  tag: string; // Not implemented
  is_public: boolean; // Not implemented
  commentary: string; // Not implemented
};

const Travels = () => {
  const [travels, setTravels] = useState([
    {
      id: 1,
      name: "Tour du mont blanc 1",
      departureDate: new Date(2022, 2, 25),
      duration: 10,
      isFinished: false,
      stepsNumber: 8,
      tag: "",
      is_public: true,
      commentary: "Un voyage en cours.",
    },
    {
      id: 2,
      name: "Tour du mont blanc 2",
      departureDate: new Date(2023, 1, 1),
      duration: 10,
      isFinished: false,
      stepsNumber: 8,
      tag: "",
      is_public: true,
      commentary: "Un voyage furture.",
    },
    {
      id: 3,
      name: "Tour du mont blanc 3",
      departureDate: new Date(2021, 3, 3),
      duration: 10,
      isFinished: true,
      stepsNumber: 8,
      tag: "",
      is_public: true,
      commentary: "Un voyage terminée.",
    },
    {
      id: 4,
      name: "Tour du mont blanc 4",
      departureDate: undefined,
      duration: 10,
      isFinished: false,
      stepsNumber: 8,
      tag: "",
      is_public: true,
      commentary: "",
    },
    {
      id: 5,
      name: "Tour du mont blanc 5",
      departureDate: new Date(2022, 3, 15),
      duration: 1,
      isFinished: false,
      stepsNumber: 1,
      tag: "",
      is_public: true,
      commentary: "Un voyage en cours.",
    },
  ]);

  let removeTravel = (travel: Travel): void => {
    setTravels((oldList) => oldList?.filter((element) => element !== travel));
  };

  return (
    <Stack spacing={3}>
      <TravelList
        title="Voyages en cours"
        travels={travels}
        filter={(travel: Travel) =>
          travel.departureDate !== undefined &&
          travel.isFinished === false &&
          travel.departureDate.getTime() <= Date.now()
        }
        removeFonction={removeTravel}
      />
      <TravelList
        title="Voyages futurs"
        travels={travels}
        filter={(travel: Travel) =>
          travel.departureDate === undefined ||
          (travel.isFinished === false &&
            travel.departureDate.getTime() > Date.now())
        }
        removeFonction={removeTravel}
      />
      <TravelList
        title="Voyages passés"
        travels={travels}
        filter={(travel: Travel) => travel.isFinished === true}
        removeFonction={removeTravel}
      />
    </Stack>
  );
};

export default Travels;
