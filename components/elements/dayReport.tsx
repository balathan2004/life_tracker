import React from "react";
import { View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

interface props {
  data: dailyLogInterface;
}

export default function DayReport({ data }: props) {
  return (
    <View>
      <ThemeText>{data.date}</ThemeText>
    </View>
  );
}
