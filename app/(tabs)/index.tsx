import FoodIconsCard, { JournalCard } from "@/components/elements/foodIconsCard";
import MoodCard from "@/components/elements/moodAccordition";
import QuoteBar from "@/components/elements/QuoteBar";
import TimeCard from "@/components/elements/wakeUpcard";
import WorkoutCard from "@/components/elements/workout_card";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { useUpdateDocMutation } from "@/redux/api/crudApi";
import { globalStyles } from "@/styles/global.css";
import { isBefore, parseISO, startOfDay } from "date-fns";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Home() {
  const { dailyLog, userData,useResetDailyLog } = useAuth();

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
      style={globalStyles.safearea}
    >
      <CenterText style={{ fontSize: 18, marginVertical: 10 }}>
        {dailyLog?.date}
      </CenterText>
      <QuoteBar />
      <TimeCard label="Wake Up time" fieldKey="wakeUpTime" />
      <TimeCard label="Sleep Time" fieldKey="sleepTime" />

      <View>
        <Link href="/(daily_activity)/food_health">
          <FoodIconsCard />
        </Link>
      </View>

      <View>
        <WorkoutCard />
      </View>

      <View>
        <Link href="/(daily_activity)/notes">
          <JournalCard />
        </Link>
      </View>

      <View>
        <MoodCard />
      </View>

      <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
      {dayCompare() ? (
        <View>
          <PrimaryButton onPress={handleDateChange}>
            Save and Create New Doc
          </PrimaryButton>
          <PrimaryButton onPress={createNewDoc}>Create New Doc</PrimaryButton>
        </View>
      ) : null}
    </ScrollView>
  );
}
