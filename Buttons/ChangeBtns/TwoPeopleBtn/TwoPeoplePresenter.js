import React, { memo } from "react";
import ToggleButton from "react-native-toggle-element";
import { Image } from "react-native";

const TwoPeopleBtn = memo((props) => (
  <ToggleButton
    onPress={props.onPress}
    value={props.value}
    onToggle={props.onToggle}
    thumbActiveComponent={
      <Image
        source={require("../../../images/twoPeopleImages/two_people.png")}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        }}
      />
    }
    thumbInActiveComponent={
      <Image
        source={require("../../../images/twoPeopleImages/one_person.png")}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        }}
      />
    }
    thumbButton={{
      width: 100,
      height: 100,
      radius: 0
    }}
    trackBar={{
      activeBackgroundColor: "transparent",
      inActiveBackgroundColor: "transparent",
      borderActiveColor: "white",
      borderInActiveColor: "white",
      width: 100,
      height: 100
    }}
    trackBarStyle={{
      opacity: 0.9
    }}></ToggleButton>
));

export default TwoPeopleBtn;
