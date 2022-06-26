import mapboxgl from "mapbox-gl";
// import { NavigateFunction, useNavigate } from "react-router-dom";
import api, { DeleteType } from "../../../api/api";
import { Popup } from "../../../components/Map/Popup";
import { Step } from "../../../model/Step";
import theme from "../../../theme/theme";

export const saveStep = (
  map: any,
  step: Step,
  currentTravelId: number,
  setAreTripsUpToDate: (value: boolean) => void,
  deleteStep: (variables: DeleteType) => void,
  setSelectedId: (value: number) => void,
  draggable = false
) => {
  // Create marker
  const marker = new mapboxgl.Marker({
    color: theme.palette.secondary.lighty,
    draggable: draggable,
  })
    .setLngLat([step.point.coordinates[0], step.point.coordinates[1]])
    .addTo(map);

  setAreTripsUpToDate(false);

  // Save Popup on element
  marker.getElement().addEventListener("click", (e) => {
    if (step?.id) {
      setSelectedId(step.id);
    }
    e.stopPropagation();

    // Create popup
    const popup = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(marker.getLngLat())
      .setHTML(
        `<div style="background-color:'white'">
        <p>Nom: ${step.element.name}</p>
        <p>Description: ${step.element.description}</p>
        <p>Durée: ${step.duration.toString()}</p>
        <button id="btn-element-point-delete" style="border-radius: '6px';">Supprimer le point</button>
        <a href="/travel/${currentTravelId}/steps/${step?.id}" id="btn-element-point-details">Voir le point</a>
      </div>
      `
      )
      .addTo(map);

    const button = document.getElementById("btn-element-point-delete");

    // // Create popup
    // const popup = ReactDOM.render(
    //   <Popup
    //     title="Ajouter un point d'intérêt"
    //     name={"test"}
    //     description={"test"}
    //     action={closePopup}
    //   />,
    //   popupNode
    // );

    // // const coordinate: LngLatLike = [e.lngLat.lng, e.lngLat.lat];
    // popUpRef.current.setLngLat(marker.getLngLat()).setDOMContent(popupNode).addTo(map);


    // console.log(button);

    // Add event to marker
    document
      .getElementById("btn-element-point-delete")
      ?.addEventListener("click", function (e) {
        popup.remove(); // Close popup

        // Send request to delete point in DB on
        if (step.id)
          deleteStep({
            route: Step.routeName,
            id: step.id,
            idTravel: currentTravelId,
          });
        setAreTripsUpToDate(false);
      });
    // Add event to marker
    document
      .getElementById("btn-element-point-details")
      ?.addEventListener("click", function (e) {
        popup.remove(); // Close popup
      });
  });

  return marker;
};
