import { format } from "date-fns";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";
import { moods } from "./moodAccordition";

interface props {
  data: dailyLogInterface;
  nextDayWakeupTime: any;
}

export default function DayReport({ data, nextDayWakeupTime }: props) {
  const handleNavigation = () => {
    if (data) {
      router.push({
        pathname: "/(logs)",
        params: { doc: JSON.stringify(data) },
      });
    }
  };

  const formatDate = (date: string) => {
    return date;
  };

  const selectIcon = (mood: dailyLogInterface["mood"]) => {
    const currentMood = moods.find((item) => item.value == mood);

    return currentMood?.label || "\u{1F610}"; // okay mood default
  };

  function calcSleepTime() {
    // console.log(data.sleepTime,nextDayWakeupTime);
    if (!data.sleepTime || !nextDayWakeupTime) return "0 mins";

    let sleep = data.sleepTime;
    let wake = nextDayWakeupTime;

    // If wake is earlier than sleep, add 1 day to wake
    if (wake <= sleep) {
      wake = new Date(wake.getTime() + 24 * 60 * 60 * 1000);
    }

    const diffMs = wake - sleep;
    console.log({ diffMs });
    const mins = Math.floor(diffMs / (1000 * 60));

    return `${mins} mins`;
  }

  return (
    <Pressable style={styles.pressable} onPress={handleNavigation}>
      <View style={styles.left}>
        <ThemeText style={{ fontSize: 40 }}>{selectIcon(data.mood)}</ThemeText>
        {/* <ThemeText>{data.mood}</ThemeText> */}
      </View>
      <View style={styles.right}>
        <ThemeText style={{
          marginVertical:12
        }}>{formatDate(data.date)}</ThemeText>
        <ThemeText>
          {data.wakeUpTime
            ? format(new Date(data.wakeUpTime), "hh:mm a")
            : "Time Not Saved"}{" "}
          -{" "}
          {data.sleepTime
            ? format(new Date(data.sleepTime), "hh:mm a")
            : "Time Not Saved"}
        </ThemeText>

        <ThemeText>{data.somethingProductive}</ThemeText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    gap: 32,
    alignItems: "center",
    minHeight: 100,
  },
  left: {},
  right: {},
});
