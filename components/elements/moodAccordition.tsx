import { useAuth } from "@/redux/api/authSlice";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { CenterText, ThemeText } from "../ui/TextElements";

type mood = dailyLogInterface["mood"];

export const moods = [
  { label: "\u{1F623}", value: "bad", color: "#F44336", emoji: "#FF4C4C" },
  { label: "\u{1F61E}", value: "low", color: "#FF9800", emoji: "#A770EF" },
  { label: "\u{1F610}", value: "okay", color: "#FFC107", emoji: "#00B4D8" },
  { label: "\u{1F60A}", value: "good", color: "#8BC34A", emoji: "#57CC99" },
  { label: "\u2728", value: "great", color: "#4CAF50", emoji: "#FFD166" },
];

export default function MoodCard() {
  const { dailyLog, useUpdateDailyLog } = useAuth();

  const [mood, setMood] = useState<mood>("okay");

  const handleSubmit = (value: mood) => {
    if (!value || !dailyLog) return;
    useUpdateDailyLog({ mood: value });
    setMood(value);
  };

  useEffect(() => {
    if (dailyLog) {
      setMood(dailyLog.mood);
    }
  }, [dailyLog]);

  return (
    <View
      style={{
        marginVertical: 24,
      }}
    >
      <CenterText
        style={{
          fontSize: 18,
          marginVertical: 16,
          marginBottom: 24,
          textTransform: "capitalize",
        }}
      >
        {" "}
        {`Your Mood - ${mood}`}
      </CenterText>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {moods.map(({ label, value, emoji, color }) => (
          <TouchableOpacity
            key={label}
            onPress={() => handleSubmit(value as mood)}
            style={{
              backgroundColor: mood === value ? emoji : undefined,
              paddingVertical: 2,
              paddingHorizontal: 6,
              borderRadius: 12,
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <ThemeText
              style={{
                fontSize: mood === value ? 36 : 24,
              }}
            >
              {label}
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
