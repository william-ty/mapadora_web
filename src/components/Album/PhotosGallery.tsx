import { useCallback, useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import ImageViewer from "react-simple-image-viewer";
import { Photo as PhotoModel } from "../../model/Photo";
import { InlineAlert } from "../../utility/alert/InlineAlert";
import { useTranslation } from "react-i18next";

export type PhotosGalleryProps = {
  photos: PhotoModel[] | undefined; // Must be sorted
};

type DataGallery = {
  src: string;
  height: number;
  width: number;
  alt: string;
  key: string;
};

const PhotosGallery = ({ photos }: PhotosGalleryProps) => {
  const { t } = useTranslation();

  // ImageViewer
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // Prepares data for Gallery and ImageViewer
  const [dataGallery, setDataGallery] = useState<DataGallery[]>([]);
  const [dataViewer, setDataViewer] = useState<string[]>([]);

  useEffect(() => {
    const dataGalleryTemp: DataGallery[] = [];
    const dataViewerTemp: string[] = [];

    photos?.forEach((photo) => {
      dataGalleryTemp.push({
        src: photo.path,
        height: 1,
        width: 1,
        alt: "",
        key: photo.id === undefined ? "" : "" + photo.id,
      });
      dataViewerTemp.push(photo.path);
    });

    setDataGallery(dataGalleryTemp);
    setDataViewer(dataViewerTemp);
  }, [photos]);

  return (
    <>
      {!dataGallery || dataGallery.length === 0 ? (
        <InlineAlert message={t("album.gallery.noEntries")} severity="info" />
      ) : (
        <>
          <Gallery photos={dataGallery} onClick={openImageViewer} />
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
      )}
    </>
  );
};

export default PhotosGallery;
