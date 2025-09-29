import { useEffect, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CenterText } from "../ui/TextElements";

import { updateDailyLog, useAuth } from "@/redux/api/authSlice";
import { globalStyles } from "@/styles/global.css";
import { List } from "react-native-paper";
import { WhiteButton } from "../ui/buttons";
interface TimeCardProps {
  label: "Wake Up time" | "Sleep Time";
  fieldKey: "wakeUpTime" | "sleepTime"; // extend as needed
}

export default function TimeCard({ label, fieldKey }: TimeCardProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { dailyLog } = useAuth();

  const [expanded, setExpanded] = useState(false);

  const onChange = (seletedTime: any) => {
    if (seletedTime) {
      updateDailyLog({ [fieldKey]: seletedTime.getTime() });
    }
    setTime(seletedTime);
    setShowPicker(false);
  };

  const handleCurrentTime = () => {
    const newTime = new Date();
    if (newTime) {
      updateDailyLog({ [fieldKey]: newTime.getTime() });
    }
    setTime(newTime);
  };

  useEffect(() => {
    if (dailyLog && dailyLog[fieldKey]) {
      setTime(new Date(dailyLog[fieldKey]));
    }
  }, [dailyLog]);

  return (
    <View style={globalStyles.wakeupCardAccordion}>
      {!dailyLog[fieldKey] ? (
        <List.Section>
          <List.Accordion
            title={` ${label}  is  not added `}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            <View style={globalStyles.wakeupCard}>
              <CenterText>Set {label}</CenterText>

              <View>
                <WhiteButton onPress={handleCurrentTime}>
                  Use Current Time
                </WhiteButton>

                <WhiteButton onPress={() => setShowPicker((prev) => !prev)}>
                  Set {label} Time
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
              </View>
            </View>
          </List.Accordion>
        </List.Section>
      ) : (
        <View style={globalStyles.wakeupCardAccordion}>
          <List.Section>
            <List.Accordion
              title={` ${label} Time is ${new Date(
                dailyLog[fieldKey]
              ).toLocaleTimeString()}`}
              expanded={expanded}
              onPress={() => setExpanded(!expanded)}
            >
              <View>
                <WhiteButton onPress={handleCurrentTime}>
                  Use Current Time
                </WhiteButton>

                <WhiteButton onPress={() => setShowPicker((prev) => !prev)}>
                  Change {label} Time
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
              </View>
            </List.Accordion>
          </List.Section>
        </View>
      )}
    </View>
  );
}
