import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const NextBtn = memo((props) => (
	<TouchableOpacity onPress={props.onPress}>
		<Entypo name="arrow-bold-right" color="black" size={60} />
	</TouchableOpacity>
));

export default NextBtn;
