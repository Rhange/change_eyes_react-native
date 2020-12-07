import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const useGetPhotoState = () => {
	const [imageSelected, setImageSelected] = useState(false);
	const [albumPhoto, setAlbumPhoto] = useState({});

	return {
		imageSelected,
		setImageSelected,
		onPressGetPhoto: async () => {
			const photo = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: false,
				quality: 1,
				base64: true,
			});

			if (photo.uri) {
				setImageSelected(true);
				setAlbumPhoto({
					uri: photo.uri,
					base64: photo.base64,
				});
			}
		},
		albumPhoto,
		setAlbumPhoto,
	};
};
