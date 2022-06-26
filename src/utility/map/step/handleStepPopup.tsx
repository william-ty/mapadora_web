// Create points
import { Step } from "../../../model/Step";
import { PopupInput } from "../../../components/Map/PopupInput";
import ReactDOM from "react-dom";
import { LngLatLike } from "mapbox-gl";
import { Element } from "../../../model/Element";
import { Point } from "../../../model/Point";
import { QueryClient } from "react-query";
import { CreateType, DeleteType } from "../../../api/api";

export const handleStepPopup = (
  map: any,
  popUpRef: any,
  currentTravelId: number,
  setAreTripsUpToDate: (value: boolean) => void,
  addStep: (variables: CreateType) => void
) => {
  map.on("click", (event: any) => {
    const popupNode = document.createElement("div");
    const coordinate: LngLatLike = [event.lngLat.lng, event.lngLat.lat];
    const closePopup = () => popUpRef.current.remove();

    const point = new Point({type : "Point", coordinates : coordinate});

    const element = new Element({
      name: "",
      description: "",
      predicted_date: new Date(),
      id_travel:0
    });
    const step = new Step({
      element_step: element,
      point: point,
      order: 1,
      duration: 1,
    });

    ReactDOM.render(
      <PopupInput
        title="Ajouter une étape"
        map={map}
        action={closePopup}
        object={step}
        currentTravelId={currentTravelId}
        setAreTripsUpToDate={setAreTripsUpToDate}
        addMutation={addStep}
      />,
      popupNode
    );

    popUpRef.current.setLngLat(coordinate).setDOMContent(popupNode).addTo(map);

    const location = {
      center: coordinate,
      zoom: map.getZoom(),
      pitch: map.getPitch(),
      bearing: map.getBearing(),
    };

    map.flyTo(location);
  });
};
