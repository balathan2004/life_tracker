import MyAccordion from "@/components/elements/workout_card";
import { globalStyles } from "@/styles/global.css";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={globalStyles.safearea}>
      <MyAccordion/>
    </View>
  );
}
