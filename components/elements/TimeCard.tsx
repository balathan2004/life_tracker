import { useAuth } from "@/redux/api/authSlice";
import { addDays, subDays } from "date-fns";
import { ReactNode, useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { PrimaryButton } from "../ui/buttons";
import { ThemeText } from "../ui/TextElements";
interface TimeCardProps {
  label: "Wake Up time" | "Sleep Time";
  fieldKey: "wakeUpTime" | "sleepTime"; // extend as needed
  icon: (color: string) => ReactNode;
}

export default function TimeCard({ label, fieldKey, icon }: TimeCardProps) {
  const { dailyLog, updateDailylog } = useAuth();
  const [showPicker, setShowPicker] = useState(false);
  const value = dailyLog[fieldKey]
    ? new Date(dailyLog[fieldKey]).toLocaleTimeString()
    : "";
  const { colors } = useTheme();

  const onChange = (seletedTime: any) => {
    if (seletedTime) {
      updateDailylog({ [fieldKey]: seletedTime.getTime() });
    }

    setShowPicker(false);
  };

  const handleCurrentTime = () => {
    const newTime = new Date();
    if (newTime) {
      updateDailylog({ [fieldKey]: newTime.getTime() });
    }
  };

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
        {icon(value ? "white" : "#9CA3AF")}
        <View
          style={{
            gap: 16,
          }}
        >
          <ThemeText
            variant="displaySmall"
            style={{
              fontSize: 18,
              lineHeight: 20,
            }}
          >
            {label}
          </ThemeText>
          <ThemeText>{value ? value : `Haven’t added yet`}</ThemeText>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 16,
          marginTop: 12,
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
            backgroundColor: "#5F606A",
          }}
          onPress={() => setShowPicker((prev) => !prev)}
        >
          Pick
        </PrimaryButton>

        {showPicker && (
          <DateTimePickerModal
            isVisible={showPicker}
            mode="datetime"
            date={new Date()}
            design="default"
            onConfirm={onChange}
            minimumDate={subDays(new Date(), 3)}
            maximumDate={addDays(new Date(), 2)}
            onCancel={() => {}}
            is24Hour={false} // change to true if needed
          />
        )}
      </View>
    </View>
  );
}
