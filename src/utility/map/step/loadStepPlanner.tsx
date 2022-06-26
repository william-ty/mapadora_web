// Load saved points
import api from "../../../api/api";
import { stepFactory } from "../../../components/Map/factories/stepFactory";
import { Step } from "../../../model/Step";

export const loadStepPlanner = async (map: any, currentTravelId: number) => {
  return api.get({ route: Step.routeName, idTravel: currentTravelId });
};
