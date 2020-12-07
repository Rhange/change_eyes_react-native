import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const CancelBtn = memo((props) => (
	<TouchableOpacity onPress={props.onPress}>
		<Entypo name="circle-with-cross" color="black" size={60} />
	</TouchableOpacity>
));

export default CancelBtn;
