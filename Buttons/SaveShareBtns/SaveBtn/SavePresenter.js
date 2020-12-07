import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SaveBtn = memo((props) => (
  <TouchableOpacity onPress={props.onPress}>
    <FontAwesome name="save" color="black" size={40} />
  </TouchableOpacity>
));

export default SaveBtn;
