import { useUserContext } from "@/components/context/userContext";
import { UserDataInterface } from "@/components/interfaces";
import { ThemeText } from "@/components/ui/TextElements";
import { getData } from "@/components/utils/data_store";
import { globalStyles } from "@/styles/global.css";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Home() {
  const { userCred, setUserCred } = useUserContext();

  const retrieveCred = async () => {
    if (!userCred) {
      const userData =
        ((await getData("userCred")) as UserDataInterface) || null;

      if (!userData) {
        router.push("/(auth)");
        return;
      }

      setUserCred(userData);
      router.push("/(tabs)");
    }
  };

  useEffect(() => {
    retrieveCred();
  }, []);

  return (
    <View style={globalStyles.safearea}>
      <ThemeText>Hello index</ThemeText>
    </View>
  );
}
