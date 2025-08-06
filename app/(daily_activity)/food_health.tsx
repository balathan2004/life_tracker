import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { PrimaryButton } from "@/components/ui/buttons";
import { useDailyLog, useUpdateDailyLog } from "@/features/dispatchActions";
import { cardStyles } from "@/styles/cards.css";
import { globalStyles } from "@/styles/global.css";
import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

type Meals = {
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
};

export default function Home() {
  const dailyLog=useDailyLog(useSelector)
  const dispatch=useDispatch()
 


  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });

  const handleSubmit = () => {
    const trimmedValue = Object.fromEntries(
      Object.entries(meals).map(([key, value]) => [key, value.trim()])
    ) as Meals;

    useUpdateDailyLog(dispatch,{  meals:trimmedValue})
   Toast.show({
        type:"success",
        text1:"Updated"
      })
  };

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setMeals((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (dailyLog) {
      setMeals(dailyLog.meals);
    }
  }, [dailyLog]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.safearea}
    >
      <View style={cardStyles.card}>
        <CenterText>Food</CenterText>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Breakfast</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={meals.breakfast}
            onChange={(e) => handleInput(e, "breakfast")}
            placeholder="Breakfast"
          ></TextInput>
        </View>

        <View>
          <ThemeText style={{ fontSize: 18 }}>Lunch</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={meals.lunch}
            onChange={(e) => handleInput(e, "lunch")}
            placeholder="Lunch"
          ></TextInput>
        </View>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Snacks</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={meals.snacks}
            onChange={(e) => handleInput(e, "snacks")}
            placeholder="Snacks"
          ></TextInput>
        </View>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Dinner</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={meals.dinner}
            onChange={(e) => handleInput(e, "dinner")}
            placeholder="Dinner"
          ></TextInput>
        </View>
        <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
      </View>
    </ScrollView>
  );
}
