import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { ThemeText } from "../ui/TextElements";

export default function FoodCard() {
  const [food, setFood] = useState("");
  const [time, setTime] = useState(0);

  return (
    <View>
      <ThemeText>Food</ThemeText>
      <TextInput></TextInput>
      <ThemeText>Food Intake Time</ThemeText>
      <TextInput></TextInput>
    </View>
  );
}
