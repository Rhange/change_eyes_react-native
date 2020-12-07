import React, { memo } from "react";
import { Image } from "react-native";
import ToggleButton from "react-native-toggle-element";

const GenderBtn = memo((props) => (
	<ToggleButton
		onPress={props.onPress}
		value={props.value}
		onToggle={props.onToggle}
		thumbActiveComponent={
			<Image
				source={require("../../../images/genderImages/man.png")}
				style={{
					width: "100%",
					height: "100%",
					resizeMode: "contain",
				}}
			/>
		}
		thumbInActiveComponent={
			<Image
				source={require("../../../images/genderImages/woman.png")}
				style={{
					width: "100%",
					height: "100%",
					resizeMode: "contain",
				}}
			/>
		}
		thumbButton={{
			width: 50,
			height: 50,
			radius: 0,
		}}
		trackBar={{
			activeBackgroundColor: "transparent",
			inActiveBackgroundColor: "transparent",
			borderActiveColor: "white",
			borderInActiveColor: "white",
			width: 50,
			height: 50,
		}}
		trackBarStyle={{
			opacity: 0.9,
		}}
	/>
));

export default GenderBtn;
