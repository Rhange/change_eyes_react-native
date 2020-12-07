/** @format */

import React from "react";
import { View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default () => {
	return (
		<View
			style={{
				marginTop: height * 0.18,
				width: width / 2.1,
				height: height / 3.5,
				borderRadius: 100,
				borderWidth: 7.5,
				opacity: 0.3,
				borderColor: "white",
				backgroundColor: "transparent",
				position: "absolute",
			}}
		/>
	);
};
