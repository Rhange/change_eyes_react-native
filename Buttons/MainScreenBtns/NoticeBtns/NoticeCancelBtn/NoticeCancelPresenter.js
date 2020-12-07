import React, { memo } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const NoticeCancelBtn = memo((props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={styles.OnceCloseHowToPageBtn}>
    <Image source={require("./OnceSkip.png")} style={styles.imgStyle} />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  OnceCloseHowToPageBtn: {
    width: width / 7,
    height: height / 17,
    top: "88%",
    left: "73%",
    borderColor: "#6e6e6e",
    borderWidth: 5,
    position: "absolute",
    backgroundColor: "#292826"
  },

  imgStyle: {
    width: width / 12,
    height: height / 10,
    resizeMode: "contain",
    bottom: "61%",
    left: "14%"
  }
});

export default NoticeCancelBtn;
