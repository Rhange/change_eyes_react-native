import { useState, useRef } from "react";

export const useTakePhotoState = () => {
	const [isPreview, setIsPreview] = useState(false);
	const [takePhoto, setTakePhoto] = useState({});

	const cameraRef = useRef();

	return {
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
						base64: photo.base64,
					});
				}
			}
		},
		takePhoto,
		setTakePhoto,
	};
};
