import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";
import { moods } from "./moodAccordition";

interface props {
  data: dailyLogInterface;
}

export default function DayReport({ data }: props) {
  const handleNavigation = () => {
    if (data) {
      router.push({
        pathname: "/(logs)",
        params: { doc: JSON.stringify(data) },
      });
    }
  };

  const formatDate = (date: string) => {
    return moment(date, "DD-MM-YYYY").format("DD MMMM");
  };

  const selectIcon = (mood: dailyLogInterface["mood"]) => {
    const currentMood = moods.find((item) => item.value == mood);

    return currentMood?.label || "\u{1F610}"; // okay mood default
  };

  return (
    <Pressable style={styles.pressable} onPress={handleNavigation}>
      <View style={styles.left}>
        <ThemeText style={{ fontSize: 40 }}>{selectIcon(data.mood)}</ThemeText>
        {/* <ThemeText>{data.mood}</ThemeText> */}
      </View>
      <View style={styles.right}>
        <ThemeText>{formatDate(data.date)}</ThemeText>
        <ThemeText>
          {moment(data.wakeUpTime).format("hh :mm A")} -{" "}
          {moment(data.sleepTime).format("hh :mm A")}
        </ThemeText>

        <ThemeText>{data.somethingProductive}</ThemeText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    minHeight: 100,
  },
  left: {},
  right: {},
});
