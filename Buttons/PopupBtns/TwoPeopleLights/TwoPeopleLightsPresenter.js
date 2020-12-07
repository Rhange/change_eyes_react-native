import React, { memo } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";

const OrderLight = memo((props) => (
  <View>
    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: props.backgroundColor }}>
      <Text style={styles.textStyle}>{props.text}</Text>
    </TouchableHighlight>
  </View>
));

const styles = StyleSheet.create({
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "justify"
  }
});

export default OrderLight;
