import FoodIconsCard, {
  JournalCard,
} from "@/components/elements/foodIconsCard";
import MoodCard from "@/components/elements/moodAccordition";
import QuoteBar from "@/components/elements/QuoteBar";
import TimeCard from "@/components/elements/TimeCard";
import WorkoutCard from "@/components/elements/workout_card";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { useUpdateDocMutation } from "@/redux/api/crudApi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { isBefore, parseISO, startOfDay } from "date-fns";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Home() {
  const { dailyLog, userData, useResetDailyLog } = useAuth();
  const { colors } = useTheme();

  const [updateDoc, { isLoading }] = useUpdateDocMutation();

  const handleSubmit = async () => {
    if (!userData || !dailyLog) {
      return;
    }

    const res = await updateDoc({
      uid: userData?.uid,
      data: dailyLog,
    }).unwrap();
    Toast.show({
      type: "success",
      text1: res.message,
    });
  };

  const dayCompare = () => {
    if (!dailyLog?.date) return false;

    const savedDate = startOfDay(parseISO(dailyLog.date));
    const today = startOfDay(new Date());

    return isBefore(savedDate, today);
  };

  const handleDateChange = async () => {
    await handleSubmit();
    useResetDailyLog();
  };

  const createNewDoc = () => {
    useResetDailyLog();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: colors.background,
        margin: 16,
      }}
    >
      <CenterText style={{ fontSize: 18, marginVertical: 10 }}>
        {dailyLog?.date}
      </CenterText>
      <QuoteBar />
      <View style={{
        gap:16
      }}>
      <TimeCard
        icon={
          <FontAwesome5 name="moon" size={28} color={colors.onBackground} />
        }
        label="Wake Up time"
        fieldKey="wakeUpTime"
      />
      <TimeCard
        icon={
          <FontAwesome name="sun-o" size={28} color={colors.onBackground} />
        }
        label="Sleep Time"
        fieldKey="sleepTime"
      />

      <FoodIconsCard />
      <JournalCard />
      <WorkoutCard />
      <MoodCard />

      <View
        style={{
          gap: 16,
          marginVertical: 12,
        }}
      >
        <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
        {dayCompare() && (
          <>
            <PrimaryButton onPress={handleDateChange}>
              Save and Create
            </PrimaryButton>
            <PrimaryButton onPress={createNewDoc}>Create New Log</PrimaryButton>
          </>
        )}
      </View></View>
    </ScrollView>
  );
}
