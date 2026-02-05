import { useAuth } from "@/redux/api/authSlice";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs } from "expo-router";
import { ArchiveBook } from "iconsax-react-nativejs";
import { useEffect } from "react";
import { useTheme } from "react-native-paper";

export default function Layout() {
  const { user } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)");
    }
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? colors.primary : colors.onSurface}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="logs"
        options={{
          title: "Logs",
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <ArchiveBook
              size="24"
              color={focused ? colors.primary : colors.onSurface}
            />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? colors.primary : colors.onSurface}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
