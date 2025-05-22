import { styles } from "@/styles/auth.css";
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    View,
} from "react-native";
import { useDailyLogContext } from "../context/dailyLogContext";
import { ThemeText } from "../ui/TextElements";

export function TextInputCard() {
  const { setDailyLog } = useDailyLogContext();

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setDailyLog((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View>
      <View>
        <ThemeText>Add Workout</ThemeText>
        <TextInput
          style={styles.input}
          onChange={(e) => handleInput(e, "workout")}
        ></TextInput>
      </View>
      <View>
        <ThemeText>Any Notes</ThemeText>
        <TextInput
          style={styles.input}
          multiline
          onChange={(e) => handleInput(e, "notes")}
        ></TextInput>
      </View>
      <View>
        <ThemeText>something productive</ThemeText>
        <TextInput
          style={styles.input}
          multiline
          onChange={(e) => handleInput(e, "productive")}
        ></TextInput>
      </View>
      <View>
        <ThemeText>travel</ThemeText>
        <TextInput
          style={styles.input}
          onChange={(e) => handleInput(e, "travel")}
        ></TextInput>
      </View>
    </View>
  );
}
