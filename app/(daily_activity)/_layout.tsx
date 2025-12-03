import CustomHeader from "@/components/elements/CustomHeader";
import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

export default function ActivityLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Journal",
          headerTitle: "Journal",
          header: (props) => <CustomHeader {...props} />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="notes"
        options={{
          title: "Journal",
          headerTitle: "Journal",
          header: (props) => <CustomHeader {...props} />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="food_health"
        options={{
          title: "Meals",
          headerTitle: "Meals",
          header: (props) => <CustomHeader {...props} />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
