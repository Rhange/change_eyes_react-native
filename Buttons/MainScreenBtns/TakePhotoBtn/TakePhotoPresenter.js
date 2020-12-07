import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TakePhotoBtn = memo((props) => (
	<TouchableOpacity onPress={props.onPress}>
		<MaterialCommunityIcons
			name="circle-slice-8"
			color="black"
			size={100}
		/>
	</TouchableOpacity>
));

export default TakePhotoBtn;
