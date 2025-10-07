import { useAuth } from "@/redux/api/authSlice";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { dailyLogInterface } from "../interfaces";
import { CenterText, ThemeText } from "../ui/TextElements";

type mood = dailyLogInterface["mood"];

export const moods = [
  { label: "\u{1F623}", value: "bad", color: "#F44336" },
  { label: "\u{1F61E}", value: "low", color: "#FF9800" },
  { label: "\u{1F610}", value: "okay", color: "#FFC107" },
  { label: "\u{1F60A}", value: "good", color: "#8BC34A" },
  { label: "\u2728", value: "great", color: "#4CAF50" },
];

export default function MoodCard() {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
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
          paddingVertical: 16,
          textTransform: "capitalize",
        }}
      >
        {" "}
        {`Your Mood - ${mood}`}
      </CenterText>

      <View
        style={{
          flexDirection: "row",
          flex:1,
          flexWrap:"wrap",
          justifyContent: "space-between",
        }}
      >
        {moods.map(({ label, value, color }) => (
          <TouchableOpacity
            style={{
              backgroundColor: mood === value ? "#787F9A" : undefined,
              paddingVertical: 12,
              paddingHorizontal: 8,
              borderRadius: 12,
            }}
            key={label}
            onPress={() => handleSubmit(value as mood)}
          >
            <TouchableOpacity
              onPress={() => handleSubmit(value as mood)}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap:8
              }}
            >
              <ThemeText
                style={{
                  fontSize: 32,
                }}
              >
                {label}
              </ThemeText>
              <ThemeText style={{ textTransform: "capitalize", color: color }}>
                {" " + value}
              </ThemeText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
