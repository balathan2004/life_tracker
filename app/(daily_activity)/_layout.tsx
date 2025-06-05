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
      <Stack.Screen name="activity_notes"></Stack.Screen>
      <Stack.Screen name="food_health"></Stack.Screen>
    </Stack>
  );
}
