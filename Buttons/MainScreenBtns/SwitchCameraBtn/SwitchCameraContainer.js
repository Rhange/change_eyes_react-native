import { useState } from "react";
import { Camera } from "expo-camera";

export const useCameraTypeState = (
  initialState = Camera.Constants.Type.front
) => {
  const [cameraType, setCameraType] = useState(initialState);

  return {
    cameraType,
    switchCameraType: () =>
      setCameraType((cameraType) =>
        cameraType === Camera.Constants.Type.front
          ? Camera.Constants.Type.back
          : Camera.Constants.Type.front
      )
  };
};
