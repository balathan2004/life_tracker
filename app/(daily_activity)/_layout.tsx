import { Stack } from "expo-router";
import React from "react";

export default function ActivityLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="notes"
        options={{ headerTitle: "Journal" }}
      ></Stack.Screen>
      <Stack.Screen
        name="food_health"
        options={{ headerTitle: "Meals" }}
      ></Stack.Screen>
    </Stack>
  );
}
