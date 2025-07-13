import { useDailyLog, useUpdateDailyLog } from "@/features/dispatchActions";
import { styles } from "@/styles/auth.css";
import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemeText } from "../ui/TextElements";
import { PrimaryButton } from "../ui/buttons";

export function TextInputCard() {
const dailyLog=useDailyLog(useSelector)
const dispatch=useDispatch()
  const [data, setData] = useState({
    notes: "",
    somethingProductive: "",
    travel: "",
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
useUpdateDailyLog(dispatch,{...data})
  };

  useEffect(() => {
    if (dailyLog) {
      setData((prev) => {
        const { notes, somethingProductive, travel } = dailyLog;
        return { ...prev, notes, somethingProductive, travel };
      });
    }
  }, [dailyLog]);

  return (
    <View>
      <View>
        <ThemeText>Any Notes</ThemeText>
        <TextInput
          style={styles.input}
          value={data.notes}
          multiline
          onChange={(e) => handleInput(e, "notes")}
        ></TextInput>
      </View>
      <View>
        <ThemeText>Something Productive</ThemeText>
        <TextInput
          style={styles.input}
          value={data.somethingProductive}
          multiline
          onChange={(e) => handleInput(e, "somethingProductive")}
        ></TextInput>
      </View>
      <View>
        <ThemeText>Travel</ThemeText>
        <TextInput
          style={styles.input}
          value={data.travel}
          onChange={(e) => handleInput(e, "travel")}
        ></TextInput>
      </View>
      <PrimaryButton onPress={handleSubmit}>submit</PrimaryButton>
    </View>
  );
}
