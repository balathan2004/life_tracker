import { useLoadingContext } from "@/components/context/loadingContext";
import DayReport from "@/components/elements/dayReport";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { useGetAllDocsQuery } from "@/redux/api/crudApi";
import { globalStyles } from "@/styles/global.css";
import { isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

function areConsecutiveDays(day1: string | null, day2: string | null) {
  if (!day1 || !day2) return false;

  return isBefore(day1, day2);
}

export default function Home() {
  const { userData } = useAuth();
  const { loading, setLoading } = useLoadingContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: { docs } = {}, isLoading, refetch } = useGetAllDocsQuery();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={globalStyles.safearea}>
      <View>
        <CenterText>{userData?.display_name}</CenterText>
      </View>
      {loading ? (
        <CenterText>Loading</CenterText>
      ) : (
        <View>
          <CenterText>Your Logs</CenterText>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Object.values(docs || {})}
            renderItem={({ item, index }) => {
              // const currentDate = parse(item.date, "dd-MM-yyyy", new Date());
              // const nextDayDoc=index <docs.length-1?docs[index+1]:null

              // const nextDayDate = nextDayDoc
              //   ? parse(nextDayDoc.date, "dd-MM-yyyy", new Date())
              //   : null;

              // const nextDayWakeupTime =
              //   nextDayDate && nextDayDoc && isSameDay(addDays(currentDate, 1), nextDayDate)
              //     ? nextDayDoc.wakeUpTime
              //     : null;

              return (
                <DayReport
                  key={item.date}
                  data={item}
                  nextDayWakeupTime={null}
                />
              );
            }}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item.date}
          ></FlatList>
        </View>
      )}
    </View>
  );
}
