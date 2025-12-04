import FoodIconsCard, {
  JournalCard,
  WellnessCard,
} from "@/components/elements/foodIconsCard";
import MoodCard from "@/components/elements/moodAccordition";
import QuoteBar from "@/components/elements/QuoteBar";
import TimeCard from "@/components/elements/TimeCard";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { useUpdateDocMutation } from "@/redux/api/crudApi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { isBefore, parseISO, startOfDay } from "date-fns";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
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
      <CenterText variant="bodyMedium" style={{ marginVertical: 8 }}>
        {dailyLog?.date}
      </CenterText>
      <QuoteBar />
      <View
        style={{
          gap: 16,
        }}
      >
        <TimeCard
          icon={(color) => <FontAwesome name="sun-o" size={28} color={color} />}
          label="Wake Up time"
          fieldKey="wakeUpTime"
        />
        <TimeCard
          icon={(color) => (
            <FontAwesome name="moon-o" size={28} color={color} />
          )}
          label="Sleep Time"
          fieldKey="sleepTime"
        />

        <Link href="/(daily_activity)?form=0">
          <Text>Hello</Text>
        </Link>

        <FoodIconsCard />
        <JournalCard />

        <WellnessCard/>

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
              <PrimaryButton onPress={createNewDoc}>
                Create New Log
              </PrimaryButton>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
