import React, { useState, useEffect } from "react";
import {
	ActivityIndicator,
	Text,
	Image,
	Dimensions,
	Alert,
	ImageBackground,
} from "react-native";
import styled from "styled-components";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { imageTransfer } from "./API/api";

import ProgressBarMain from "./Screen/ProgressBar/progressBarMain";
import FaceLine from "./Screen/FaceLine";

import TwoPeopleBtn from "./Buttons/ChangeBtns/TwoPeopleBtn/TwoPeoplePresenter";
import { useTwoPeopleState } from "./Buttons/ChangeBtns/TwoPeopleBtn/TwoPeopleContainer";

import GenderBtn from "./Buttons/ChangeBtns/GenderBtn/GenderPresenter";
import { useGenderState } from "./Buttons/ChangeBtns/GenderBtn/GenderContainer";

import TakePhotoBtn from "./Buttons/MainScreenBtns/TakePhotoBtn/TakePhotoPresenter";
import { useTakePhotoState } from "./Buttons/MainScreenBtns/TakePhotoBtn/TakePhotoContainer";

import SwitchCameraBtn from "./Buttons/MainScreenBtns/SwitchCameraBtn/SwitchCameraPresenter";
import { useCameraTypeState } from "./Buttons/MainScreenBtns/SwitchCameraBtn/SwitchCameraContainer";

import GetPhotoBtn from "./Buttons/MainScreenBtns/GetPhotoBtn/GetPhotoPresenter";
import { useGetPhotoState } from "./Buttons/MainScreenBtns/GetPhotoBtn/GetPhotoContainer";

import TransferBtn from "./Buttons/TransferCancelBtns/TransferBtn/TransferPresenter";
import NextBtn from "./Buttons/ChangeBtns/NextBtn/NextPresenter";
import CancelBtn from "./Buttons/TransferCancelBtns/CancelBtn/CancelPresenter";

import SaveBtn from "./Buttons/SaveShareBtns/SaveBtn/SavePresenter";
import ShareBtn from "./Buttons/SaveShareBtns/ShareBtn/SharePresenter";

import NoticeCancelBtn from "./Buttons/MainScreenBtns/NoticeBtns/NoticeCancelBtn/NoticeCancelPresenter";
import NoticeNeverBtn from "./Buttons/MainScreenBtns/NoticeBtns/NoticeNeverBtn/NoticeNeverPresenter";
import { useNoticeState } from "./Buttons/MainScreenBtns/NoticeBtns/NoticeContainer";

import OnePersonPopup from "./Buttons/PopupBtns/OnePersonPopup";
import TwoPeopleMainPopup from "./Buttons/PopupBtns/TwoPeoplePopup";

import OrderLight from "./Buttons/PopupBtns/TwoPeopleLights/TwoPeopleLightsPresenter";
import { useLightState } from "./Buttons/PopupBtns/TwoPeopleLights/TwoPeopleLightsContainer";

const { width, height } = Dimensions.get("window");
const MainContainer = styled.View`
	flex: 1;
	background-color: white;
`;
const MainBtnContainer = styled.View`
	flex: 1;
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;
const ChangeBtnContainer = styled.View`
	flex: 1;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	position: absolute;
	bottom: 0;
`;
const ChangeBtnBox = styled.View`
	width: 100%;
	flex: 1;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;
const NoticeContainer = styled.View`
	width: 100%;
	height: 100%;
	position: absolute;
`;
const LightContainer = styled.View`
	width: 100%;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 3%;
	margin-top: 10%;
	position: absolute;
	top: 3%;
`;

// Image Temporary Storage
let firstPhoto = "";
let secondPhoto = "";
let resultPhotoList = [];

