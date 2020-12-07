import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const TransferBtn = memo((props) => (
	<TouchableOpacity onPress={props.onPress}>
		<FontAwesome name="check-circle" color="black" size={60} />
	</TouchableOpacity>
));

export default TransferBtn;
