import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useNoticeState = () => {
  const [isNotice, setIsNotice] = useState(true);

  useEffect(() => {
    (async () => {
      const noticeStatus = await AsyncStorage.getItem("Notice");
      noticeStatus !== null ? setIsNotice(JSON.parse(noticeStatus)) : false;
    })();
  }, []);

  return {
    isNotice,
    clickCancelNotice: () => setIsNotice(false),
    clickNeverNotice: async () => {
      try {
        await AsyncStorage.setItem("Notice", JSON.stringify(false));
        setIsNotice(false);
      } catch (e) {
        console.log(`Storage Set Error: ${e}`);
      }
    }
  };
};
