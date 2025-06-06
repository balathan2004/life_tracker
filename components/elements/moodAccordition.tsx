import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { List, RadioButton } from "react-native-paper";
import { useDailyLogContext } from "../context/dailyLogContext";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

type mood = dailyLogInterface["mood"];

export default function MoodCard() {
  const [expanded, setExpanded] = useState(false);

  const { dailyLog, setDailyLog } = useDailyLogContext();
  const [mood, setMood] = useState<mood | null>(null);

  const moods = [
    { label: "Great ✨", value: "great", color: "#4CAF50" },
    { label: "Good 😊", value: "good", color: "#8BC34A" },
    { label: "Okay 😐", value: "okay", color: "#FFC107" },
    { label: "Low 😞", value: "low", color: "#FF9800" },
    { label: "Bad 😣", value: "bad", color: "#F44336" },
  ];

  const handleSubmit = (value: mood) => {
    if (!mood) {
      return;
    }
    setMood(value);
    setDailyLog((prev) => ({ ...prev, mood:value }));
  };

  useEffect(() => {
    if (dailyLog) {
      setMood(dailyLog.mood);
    }
  }, [dailyLog]);

  return (
    <View>
      <List.Section>
        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <List.Accordion
            title={`Hows Your Mood - ${dailyLog.mood}`}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <View>
              <ThemeText style={{ fontSize: 18 }}>Set Your Mood</ThemeText>
              <RadioButton.Group
                onValueChange={(value) => handleSubmit(value as mood)}
                value={mood || "okay"}
              >
                {moods.map(({ label, value, color }) => (
                  <View key={value} style={styles.radio_item}>
                    <RadioButton value={value} color={color} />
                    <ThemeText>{label}</ThemeText>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
          </List.Accordion>
        </View>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  radio_item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
});
