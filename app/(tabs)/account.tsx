import { TextInputCard } from "@/components/elements/cards";
import FoodCard from "@/components/elements/foodCard";
import { globalStyles } from "@/styles/global.css";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={globalStyles.safearea}>
      <TextInputCard />
      <FoodCard/>
    </View>
  );
}
