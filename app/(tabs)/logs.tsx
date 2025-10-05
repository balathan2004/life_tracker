import { useLoadingContext } from "@/components/context/loadingContext";
import DayReport from "@/components/elements/dayReport";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { useGetAllDocsQuery } from "@/redux/api/crudApi";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Logs() {
  const { userData } = useAuth();
  const { colors } = useTheme();
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
    <View
      style={{
        backgroundColor: colors.background,
        marginVertical: 12,
        marginHorizontal: 16,
        flex: 1,
      }}
    >
      <CenterText
        style={{
          paddingVertical: 12,
        }}
      >
        Your Logs
      </CenterText>
      <FlatList
        ListHeaderComponent={
          <View>{loading && <CenterText>Loading</CenterText>}</View>
        }
        showsVerticalScrollIndicator={false}
        data={Object.values(docs || {})}
        renderItem={({ item, index }) => {
          return (
            <DayReport key={item.date} data={item} nextDayWakeupTime={null} />
          );
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => item.date}
      ></FlatList>
    </View>
  );
}
