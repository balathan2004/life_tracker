import { useAuth } from "@/redux/api/authSlice";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { CenterText, ThemeText } from "../ui/TextElements";

type mood = dailyLogInterface["mood"];

export const moods = [
  {
    label: "It’s okay to move slowly today.", // message
    value: "bad",
    color: "#F44336",
    emoji: "\u{1F623}", // old label moved here
    emojiBg: "#FF4C4C",
  },
  {
    label: "Even quiet days count.",
    value: "low",
    color: "#FF9800",
    emoji: "\u{1F61E}",
    emojiBg: "#A770EF",
  },
  {
    label: "You showed up today.",
    value: "okay",
    color: "#FFC107",
    emoji: "\u{1F610}",
    emojiBg: "#00B4D8",
  },
  {
    label: "Today brought some light.",
    value: "good",
    color: "#8BC34A",
    emoji: "\u{1F60A}",
    emojiBg: "#57CC99",
  },
  {
    label: "You’ve earned this moment - let it shine.",
    value: "great",
    color: "#4CAF50",
    emoji: "\u2728",
    emojiBg: "#FFD166",
  },
];

export default function MoodCard() {
  const { dailyLog, updateDailylog } = useAuth();

  const [mood, setMood] = useState<mood>(dailyLog.mood || "okay");

  const currentMoodObj = moods.find((item) => item.value === mood);

  const handleChange = (value: mood) => {
    if (!value || !dailyLog) return;
    console.log("called handleChange", value);
    updateDailylog({ mood: value });
    setMood(value);
  };

  return (
    <View
      style={{
        marginVertical: 12,
      }}
    >
      <CenterText
        style={{
          fontSize: 18,
          marginBottom: 16,
          color: currentMoodObj?.color,
        }}
      >
        {`Your mood - ${mood}`}
      </CenterText>

      <CenterText
        style={{
          fontSize: 14,
          marginBottom: 16,
          textTransform: "capitalize",
        }}
      >
        {currentMoodObj?.label}
      </CenterText>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {moods.map(({ label, value, emoji, color, emojiBg }) => (
          <TouchableOpacity
            key={label}
            onPress={() => handleChange(value as mood)}
            style={{
              backgroundColor: mood === value ? emojiBg : undefined,
              paddingVertical: 2,
              paddingHorizontal: 6,
              borderRadius: 12,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            }}
          >
            <ThemeText
              style={{
                fontSize: mood === value ? 30 : 24,
              }}
            >
              {emoji}
            </ThemeText>
            {mood !== value && (
              <ThemeText style={{ textTransform: "capitalize", color: color }}>
                {value}
              </ThemeText>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
