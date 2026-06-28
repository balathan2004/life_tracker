import { useAuth } from "@/redux/api/authSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemeText } from "../ui/TextElements";

export const FoodIconsCard = () => {
  const { dailyLog } = useAuth();

  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <ThemeText variant="bodyLarge">Meals</ThemeText>
        <Link href="/(daily_activity)?form=0">
          <Feather name="edit" size={24} color={colors.onBackground} />
        </Link>
      </View>
      {Object.entries(dailyLog?.meals).map(([key, value]) => (
        <SingleElement key={key} keyName={key} value={value}></SingleElement>
      ))}
    </View>
  );
};

export function JournalCard() {
  const { dailyLog } = useAuth();
  const { colors } = useTheme();

  const renderData = {
    "Something Productive": dailyLog?.somethingProductive,
    Travel: dailyLog?.travel,
    Notes: dailyLog?.notes,
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <ThemeText variant="bodyLarge">Journal</ThemeText>
        <Link href="/(daily_activity)?form=1">
          <Feather name="edit" size={24} color={colors.onBackground} />{" "}
        </Link>
      </View>
      {Object.entries(renderData).map(([key, value]) => (
        <SingleElement key={key} keyName={key} value={value}></SingleElement>
      ))}
    </View>
  );
}

export function WellnessCard() {
  const { dailyLog } = useAuth();
  const { colors } = useTheme();

  const renderData = {
    Workout: dailyLog?.workout,
    Height: dailyLog?.bodyMeasurements?.height,
    Weight: dailyLog?.bodyMeasurements?.weight,
    BathTaken: dailyLog?.isBathTaken,
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.primaryContainer }]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <ThemeText variant="bodyLarge">Wellness</ThemeText>
        <Link href="/(daily_activity)?form=2">
          <Feather name="edit" size={24} color={colors.onBackground} />{" "}
        </Link>
      </View>
      {Object.entries(renderData).map(([key, value]) => (
        <SingleElement
          key={key}
          keyName={key.includes(".") ? key.split(".")[1] : key}
          value={value?.toString() || typeof value === "boolean" ? value : ""}
        ></SingleElement>
      ))}
    </View>
  );
}

function SingleElement({
  keyName,
  value,
}: {
  keyName: string;
  value: string | boolean;
}) {
  const { colors } = useTheme();

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
        {!!value ? (
          <AntDesign name="check" size={20} color={colors.primary} />
        ) : (
          <FontAwesome name="remove" size={20} color={colors.error} />
        )}
      </View>
      <View style={{}}>
        {typeof value === "boolean" && (
          <ThemeText variant="labelMedium" style={styles.text}>
            {value ? "Done" : "Not Done"}
          </ThemeText>
        )}
        {typeof value === "string" && (
          <ThemeText variant="labelMedium" style={styles.text}>
            {value.trim().length > 0 ? value : "N/A"}
          </ThemeText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },

  text: {
    flex: 1,
    textTransform: "capitalize",
  },
  icons: {},
});
