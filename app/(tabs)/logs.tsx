import DayReport from "@/components/elements/dayReport";
import { dailyLogInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { useGetDocsQuery } from "@/redux/api/crudApi";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function Logs() {
  const { colors } = useTheme();

  const [refreshKey, setRefreshKey] = useState(Date.now());
  const [cursor, setCursor] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch, isFetching } = useGetDocsQuery({
    cursor,
    refreshKey,
  });

  const responseData = data?.data;

  const [logs, setLogs] = useState<dailyLogInterface[]>([]);

  const onRefresh = async () => {
    setRefreshing(true);
    setCursor("");
    setRefreshKey(Date.now());

    setLogs([]);

    const data = await refetch();

    data.data?.data.map((item) => item.date);

    setRefreshing(false);
  };

  useEffect(() => {
    if (!responseData) return;

    setLogs((prev) => {
      const map = new Map(prev.map((item) => [item.date, item]));

      responseData.forEach((item) => {
        map.set(item.date, item);
      });

      return Array.from(map.values());
    });
  }, [responseData]);

  const handlePagination = () => {
    if (isLoading || isFetching || refreshing) return; // ✅
    if (!logs.length) return;

    setCursor(logs[logs.length - 1].date);
  };

  return (
    <View
      style={{
        paddingTop: 24,
        backgroundColor: colors.background,
        marginHorizontal: 28,
      }}
    >
      <FlatList
        ListHeaderComponent={() => (
          <>
            <CenterText
              style={{
                paddingBottom: 16,
                fontSize: 22,
              }}
            >
              Your Logs
            </CenterText>
            {isFetching && <ActivityIndicator></ActivityIndicator>}
          </>
        )}
        onEndReached={() => handlePagination()}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        data={logs}
        renderItem={({ item, index }) => {
          return (
            <DayReport key={item.date} data={item} nextDayWakeupTime={null} />
          );
        }}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 24,
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.date}
      ></FlatList>
    </View>
  );
}
