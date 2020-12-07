import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ShareBtn = memo((props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Entypo name="share" color="black" size={40} />
  </TouchableOpacity>
));

export default ShareBtn;
