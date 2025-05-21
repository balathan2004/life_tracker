import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" size={24} color="white" />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" size={24} color="white" />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
