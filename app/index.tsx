import { useUserContext } from "@/components/context/userContext";
import { dailyLogInterface, UserDataInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { getData } from "@/components/utils/data_store";
import { useSetDailyLog } from "@/features/dispatchActions";
import { globalStyles } from "@/styles/global.css";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { useDispatch } from "react-redux";
const image = require("../assets/images/life-tracker.png");
export default function Home() {
  const { userCred, setUserCred } = useUserContext();
  const dispatch = useDispatch();

  const retrieveCred = async () => {
    const userData = ((await getData("userCred")) as UserDataInterface) || null;

    const dailyLog = (await getData("dailyLog")) as dailyLogInterface;

    if (!userData) {
      router.replace("/(auth)");
      return;
    }

    setUserCred(userData);
    useSetDailyLog(dispatch, dailyLog);
    router.replace("/(tabs)");
  };

  useEffect(() => {
    retrieveCred();
  }, []);

  return (
    <View style={globalStyles.safearea}>
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CenterText style={{ fontSize: 32, marginVertical: 20 }}>
          {" "}
          Welcome
        </CenterText>
        <Image
          style={{ width: 250, height: 250, borderRadius: 10 }}
          source={image}
        ></Image>
      </View>
    </View>
  );
}
