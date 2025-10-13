import { format } from "date-fns";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { moodColors } from "../ui/logCardColors";
import { ThemeText } from "../ui/TextElements";
import { moods } from "./moodAccordition";

interface props {
  data: dailyLogInterface;
  nextDayWakeupTime: any;
}

export default function DayReport({ data, nextDayWakeupTime }: props) {
  const colorVariant = moodColors.find((item) => item.mood == data.mood);

  const handleNavigation = () => {
    if (data) {
      router.push({
        pathname: "/(logs)",
        params: { doc: JSON.stringify(data) },
      });
    }
  };

  const formatDate = (date: string) => {
    return format(date, "dd MMMM");
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
    <Pressable
      style={{
        flexDirection: "row",
        gap: 24,
        alignItems: "center",
        backgroundColor: colorVariant?.background,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}
      onPress={handleNavigation}
    >
      <ThemeText
        style={{
          fontSize: 40,
          backgroundColor: colorVariant?.emoji,
          borderRadius: 14,
          paddingHorizontal: 3,
          paddingVertical: 2,
        }}
      >
        {selectIcon(data.mood)}
      </ThemeText>

      <View style={{ flex: 1, gap: 8 }}>
        <ThemeText>{formatDate(data.date)}</ThemeText>
        <ThemeText>
          {data.wakeUpTime
            ? format(new Date(data.wakeUpTime), "hh:mm a")
            : "Time Not Saved"}{" "}
          -{" "}
          {data.sleepTime
            ? format(new Date(data.sleepTime), "hh:mm a")
            : "Time Not Saved"}
        </ThemeText>

        {Boolean(data.somethingProductive || data.notes) && (
          <ThemeText
            numberOfLines={2}
            style={{
              marginRight: 16,
              flexShrink: 1,
            }}
          >
            {data.somethingProductive || data.notes}
          </ThemeText>
        )}
      </View>
    </Pressable>
  );
}
