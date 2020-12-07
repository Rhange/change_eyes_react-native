import { useState } from "react";

export const useGenderState = () => {
  const [isGender, setIsGender] = useState("female");
  const [genderValue, setGenderValue] = useState(false);

  return {
    isGender,
    setIsGender,
    onPressGender: () => {
      isGender === "male" ? setIsGender("female") : setIsGender("male"),
        setGenderValue(!genderValue);
    },
    genderValue,
    setGenderValue,
    onToggleGender: () => (newState) => setGenderValue(newState)
  };
};
