import { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ThemeText } from "../ui/TextElements";
export default function WakeUpCard() {
  const [time, setTime] = useState(new Date()); // default to current date & time
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (seletedTime: any) => {
    console.log( seletedTime);
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
         <DateTimePickerModal
         isVisible={showPicker}
         mode="datetime"
         onConfirm={onChange}
         onCancel={()=>{}}
         is24Hour={false} // change to true if needed
       />
        )}
      </View>
    </View>
  );
}





