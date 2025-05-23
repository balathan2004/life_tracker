import { styles } from "@/styles/auth.css";
import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useDailyLogContext } from "../context/dailyLogContext";
import { CenterText, ThemeText } from "../ui/TextElements";
import { PrimaryButton } from "../ui/buttons";

export default function FoodCard() {
  const { dailyLog, setDailyLog } = useDailyLogContext();

  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });

  const handleSubmit = () => {
    setDailyLog((prev) => ({ ...prev, meals: meals }));
  };

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setMeals((prev) => ({ ...prev, [name]: value.trim() }));
  };

  useEffect(() => {
    if (dailyLog) {
      setMeals(dailyLog.meals);
    }
  }, [dailyLog]);

  return (
    <View>
      <CenterText>Food</CenterText>
      <View>
        <ThemeText>breakfast</ThemeText>
        <TextInput
          style={styles.input}
          value={meals.breakfast}
          onChange={(e) => handleInput(e, "breakfast")}
          placeholder="breakfast"
        ></TextInput>
      </View>

      <View>
        <ThemeText>lunch</ThemeText>
        <TextInput
          style={styles.input}
          value={meals.lunch}
          onChange={(e) => handleInput(e, "lunch")}
          placeholder="lunch"
        ></TextInput>
      </View>
      <View>
        <ThemeText>snacks</ThemeText>
        <TextInput
          style={styles.input}
          value={meals.snacks}
          onChange={(e) => handleInput(e, "snacks")}
          placeholder="snacks"
        ></TextInput>
      </View>
      <View>
        <ThemeText>dinner</ThemeText>
        <TextInput
          style={styles.input}
          value={meals.dinner}
          onChange={(e) => handleInput(e, "dinner")}
          placeholder="dinner"
        ></TextInput>
      </View>
      <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
    </View>
  );
}
