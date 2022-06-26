import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import { DeleteType } from "../../../api/api";
import { InterestPoint } from "../../../model/InterestPoint";
import theme from "../../../theme/theme";

export const saveInterestPoint = (
  map: any,
  interestPoint: InterestPoint,
  currentTravelId: number,
  deleteInterestPoint: (variables: DeleteType) => void,
  setSelectedId: (value: number) => void,
  draggable = false
) => {
  // Create marker
  const marker = new mapboxgl.Marker({
    color: theme.palette.primary.lighty,
    draggable: draggable,
  })
    .setLngLat([
      interestPoint.point.coordinates[0],
      interestPoint.point.coordinates[1],
    ])
    .addTo(map);

  // Save Popup on element
  marker.getElement().addEventListener("click", (e) => {
    if (interestPoint?.id) {
      setSelectedId(interestPoint.id);
    }
    e.stopPropagation();

    // Create popup
    const popup = new mapboxgl.Popup()
      .setLngLat(marker.getLngLat())
      .setHTML(
        `<div style="background-color:'white'">
        <p>Nom: ${interestPoint?.element.name}</p>
        <p>Description: ${interestPoint?.element.description}</p>
        <button id="btn-element-point-delete" style="border-radius: '6px';">Supprimer le point</button>
        <a href="/travel/${currentTravelId}/interestpoints/${interestPoint?.id}" id="btn-element-point-details" style="border-radius: '6px'; text-decoration: 'none';">Voir le point</a>
        </div>
        `
      )
      .addTo(map);

    const button = document.getElementById("btn-element-point-delete");

    // Add event to marker
    document
      .getElementById("btn-element-point-delete")
      ?.addEventListener("click", function (e) {
        popup.remove(); // Close popup

        // Send request to delete point in DB on
        if (interestPoint.id)
          deleteInterestPoint({
            route: InterestPoint.routeName,
            id: interestPoint.id,
            idTravel: currentTravelId,
          });
      });
    // Add event to marker
    document
      .getElementById("btn-element-point-detail")
      ?.addEventListener("click", function (e) {
        popup.remove(); // Close popup
      });
  });

  return marker;
};
