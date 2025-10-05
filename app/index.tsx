import { dailyLogInterface, UserDataInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { getData } from "@/components/utils/data_store";
import { useGetAccessTokenMutation } from "@/redux/api/authApi";
import { useAuth } from "@/redux/api/authSlice";
import { globalStyles } from "@/styles/global.css";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
const image = require("../assets/images/life-tracker.png");
export default function Home() {
  const { useSetDailyLog, useResetDailyLog } = useAuth();

  const [getJwt, { isLoading }] = useGetAccessTokenMutation();

  const retrieveCred = async () => {
    const userData = ((await getData("userCred")) as UserDataInterface) || null;
    const jwt = ((await getData("refreshToken")) as string) || null;
    const dailyLog = ((await getData("dailyLog")) as dailyLogInterface) || null;

    if (!dailyLog || Object.keys(dailyLog).length === 0) {
      useResetDailyLog();
    } else {
      useSetDailyLog(dailyLog);
    }

    if (!userData || !jwt) {
      router.replace("/(auth)");
      return;
    }

    await getJwt(jwt)
      .unwrap()
      .then((res) => {
        console.log(res);
        router.replace("/(tabs)");
      })
      .catch((err) => {
        console.log({ err });
        router.replace("/(auth)");
      });
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
