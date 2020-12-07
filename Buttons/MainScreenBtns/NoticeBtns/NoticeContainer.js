import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useNoticeState = () => {
	const [isNotice, setIsNotice] = useState(true);

	return {
		isNotice,
		setIsNotice,
		clickCancelNotice: () => setIsNotice(false),
		clickNeverNotice: async () => {
			try {
				await AsyncStorage.setItem("Notice", JSON.stringify(false));
				setIsNotice(false);
			} catch (e) {
				console.log(`Storage Set Error: ${e}`);
			}
		},
	};
};
