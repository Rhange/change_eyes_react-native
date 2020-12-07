import { useState } from "react";

export const useTwoPeopleState = (initialValue = false) => {
  const [isTwoPeople, setIsTwoPeople] = useState(initialValue);
  const [twoPeopleToggleValue, setTwoPeopleToggleValue] = useState(
    initialValue
  );

  return {
    isTwoPeople,
    setIsTwoPeople,
    onPressTwoPeople: () => {
      setIsTwoPeople(!isTwoPeople),
        setTwoPeopleToggleValue(!twoPeopleToggleValue);
    },
    twoPeopleToggleValue,
    setTwoPeopleToggleValue,
    onToggleTwoPeople: () => (newState) => setTwoPeopleToggleValue(newState)
  };
};
