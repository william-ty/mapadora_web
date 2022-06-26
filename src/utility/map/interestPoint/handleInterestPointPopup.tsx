// Create points
import { InterestPoint } from "../../../model/InterestPoint";
import { PopupInput } from "../../../components/Map/PopupInput";
import ReactDOM from "react-dom";
import { LngLatLike } from "mapbox-gl";
import { Point } from "../../../model/Point";
import { Element } from "../../../model/Element";
import { QueryClient } from "react-query";
import { CreateType, DeleteType } from "../../../api/api";

export const handleInterestPointPopup = (
  map: any,
  popUpRef: any,
  currentTravelId: number,
  addInterestPoint: (variables: CreateType) => void
) => {
  map.on("click", (event: any) => {
    const popupNode = document.createElement("div");
    const coordinate: LngLatLike = [event.lngLat.lng, event.lngLat.lat];
    const closePopup = () => popUpRef.current.remove();

    const point = new Point({ type: "Point", coordinates: coordinate });
    const element = new Element({
      name: "",
      description: "",
      predicted_date: new Date(),
      id_travel: currentTravelId,
    });
    const interestPoint = new InterestPoint({
      element: element,
      point: point,
      order: 1,
    });

    ReactDOM.render(
      <PopupInput
        title="Ajouter un point d'intérêt"
        map={map}
        action={closePopup}
        object={interestPoint}
        currentTravelId={currentTravelId}
        addMutation={addInterestPoint}
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
