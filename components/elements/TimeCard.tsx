import { useAuth } from "@/redux/api/authSlice";
import { ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { PrimaryButton } from "../ui/buttons";
import { ThemeText } from "../ui/TextElements";
interface TimeCardProps {
  label: "Wake Up time" | "Sleep Time";
  fieldKey: "wakeUpTime" | "sleepTime"; // extend as needed
  icon: ReactNode;
}

export default function TimeCard({ label, fieldKey, icon }: TimeCardProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const { colors } = useTheme();
  const { dailyLog, useUpdateDailyLog } = useAuth();

  const onChange = (seletedTime: any) => {
    if (seletedTime) {
      useUpdateDailyLog({ [fieldKey]: seletedTime.getTime() });
    }
    setTime(seletedTime);
    setShowPicker(false);
  };

  const handleCurrentTime = () => {
    const newTime = new Date();
    if (newTime) {
      useUpdateDailyLog({ [fieldKey]: newTime.getTime() });
    }
    setTime(newTime);
  };

  useEffect(() => {
    if (dailyLog && dailyLog[fieldKey]) {
      setTime(new Date(dailyLog[fieldKey]));
    }
  }, [dailyLog]);

  return (
    <View
      style={{
        marginVertical: 8,
        backgroundColor: colors.primaryContainer,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        {icon}
        <View
          style={{
            gap: 16,
          }}
        >
          <ThemeText
            variant="displaySmall"
            style={{
              fontSize: 20,
              lineHeight: 20,
            }}
          >
            {label}
          </ThemeText>
          <ThemeText>
            {dailyLog[fieldKey]
              ? ` ${label} Time is ${new Date(
                  dailyLog[fieldKey]
                ).toLocaleTimeString()}`
              : `Not added`}
          </ThemeText>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 16,
          marginTop:12
        }}
      >
        <PrimaryButton
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          onPress={handleCurrentTime}
        >
          Current
        </PrimaryButton>

        <PrimaryButton
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          onPress={() => setShowPicker((prev) => !prev)}
        >
          Pick
        </PrimaryButton>

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
  );
}
