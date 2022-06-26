import mapboxgl from "mapbox-gl";
import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
// import api, { APIObject, UpdateType } from "../api/api";
import { InterestPoint } from "../model/InterestPoint";
import { Step } from "../model/Step";
import { Item } from "../types/typings";

export interface DataContextProps {
  map: MutableRefObject<any>;
  popUpRef: MutableRefObject<mapboxgl.Popup>;
  isSelectedSteps: boolean;
  setIsSelectedSteps: (value: boolean) => void;
  isSelectedInterestPoints: boolean;
  setIsSelectedInterestPoints: (value: boolean) => void;
  areTripsUpToDate: boolean;
  setAreTripsUpToDate: (value: boolean) => void;
  stepItems: Item[];
  setStepItems: (value: Item[]) => void;
  interestPointItems: Item[];
  setInterestPointItems: (value: Item[]) => void;
  selectedId: number;
  setSelectedId: (value: number) => void;
}

const DataContext = createContext<DataContextProps>(undefined!);

export const DataProvider = ({ children }: any) => {
  // const queryClient = useQueryClient();

  // Refs
  const map = useRef<any>();
  const popUpRef = useRef<mapboxgl.Popup>(new mapboxgl.Popup({ offset: 15 }));

  // States
  const [isSelectedSteps, setIsSelectedSteps] = useState(false);
  const [isSelectedInterestPoints, setIsSelectedInterestPoints] =
    useState(false);

  // const [storedInterestPointsMarkers, setStoredInterestPointsMarkers] =
  //   useState<Marker[]>([]);
  // const [storedStepsMarkers, setStoredStepsMarkers] = useState<Marker[]>([]);

  const [areTripsUpToDate, setAreTripsUpToDate] = useState(true);

  // Draggables items
  const [stepItems, setStepItems] = useState(new Array<Item>());
  const [interestPointItems, setInterestPointItems] = useState(
    new Array<Item>()
  );

  const [selectedId, setSelectedId] = useState(0);

  return (
    <DataContext.Provider
      value={{
        map,
        popUpRef,
        isSelectedSteps,
        setIsSelectedSteps,
        isSelectedInterestPoints,
        setIsSelectedInterestPoints,
        areTripsUpToDate,
        setAreTripsUpToDate,
        stepItems,
        setStepItems,
        interestPointItems,
        setInterestPointItems,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
