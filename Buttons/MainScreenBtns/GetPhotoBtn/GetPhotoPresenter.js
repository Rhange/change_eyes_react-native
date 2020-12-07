import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const getPhotoBtn = memo((props) => (
	<TouchableOpacity onPress={props.onPress}>
		<FontAwesome name="picture-o" color="black" size={30} />
	</TouchableOpacity>
));

export default getPhotoBtn;
