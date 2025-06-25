import { useDailyLogContext } from "@/components/context/dailyLogContext";
import { useReplyContext } from "@/components/context/replyContext";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { PrimaryButton } from "@/components/ui/buttons";
import { cardStyles } from "@/styles/cards.css";
import { globalStyles } from "@/styles/global.css";
import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

export default function Home() {
  const { dailyLog, setDailyLog } = useDailyLogContext();
  const { setReply } = useReplyContext();
  const [data, setData] = useState({
    notes: "",
    somethingProductive: "",
    travel: "",
    height: "",
    weight: "",
  });

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setData((prev) => ({ ...prev, [name]: value }));
    //
  };

  const handleSubmit = () => {
    const { height, weight, ...left } = data;
    setDailyLog((prev) => ({
      ...prev,
      ...left,
      bodyMeasurements: { height, weight },
    }));
    setReply("saved");
  };

  useEffect(() => {
    if (dailyLog) {
      setData((prev) => {
        const { notes, somethingProductive, travel, bodyMeasurements } =
          dailyLog;
        const height = bodyMeasurements?.height ?? "";
        const weight = bodyMeasurements?.weight ?? "";
        return { ...prev, notes, somethingProductive, travel, height, weight };
      });
    }
  }, [dailyLog]);

  return (
    <View style={globalStyles.safearea}>
      <View style={cardStyles.card}>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Any Notes</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={data.notes}
            multiline
            onChange={(e) => handleInput(e, "notes")}
            placeholder="Notes"
          ></TextInput>
        </View>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Something Productive</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={data.somethingProductive}
            multiline
            onChange={(e) => handleInput(e, "somethingProductive")}
            placeholder="Type Here"
          ></TextInput>
        </View>
        <View>
          <ThemeText style={{ fontSize: 18 }}>Travel</ThemeText>
          <TextInput
            style={cardStyles.input}
            value={data.travel}
            onChange={(e) => handleInput(e, "travel")}
            placeholder="Any Travel"
          ></TextInput>
        </View>

        <View style={cardStyles.secondCard}>
          <CenterText>Body Measurements</CenterText>

          <View>
            <ThemeText style={{ fontSize: 18 }}>Height</ThemeText>
            <TextInput
              style={cardStyles.input}
              value={data.height}
              onChange={(e) => handleInput(e, "height")}
              placeholder="Height"
            ></TextInput>
          </View>
          <View>
            <ThemeText style={{ fontSize: 18 }}>Weight</ThemeText>
            <TextInput
              style={cardStyles.input}
              value={data.weight}
              onChange={(e) => handleInput(e, "weight")}
              placeholder="Weight"
            ></TextInput>
          </View>
        </View>

        <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
      </View>
    </View>
  );
}
