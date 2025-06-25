import { useUserContext } from "@/components/context/userContext";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
  const { userCred } = useUserContext();

  useEffect(() => {
    if (!userCred) {
      console.log(userCred)
      router.replace("/(auth)");
    }
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" size={24} color="white" />,
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={24} color="white" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
