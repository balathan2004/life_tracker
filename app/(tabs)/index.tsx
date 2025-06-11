import { useDailyLogContext } from "@/components/context/dailyLogContext";
import { useUserContext } from "@/components/context/userContext";
import FoodIconsCard, {
  JournalCard,
} from "@/components/elements/foodIconsCard";
import MoodCard from "@/components/elements/moodAccordition";
import QuoteBar from "@/components/elements/QuoteBar";
import TimeCard from "@/components/elements/wakeUpcard";
import WorkoutCard from "@/components/elements/workout_card";
import { initDailyLog, ResponseConfig } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { SendData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import { Link } from "expo-router";
import moment from "moment";
import { ScrollView, View } from "react-native";

export default function Home() {
  const { dailyLog, setDailyLog } = useDailyLogContext();
  const { userCred } = useUserContext();

  const handleSubmit = async () => {
    if (dailyLog?.wakeUpTime && dailyLog.date && userCred) {
      console.log(dailyLog);
      console.log(userCred);
    }

    const res = (await SendData({
      route: `${domain_url}/api/update_doc`,
      data: { uid: userCred?.uid, data: dailyLog },
    })) as ResponseConfig;
    console.log(dailyLog,userCred)
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
    setDailyLog(initDailyLog());
  };

  const createNewDoc = () => {
    setDailyLog(initDailyLog());
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

      <View style={globalStyles.card}>
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
