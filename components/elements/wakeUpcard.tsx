import { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDailyLogContext } from "../context/dailyLogContext";
import { CenterText } from "../ui/TextElements";
import { PrimaryButton, WhiteButton } from "../ui/buttons";
export default function WakeUpCard() {
  const [time, setTime] = useState<Date | null>(null); // default to current date & time
  const [showPicker, setShowPicker] = useState(false);
  const { setDailyLog } = useDailyLogContext();

  const onChange = (seletedTime: any) => {
    setTime(seletedTime);
    setShowPicker(false);
  };

  const handleCurrentTime = () => {
    setTime(new Date());
  };

  const handleSubmit = () => {
    if (time) {
      setDailyLog((prev) => ({ ...prev, wakeUpTime: time.getTime() }));
    }
  };

  return (
    <View>
      <CenterText>You Didnt add wake up Time</CenterText>

      <View>
        <CenterText>
          Time is {time ? time.toLocaleString() : "not selected"}
        </CenterText>

        <WhiteButton onPress={handleCurrentTime}>Use Current Time</WhiteButton>

        <WhiteButton onPress={() => setShowPicker((prev) => !prev)}>
          Set Wake-up Time
        </WhiteButton>

        {showPicker && (
          <DateTimePickerModal
            isVisible={showPicker}
            mode="datetime"
            onConfirm={onChange}
            onCancel={() => {}}
            is24Hour={false} // change to true if needed
          />
        )}
        <PrimaryButton disabled={!time} onPress={handleSubmit}>
          Submit
        </PrimaryButton>
      </View>
    </View>
  );
}
