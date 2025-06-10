import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function Layout() {
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
          title: "account",
          headerShown: false,
          tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="white" /> ,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
