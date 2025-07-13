import { useReplyContext } from "@/components/context/replyContext";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { PrimaryButton } from "@/components/ui/buttons";
import { useDailyLog, useUpdateDailyLog } from "@/features/dispatchActions";
import { cardStyles } from "@/styles/cards.css";
import { globalStyles } from "@/styles/global.css";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dailyLog=useDailyLog(useSelector)
  const { setReply } = useReplyContext();
  const [data, setData] = useState({
    notes: "",
    somethingProductive: "",
    travel: "",
    height: "",
    weight: "",
  });
  const dispatch=useDispatch()

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
    useUpdateDailyLog(dispatch,{
       bodyMeasurements: { height, weight },
    })
   
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
    <KeyboardAwareScrollView
      style={globalStyles.safearea}
   
      enableOnAndroid={true}
      extraScrollHeight={100} // pushes the focused input into view
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={globalStyles.card}>
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
      </View>
      <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
    </KeyboardAwareScrollView>
  );
}
