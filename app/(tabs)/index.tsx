import QuoteBar from "@/components/elements/QuoteBar";
import WakeUpCard from "@/components/elements/wakeUpcard";
import { globalStyles } from "@/styles/global.css";
import { View } from "react-native";

export default function Home() {
  return (
    <View style={globalStyles.safearea}>
      <QuoteBar />
      <WakeUpCard />
    </View>
  );
}
