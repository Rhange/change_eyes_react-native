import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import ProgressLoading from "./progressLoading";
import Texts from "./Texts";

const Progress = ({ step, steps, height }) => {
	const [width, setWidth] = useState(0);
	const animatedValue = useRef(new Animated.Value(-1000)).current;
	const reactive = useRef(new Animated.Value(-1000)).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: reactive,
			donation: 300,
			useNativeDriver: true,
		}).start();
	}, []);

	useEffect(() => {
		reactive.setValue(-width + (width * step) / steps);
	}, [step, width]);

	return (
		<>
			<Texts />
			<View
				onLayout={(e) => {
					const newWidth = e.nativeEvent.layout.width;

					setWidth(newWidth);
				}}
				style={{
					height,
					backgroundColor: "#ffffff",
					borderRadius: height,
					overflow: "hidden",
					marginBottom: height / 0.04,
				}}
			>
				<Animated.View
					style={{
						height,
						width: "100%",
						borderRadius: height,
						backgroundColor: "#032dff",
						marginBottom: height / 0.04,

						left: 0,
						top: 0,
						transform: [
							{
								translateX: animatedValue,
							},
						],
					}}
				/>
			</View>
		</>
	);
};

export default function App() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((index + 2) % (100 + 2));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [index]);
	return (
		<View style={styles.container}>
			<ProgressLoading />
			<StatusBar hidden />
			<Progress step={index} steps={100} height={3} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		padding: (0, 20),
	},
});
