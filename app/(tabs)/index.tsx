import { useUserContext } from "@/components/context/userContext";
import FoodIconsCard, {
  JournalCard,
} from "@/components/elements/foodIconsCard";
import MoodCard from "@/components/elements/moodAccordition";
import QuoteBar from "@/components/elements/QuoteBar";
import TimeCard from "@/components/elements/wakeUpcard";
import WorkoutCard from "@/components/elements/workout_card";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { useUpdateDocMutation } from "@/features/api/crudApi";

import { useDailyLog, useResetDailyLog } from "@/features/dispatchActions";
import { globalStyles } from "@/styles/global.css";
import { Link } from "expo-router";
import moment from "moment";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dailyLog = useDailyLog(useSelector);
  const dispatch = useDispatch();
  const { userCred } = useUserContext();

  const [updateDoc, { isLoading }] = useUpdateDocMutation();

  const handleSubmit = async () => {
    if (!userCred || !dailyLog) {
      return;
    }

    const res = await updateDoc({
      uid: userCred?.uid,
      data: dailyLog,
    }).unwrap();
    Toast.show({
      type: "success",
      text1: res.message,
    });
  };

  const dayCompare = () => {
    const date = dailyLog?.date;
    const savedDate = moment(date, "DD-MM-YYYY").startOf("day");
    const today = moment().startOf("day");

    if (savedDate.isBefore(today)) {
      return true;
    }
    return false;
  };

  const handleDateChange = async () => {
    await handleSubmit();
    useResetDailyLog(dispatch);
  };

  const createNewDoc = () => {
    useResetDailyLog(dispatch);
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
