// import React, { useEffect, useState } from "react";
// import {
//   NativeSyntheticEvent,
//   TextInputChangeEventData,
//   View
// } from "react-native";
// import { useDailyLogContext } from "../context/dailyLogContext";

// type Meals = {
//   breakfast: string;
//   lunch: string;
//   snacks: string;
//   dinner: string;
// };

// export default function FoodCard() {
//   const { dailyLog, setDailyLog } = useDailyLogContext();

//   const [meals, setMeals] = useState({
//     breakfast: "",
//     lunch: "",
//     snacks: "",
//     dinner: "",
//   });

//   const handleSubmit = () => {
//     const trimmedValue = Object.fromEntries(
//       Object.entries(meals).map(([key, value]) => [key, value.trim()])
//     ) as Meals;

//     setDailyLog((prev) => ({ ...prev, meals: trimmedValue }));
//   };

//   const handleInput = (
//     event: NativeSyntheticEvent<TextInputChangeEventData>,
//     name: string
//   ) => {
//     const value = event.nativeEvent.text;
//     setMeals((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     if (dailyLog) {
//       setMeals(dailyLog.meals);
//     }
//   }, [dailyLog]);

//   return (
//     <View>
//           </View>
//   );
// }
