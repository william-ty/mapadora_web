import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import mapboxgl, { Marker } from "mapbox-gl";
import { mapboxToken } from "../../mapboxToken";
import { Position } from "model/Position";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Diary as DiaryModel } from "../../model/Diary";
import { Photo, Photo as PhotoModel } from "../../model/Photo";
import { InlineAlert } from "../../utility/alert/InlineAlert";
import { useQueryClient } from "react-query";
import theme from "../../theme/theme";
import position_icon from "../../img/album/position_icon.png";
import image_icon from "../../img/album/image_icon.png";
import { useTranslation } from "react-i18next";

export type MapAlbumProps = {
  photos: PhotoModel[] | undefined; // Must be sorted
  positions: Position[] | undefined;
};

export const MapAlbum = ({ photos, positions }: MapAlbumProps) => {
  const { t } = useTranslation();

  // Prepares data for ImageViewer
  const [dataViewer, setDataViewer] = useState<string[]>([]);
  const [arePositionsVisible, setArePositionsVisible] = useState(true);
  const [arePhotosVisible, setArePhotosVisible] = useState(true);

  // ImageViewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = (index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const dataViewerTemp: string[] = [];

    photos?.forEach((photo) => {
      dataViewerTemp.push(photo.path);
    });

    setDataViewer(dataViewerTemp);
  }, [photos]);

  // Mapboxgl API token
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);

  mapboxgl.accessToken = mapboxToken;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [7.751154323216781, 48.58156854870154],
      zoom: 11,
      pitch: 15,
    });
  });

  // Draw positions markers
  useEffect(() => {
    let positionMarkers: Marker[] = [];

    arePositionsVisible &&
      positions?.forEach((position: Position) => {
        if (position.point) {
          const el = document.createElement("div");
          el.style.backgroundImage = `url(${position_icon})`;
          el.style.width = `${15}px`;
          el.style.height = `${15}px`;
          el.style.backgroundSize = "100%";
          positionMarkers.push(
            new mapboxgl.Marker(el)
              .setLngLat([
                position.point.coordinates[0],
                position.point.coordinates[1],
              ])
              .addTo(map.current)
          );
        }
      });
      

    return () => {
      positionMarkers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, positions, arePositionsVisible]);

  // Draw photos markers
  useEffect(() => {
    let photoMarkers: Marker[] = [];

    arePhotosVisible &&
      photos?.forEach((photo: Photo, index: number) => {
        if (photo.point) {
          const el = document.createElement("div");
          el.style.backgroundImage = `url(${image_icon})`;
          el.style.width = `${33}px`;
          el.style.height = `${27}px`;
          el.style.backgroundSize = "100%";

          const photoMarker = new mapboxgl.Marker(el)
            .setLngLat([photo.point.coordinates[0], photo.point.coordinates[1]])
            .addTo(map.current);
          photoMarker.getElement().addEventListener("click", (e) => {
            openImageViewer(index - 1);
          });

          photoMarkers.push(photoMarker);
        }
      });
      if(photoMarkers.length > 0){
        map.current.setCenter(photoMarkers[0].getLngLat()) 
        map.current.setZoom(10)
      }
      else{
       map.current.setZoom(1)
      }
    return () => {
      photoMarkers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, photos, arePhotosVisible]);

  return (
    <>
      {" "}
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "80vh", position: "relative" }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "secondary.light",
            display: "flex",
            flexDirection: "column",
            padding: 1,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={arePhotosVisible}
                onChange={() => setArePhotosVisible((old) => !old)}
              />
            }
            label={t("album.map.showPhotos")}
          />
          <FormControlLabel
            control={
              <Switch
                checked={arePositionsVisible}
                onChange={() => setArePositionsVisible((old) => !old)}
              />
            }
            label={t("album.map.showPositions")}
          />
        </Box>
      </div>
      {/* ImageViewer */}
      {isViewerOpen && (
        <ImageViewer
          src={dataViewer}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 2000,
          }}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
};

// {memories?.map((memory, index) => {
//   return (
//     <>
//       <TimelineItem>
//         {/* Display the image or diary */}
//         <TimelineContent>
//           <img
//             // @ts-ignore
//             src={memory?.path}
//             alt=""
//             loading="lazy"
//             style={{
//               maxWidth: "100%",
//             }}
//             // @ts-ignore
//             onClick={() => openImageViewer(memory?.path)}
//           />
//         </TimelineContent>
//       </TimelineItem>
//     </>
//   );
// })}
