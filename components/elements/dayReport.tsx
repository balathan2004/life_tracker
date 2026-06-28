import { format, isBefore, isSameDay } from "date-fns";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { moodColors } from "../ui/logCardColors";
import { ThemeText } from "../ui/TextElements";
import { moods } from "./moodAccordition";

interface props {
  data: dailyLogInterface;
  nextDayDate: dailyLogInterface | null;
}

export default function DayReport({ data, nextDayDate = null }: props) {
  const colorVariant = moodColors.find((item) => item.mood === data.mood);

  const handleNavigation = () => {
    if (data) {
      router.push({
        pathname: "/(logs)",
        params: { doc_id: data.date },
      });
    }
  };

  const formatDate = (date: string) => {
    return format(date, "dd MMMM");
  };

  const selectIcon = (mood: dailyLogInterface["mood"]) => {
    const currentMood = moods.find((item) => item.value == mood);

    return currentMood?.emoji || "\u{1F610}"; // okay mood default
  };

  const sleepTime = calcSleepTime();

  function calcSleepTime() {
    if (!nextDayDate) return null;

    const sleepMillis = data.sleepTime;

    const wakeMillis = nextDayDate?.wakeUpTime || 0;

    if (!sleepMillis || !wakeMillis) return "Sleep not recorded";

    if (sleepMillis > wakeMillis) return "Invalid sleep record";

    const sleepTime = new Date(sleepMillis);

    const wakeTime = new Date(wakeMillis);

    if (isSameDay(wakeTime, sleepTime) || isBefore(sleepTime, wakeTime)) {
      let sleep = sleepMillis;
      let wake = wakeMillis;

      const diffMinutes = Math.floor((wake - sleep) / (1000 * 60));

      const hours = Math.floor(diffMinutes / 60);

      if (hours > 18) return "Missing sleep data";

      const minutes = diffMinutes % 60;

      return `${hours}h ${minutes}m of sleep`;
    }
  }

  return (
    <Pressable
      style={{
        flexDirection: "row",
        gap: 24,
        alignItems: "center",
        backgroundColor: colorVariant?.background,
        borderColor: colorVariant?.border,
        borderWidth: 1,
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
              lineHeight: 24,
              flexShrink: 1,
            }}
          >
            {data.somethingProductive || data.notes}
          </ThemeText>
        )}
        {sleepTime && (
          <ThemeText
            numberOfLines={2}
            style={{
              marginRight: 16,
              lineHeight: 24,
              flexShrink: 1,
            }}
          >
            {sleepTime}
          </ThemeText>
        )}
      </View>
    </Pressable>
  );
}
