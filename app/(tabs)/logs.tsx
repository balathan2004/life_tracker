import DayReport from "@/components/elements/dayReport";
import { dailyLogInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { crudApi, useGetAllDocsQuery } from "@/redux/api/crudApi";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

export default function Logs() {
  const { colors } = useTheme();

  const [cursor, setCursor] = useState("");
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: { data } = {},
    isLoading,
    isFetching,
  } = useGetAllDocsQuery(cursor);

  const [logs, setLogs] = useState<dailyLogInterface[]>([]);

  const onRefresh = async () => {
    setRefreshing(true);
    setLogs([]);
    setCursor("");
    dispatch(crudApi.util.invalidateTags(["logs"]));
  };

  useEffect(() => {
    if (!data) return;

    setRefreshing(false); // ✅ stop spinner when API returns

    setLogs((prev) => {
      const map = new Map(prev.map((item) => [item.date, item]));

      data.forEach((item) => {
        map.set(item.date, item);
      });

      return Array.from(map.values());
    });
  }, [data]);

  const handlePagination = () => {
    console.log("pagination called");

    if (isLoading || isFetching || refreshing) return; // ✅
    if (!logs.length) return;

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
      {isFetching && <ActivityIndicator></ActivityIndicator>}

      <FlatList
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
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.date}
      ></FlatList>
    </View>
  );
}
