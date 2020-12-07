import { useState, useRef, useEffect } from "react";
import * as Permissions from "expo-permissions";

export const useTakePhotoState = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [takePhoto, setTakePhoto] = useState({});
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status == "granted");
    })();
  }, []);

  return {
    hasPermission,
    setHasPermission,
    cameraRef,
    isPreview,
    setIsPreview,
    onPressTakePhoto: async () => {
      if (cameraRef.current) {
        const options = { quality: 1, base64: true };
        const photo = await cameraRef.current.takePictureAsync(options);

        if (photo.uri) {
          await cameraRef.current.pausePreview();
          setIsPreview(true);

          setTakePhoto({
            uri: photo.uri,
            base64: photo.base64
          });
        }
      }
    },
    takePhoto,
    setTakePhoto
  };
};
