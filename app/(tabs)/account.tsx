import { TextInputCard } from "@/components/elements/cards";
import { ThemeText } from "@/components/ui/TextElements";
import { globalStyles } from "@/styles/global.css";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={globalStyles.safearea}>
      <Text style={{ color: "white" }}>Hello wolrd</Text>
      <TextInputCard />
      <Link href={"/(auth)"}>
        <Pressable style={{ height: 200, width: 200 }}>
          <ThemeText>Hello</ThemeText>
        </Pressable>
      </Link>
    </View>
  );
}
