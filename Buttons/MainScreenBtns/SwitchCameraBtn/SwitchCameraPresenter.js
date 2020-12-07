import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SwitchCameraBtn = memo((props) => (
  <TouchableOpacity onPress={props.onPress}>
    <MaterialCommunityIcons
      name="camera-retake-outline"
      color="black"
      size={40}
    />
  </TouchableOpacity>
));

export default SwitchCameraBtn;
