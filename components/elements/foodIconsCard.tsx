import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";

import { useDailyLog } from "@/features/dispatchActions";
import { useSelector } from "react-redux";
import { dailyLogInterface, foods } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

export default function FoodIconsCard() {
  const  dailyLog  = useDailyLog(useSelector)

  return (
    <View style={styles.container}>
      {(Object.entries(dailyLog.meals) as [foods, string][]).map(
        ([key, value]) => (
          <SingleElement key={key} keyName={key} value={value}></SingleElement>
        )
      )}
    </View>
  );
}

export function JournalCard() {
  const  dailyLog  = useDailyLog(useSelector)

  const keysToExtract: (keyof dailyLogInterface)[] = [
    "somethingProductive",
    "travel",
    "notes",
  ];

  return (
    <View style={styles.container}>
      {keysToExtract.map((key) => (
        <SingleElement
          key={key}
          keyName={key}
          value={dailyLog[key] as string}
        ></SingleElement>
      ))}
    </View>
  );
}

function SingleElement({ keyName, value }: { keyName: string; value: string }) {
  return (
    <View style={styles.single_element}>
      <View style={styles.top_div}>
        <ThemeText style={styles.text}>{keyName}</ThemeText>
        <ThemeText style={styles.text}>{value}</ThemeText>
      </View>
      <View style={styles.bottom_div}>
        {value ? (
          <AntDesign name="check" size={24} color={"white"} />
        ) : (
          <FontAwesome name="remove" size={24} color={"white"} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
  
  },
  single_element: {
    backgroundColor: "gray",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 50,
    borderRadius: 8,
  },
  top_div: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  bottom_div: {
    width: "10%",
  },
  text: {
    flex: 1,
    textTransform: "capitalize",
  },
  icons: {},
});