export default function App() {
	// useState
	const [isLoading, setIsLoading] = useState(false);
	const [isAfterView, setIsAfterView] = useState(false);

	// Own Hooks States
	const {
		isTwoPeople,
		setIsTwoPeople,
		onPressTwoPeople,
		twoPeopleToggleValue,
		setTwoPeopleToggleValue,
		onToggleTwoPeople,
	} = useTwoPeopleState();
	const {
		isGender,
		setIsGender,
		onPressGender,
		genderValue,
		setGenderValue,
		onToggleGender,
	} = useGenderState();
	const {
		hasPermission,
		cameraRef,
		isPreview,
		setIsPreview,
		takePhoto,
		setTakePhoto,
		onPressTakePhoto,
	} = useTakePhotoState();
	const {
		imageSelected,
		setImageSelected,
		onPressGetPhoto,
		albumPhoto,
		setAlbumPhoto,
	} = useGetPhotoState();
	const { cameraType, switchCameraType } = useCameraTypeState();
	const { isNotice, clickCancelNotice, clickNeverNotice } = useNoticeState();
	const {
		firstLightColor,
		firstLightText,
		secondLightColor,
		secondLightText,
		LightDefaultColor,
	} = useLightState();

	console.log(
		`isTwoPeople: ${isTwoPeople}, twoPeopleToggle: ${twoPeopleToggleValue}, genderValue: ${genderValue}, isGender: ${isGender}`
	);

	// 2인일 때, 2번째 사진으로 넘어가는 버튼
	const onPressNext = async () => {
		if (isPreview) {
			await cameraRef.current.resumePreview();
			setIsPreview(false);
		}

		if (imageSelected) {
			setImageSelected(false);
		}

		firstPhoto =
			(takePhoto && takePhoto.base64) ||
			(albumPhoto && albumPhoto.base64);

		setIsTwoPeople(true);
		setTwoPeopleToggleValue(true);
		setTakePhoto({});
		setAlbumPhoto({});
	};

	// 취소 버튼, 모든 상태 초기화
	const onPressCancel = async () => {
		if (isPreview) {
			await cameraRef.current.resumePreview();
			setIsPreview(false);
			setTakePhoto({});
		}

		if (imageSelected) {
			setImageSelected(false);
			setAlbumPhoto({});
		}

		setIsGender("female"); // 취소 버튼 누르면 성별 '여자'로 초기화
		setGenderValue(false);

		setIsTwoPeople(false);
		setTwoPeopleToggleValue(false);

		setIsAfterView(false);
		firstPhoto = "";
		secondPhoto = "";
		setTakePhoto({});
		setAlbumPhoto({});
	};

	// AI Server로 이미지 전송하는 버튼
	const getTransferImage = async () => {
		try {
			console.log(`getTransferImage start!`);

			if (!firstPhoto) {
				firstPhoto =
					(takePhoto && takePhoto.base64) ||
					(albumPhoto && albumPhoto.base64);
			} else {
				secondPhoto =
					(takePhoto && takePhoto.base64) ||
					(albumPhoto && albumPhoto.base64);
			}

			// Image Transformation Start
			setIsLoading(true);

			console.log(`getTransfer Check: ${isGender}`);

			resultPhotoList = await imageTransfer(
				firstPhoto,
				secondPhoto,
				isGender
			);

			setIsLoading(false);
			// Image Transformation End

			if (isPreview) {
				await cameraRef.current.resumePreview();
				setIsPreview(false);
			}

			if (imageSelected) {
				setImageSelected(false);
			}

			firstPhoto = "";
			secondPhoto = "";
			setIsAfterView(true);
		} catch (e) {
			alert(`getTransferImage Error: ${e}`);
		}
	};

	// 결과 이미지 저장 버튼
	const onPressSave = async () => {
		try {
			// original Image path 설정
			const originalImg = resultPhotoList[0].split(
				"data:image/png;base64,"
			)[1];
			const originalFileName =
				FileSystem.documentDirectory + "original.png";
			await FileSystem.writeAsStringAsync(originalFileName, originalImg, {
				encoding: FileSystem.EncodingType.Base64,
			});

			// changed Image path 설정
			const changedImg = resultPhotoList[1].split(
				"data:image/png;base64,"
			)[1];
			const changedFileName =
				FileSystem.documentDirectory + "changed.png";
			await FileSystem.writeAsStringAsync(changedFileName, changedImg, {
				encoding: FileSystem.EncodingType.Base64,
			});

			// Original, Changed 모두 갤러리 저장
			await MediaLibrary.saveToLibraryAsync(originalFileName);
			await MediaLibrary.saveToLibraryAsync(changedFileName);

			Alert.alert("저장완료❤", "갤러리에서 확인할 수 있습니다.");
		} catch (error) {
			alert(`Save Result Photo Error: ${error}`);
		}
	};

	// 공유 버튼
	const onPressShare = async () => {
		try {
			// changed Image path 설정
			const changedImg = resultPhotoList[1].split(
				"data:image/png;base64,"
			)[1];
			const changedFileName =
				FileSystem.documentDirectory + "changed.png";
			await FileSystem.writeAsStringAsync(changedFileName, changedImg, {
				encoding: FileSystem.EncodingType.Base64,
			});

			// changed Image 공유
			await Sharing.shareAsync(changedFileName);
		} catch (error) {
			alert(`Open Sharing Error: ${error}`);
		}
	};

	// View
	if (hasPermission === true) {
		return isLoading ? (
			<ProgressBarMain />
		) : (
			<MainContainer>
				{!imageSelected && !isAfterView && (
					<Camera
						style={
							height >= 790
								? {
										alignItems: "center",
										width: width,
										height: width / 0.75,
										marginTop: 50,
								  }
								: {
										alignItems: "center",
										width: width,
										height: width / 0.65,
										marginTop: 0,
								  }
						}
						type={cameraType}
						ref={cameraRef}
					>
						<FaceLine />
						{!isTwoPeople ? (
							<OnePersonPopup />
						) : (
							<TwoPeopleMainPopup />
						)}
						{!isTwoPeople || isPreview ? (
							<></>
						) : !firstPhoto ? (
							<LightContainer>
								<OrderLight
									backgroundColor={firstLightColor}
									text={firstLightText}
								/>
								<OrderLight
									backgroundColor={LightDefaultColor}
									text={secondLightText}
								/>
							</LightContainer>
						) : (
							<LightContainer>
								<OrderLight
									backgroundColor={LightDefaultColor}
									text={firstLightText}
								/>
								<OrderLight
									backgroundColor={secondLightColor}
									text={secondLightText}
								/>
							</LightContainer>
						)}

						<ChangeBtnContainer>
							<ChangeBtnBox>
								{!isTwoPeople && (
									<GenderBtn
										onPress={onPressGender}
										value={genderValue}
										onToggle={onToggleGender}
									/>
								)}
							</ChangeBtnBox>
							<ChangeBtnBox>
								<TwoPeopleBtn
									onPress={onPressTwoPeople}
									value={twoPeopleToggleValue}
									onToggle={onToggleTwoPeople}
								/>
							</ChangeBtnBox>
							<ChangeBtnBox></ChangeBtnBox>
						</ChangeBtnContainer>
					</Camera>
				)}

				{imageSelected && (
					<>
						<Image
							style={
								height >= 790
									? {
											width: width,
											height: width / 0.75,
											marginTop: 50,
									  }
									: {
											width: width,
											height: width / 0.75,
											marginTop: 25,
									  }
							}
							source={{ uri: albumPhoto.uri }}
						/>
						<ChangeBtnContainer>
							{!isTwoPeople && (
								<GenderBtn
									onPress={onPressGender}
									value={genderValue}
									onToggle={onToggleGender}
								/>
							)}
						</ChangeBtnContainer>
					</>
				)}

				{isAfterView && (
					<Image
						style={
							height >= 790
								? {
										width: width,
										height: width,
										marginTop: 100,
								  }
								: {
										width: width,
										height: width,
										marginTop: 0,
								  }
						}
						source={{ uri: resultPhotoList[1] }}
					/>
				)}

				{!isPreview && !imageSelected && !isAfterView && (
					<MainBtnContainer>
						<GetPhotoBtn onPress={onPressGetPhoto} />
						<TakePhotoBtn onPress={onPressTakePhoto} />
						<SwitchCameraBtn onPress={switchCameraType} />
					</MainBtnContainer>
				)}
				{isAfterView && (
					<MainBtnContainer>
						<SaveBtn onPress={onPressSave} />
						<ShareBtn onPress={onPressShare} />
						<CancelBtn onPress={onPressCancel} />
					</MainBtnContainer>
				)}
				{(isPreview || imageSelected) && (
					<MainBtnContainer>
						{!isTwoPeople || (isTwoPeople && firstPhoto) ? (
							<TransferBtn onPress={getTransferImage} />
						) : (
							<NextBtn onPress={onPressNext} />
						)}
						<CancelBtn onPress={onPressCancel} />
					</MainBtnContainer>
				)}
				{isNotice && (
					<NoticeContainer>
						<ImageBackground
							source={require("./assets/app_intro.png")}
							style={{
								width: "100%",
								height: "100%",
							}}
						>
							<NoticeCancelBtn onPress={clickCancelNotice} />
							<NoticeNeverBtn onPress={clickNeverNotice} />
						</ImageBackground>
					</NoticeContainer>
				)}
			</MainContainer>
		);
	} else if (hasPermission === false) {
		return (
			<MainContainer>
				<Text>Don't have permission for this</Text>
			</MainContainer>
		);
	} else {
		return (
			<MainContainer>
				<ActivityIndicator />
			</MainContainer>
		);
	}
}
