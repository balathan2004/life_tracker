import { useLoadingContext } from "@/components/context/loadingContext";
import DayReport from "@/components/elements/dayReport";
import { dailyLogInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { useGetAllDocsQuery } from "@/redux/api/crudApi";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Logs() {
  const { colors } = useTheme();
  const { loading, setLoading } = useLoadingContext();
  const [cursor, setCursor] = useState("")
  const [refreshing, setRefreshing] = useState(false);
  const { data: { data } = {}, isLoading, refetch } = useGetAllDocsQuery(cursor);

  const [logs, setLogs] = useState<dailyLogInterface[]>([])



  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onRefresh = async () => {

    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  useEffect(() => {

    if (!data || data.length <= 0) return

    setLogs(prev => ([...prev.filter(item => !data.includes(item)), ...data]))

  }, [data])


  const handlePagination = () => {
    if (isLoading) return;       // avoid duplicate triggers
    if (!logs || logs.length === 0) return;

    setCursor(logs[logs.length - 1].date);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        marginVertical: 24,
        marginHorizontal: 28,
        flex: 1,
      }}
    >
      <CenterText
        style={{
          paddingVertical: 12,
          marginBottom: 12,
        }}
      >
        Your Logs
      </CenterText>
      <FlatList onEndReached={() => handlePagination()}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        data={Object.values(logs || {})}
        renderItem={({ item, index }) => {
          return (
            <DayReport key={item.date} data={item} nextDayWakeupTime={null} />
          );
        }}
        contentContainerStyle={{
          gap: 16,
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.date}
      ></FlatList>
    </View>
  );
}
