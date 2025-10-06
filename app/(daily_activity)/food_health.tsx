import { dailyLogInterface } from "@/components/interfaces";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { PrimaryButton } from "@/components/ui/buttons";
import { useAuth } from "@/redux/api/authSlice";
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

const renderData: {
  key: keyof dailyLogInterface["meals"];
  placeholder: string;
}[] = [
  {
    key: "breakfast",
    placeholder: "Breakfast",
  },
  { key: "lunch", placeholder: "Lunch" },
  { key: "snacks", placeholder: "Snacks" },
  { key: "dinner", placeholder: "Dinner" },
];

export default function Home() {
  const { dailyLog, useUpdateDailyLog } = useAuth();

  const [meals, setMeals] = useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });

  const handleSubmit = () => {
    const trimmedValue = Object.fromEntries(
      Object.entries(meals).map(([key, value]) => [key, value.trim()])
    ) as dailyLogInterface["meals"];

    useUpdateDailyLog({ meals: trimmedValue });
    Toast.show({
      type: "success",
      text1: "Updated",
    });
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

        {renderData.map(({ key, placeholder }) => {
          return (
            <View key={key}>
              <ThemeText style={{ fontSize: 18 }}>{placeholder}</ThemeText>
              <TextInput
                style={cardStyles.input}
                value={meals[key]}
                onChange={(e) => handleInput(e, key)}
                placeholder={placeholder}
              ></TextInput>
            </View>
          );
        })}

       
        <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
      </View>
    </ScrollView>
  );
}
