import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, View } from "react-native";
import { ThemeText } from "../ui/TextElements";
export default function WakeUpCard() {
  const [time, setTime] = useState(new Date()); // default to current date & time
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, seletedTime: any) => {
    console.log(event, seletedTime);
    setTime(seletedTime);
    setShowPicker(false);
  };

  return (
    <View>
      <ThemeText>Hi Login</ThemeText>
      <Button title="login now"></Button>
      <View>
        <ThemeText>add previous time</ThemeText>

        <ThemeText>time is {time.getTime()}</ThemeText>

        <Button
          title="Set Wake-up Time"
          onPress={() => setShowPicker((prev) => !prev)}
        />

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
}





