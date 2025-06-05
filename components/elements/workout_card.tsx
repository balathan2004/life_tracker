import { cardStyles } from "@/styles/cards.css";
import * as React from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { List } from "react-native-paper";
import { useDailyLogContext } from "../context/dailyLogContext";
import { ThemeText } from "../ui/TextElements";
import { PrimaryButton } from "../ui/buttons";

export default function WorkoutCard() {
  const [expanded, setExpanded] = React.useState(false);

  const { dailyLog, setDailyLog } = useDailyLogContext();
  const [workout, setWorkout] = React.useState("");

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const value = event.nativeEvent.text;
    setWorkout(value);
  };

  const handleSubmit = () => {
    setDailyLog((prev) => ({ ...prev, workout }));
  };

  return (
    <View>
      <List.Section>
        <View
          style={{
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
         
          <List.Accordion
            title={`Workout ${dailyLog.workout}`}
            expanded={expanded}

            onPress={() => setExpanded(!expanded)}
          >
            <View> 
              <ThemeText style={{ fontSize: 18 }}>Add Workout</ThemeText>
              <TextInput
                style={cardStyles.input}
                multiline
                onChange={(e) => handleInput(e)}
                value={workout}
                placeholder="Enter Workout"
              ></TextInput>
            </View>
            <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
          </List.Accordion>
        </View>
      </List.Section>
    </View>
  );
}
