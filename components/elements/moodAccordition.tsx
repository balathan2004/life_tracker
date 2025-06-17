import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { List, RadioButton } from "react-native-paper";
import { useDailyLogContext } from "../context/dailyLogContext";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

type mood = dailyLogInterface["mood"];

 export const moods = [
    { label: "\u2728", value: "great", color: "#4CAF50" },
    { label: "\u{1F60A}", value: "good", color: "#8BC34A" },
    { label: "\u{1F610}", value: "okay", color: "#FFC107" },
    { label: "\u{1F61E}", value: "low", color: "#FF9800" },
    { label: "\u{1F623}", value: "bad", color: "#F44336" },
  ];



export default function MoodCard() {
  const [expanded, setExpanded] = useState(false);

  const { dailyLog, setDailyLog } = useDailyLogContext();
  const [mood, setMood] = useState<mood>("okay");

 
  const handleSubmit = (value: mood) => {
    if (!value || !dailyLog) return;
    setDailyLog((prev) => ({ ...prev, mood: value }));
    setMood(value);
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
            title={`Hows Your Mood - ${mood}`}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <View>
              <ThemeText style={{ fontSize: 18 }}>Set Your Mood</ThemeText>
              <RadioButton.Group
                onValueChange={(value) => handleSubmit(value as mood)}
                value={mood}
              >
                {moods.map(({ label, value, color }) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() => setMood(value as mood)}
                  >
                    <View style={styles.radio_item}>
                      <RadioButton value={value} color={color} />
                      <ThemeText style={{ textTransform: "capitalize" }}>
                        {label + " " + value}
                      </ThemeText>
                    </View>
                  </TouchableOpacity>
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
