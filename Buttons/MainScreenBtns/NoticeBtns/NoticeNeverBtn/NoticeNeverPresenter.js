import React, { memo } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const NoticeNeverBtn = memo((props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={styles.ForeverCloseHowToPageBtn}>
    <Image source={require("./ForeverSkip.png")} style={styles.imgStyle} />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  ForeverCloseHowToPageBtn: {
    width: width / 2.1,
    height: height / 17,
    top: "88%",
    left: "19%",
    borderColor: "#6e6e6e",
    borderWidth: 5,
    position: "absolute",
    resizeMode: "contain",
    backgroundColor: "#292826"
  },
  imgStyle: {
    width: width / 2.7,
    height: height / 10,
    resizeMode: "contain",
    bottom: "61%",
    left: "8%"
  }
});

export default NoticeNeverBtn;
