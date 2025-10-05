import { useAuth } from "@/redux/api/authSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

export default function FoodIconsCard() {
  const { dailyLog } = useAuth();

  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryContainer }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <ThemeText variant="bodyLarge">Meals</ThemeText>
        <Link href="/(daily_activity)/food_health">
          <Feather name="edit" size={24} color={colors.primary} />
        </Link>
      </View>
      {Object.entries(dailyLog?.meals).map(([key, value]) => (
        <SingleElement key={key} keyName={key} value={value}></SingleElement>
      ))}
    </View>
  );
}

export function JournalCard() {
  const { dailyLog } = useAuth();
  const { colors } = useTheme();

  const keysToExtract: (keyof dailyLogInterface)[] = [
    "somethingProductive",
    "travel",
    "notes",
  ];

  return (
    <View style={[styles.container,{ backgroundColor: colors.primaryContainer }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <ThemeText variant="bodyLarge">Journal</ThemeText>
        <Link href="/(daily_activity)/notes">
          <Feather name="edit" size={24} color={colors.primary} />{" "}
        </Link>
      </View>
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
    <View
      style={{
        marginVertical: 12,
        borderRadius: 8,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <ThemeText variant="bodyMedium" style={styles.text}>
          {keyName}
        </ThemeText>
        {value ? (
          <AntDesign name="check" size={20} color={"white"} />
        ) : (
          <FontAwesome name="remove" size={20} color={"white"} />
        )}
      </View>
      <View style={{}}>
        <ThemeText variant="labelMedium" style={styles.text}>
          {value}
        </ThemeText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:18,
    paddingVertical:12,
    borderRadius:12
  },

  text: {
    flex: 1,
    textTransform: "capitalize",
  },
  icons: {},
});
