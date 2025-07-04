import { useLoadingContext } from "@/components/context/loadingContext";
import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import {
  allDocResponseConfig,
  dailyLogInterface,
} from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Home() {
  const { userCred } = useUserContext();
  const [docs, setDocs] = useState<dailyLogInterface[]>([]);
  const { loading, setLoading } = useLoadingContext();
  const [refreshing, setRefreshing] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    const response = (await fetchData(
      `${domain_url}/api/get_docs?userId=${userCred?.uid}`
    )) as allDocResponseConfig;
    if (response) {
      const values: dailyLogInterface[] = Object.values(response.docs).sort(
        (a, b) => {
          const dateA = moment(a.date, "DD-MM-YYYY");
          const dateB = moment(b.date, "DD-MM-YYYY");
          return dateB.valueOf() - dateA.valueOf(); // latest first
        }
      );
      setDocs(values);
    }
    setLoading(false);
  };

  useEffect(()=>{
    fetchDocs()
  },[])
  // useFocusEffect(
  //   useCallback(() => {
  //     // This runs every time the screen is focused (opened or came back to)
  //     fetchDocs(); // or any logic you want
  //   }, [])
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocs();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: dailyLogInterface }) => {
    return (
      <View>
        <DayReport data={item} />
      </View>
    );
  };

  return (
    <View style={globalStyles.safearea}>
      {loading ? (
        <CenterText>Loading</CenterText>
      ) : (
        <View>
          <CenterText>Your Logs</CenterText>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={docs}
            renderItem={renderItem}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item.wakeUpTime.toString()}
          ></FlatList>
        </View>
      )}
    </View>
  );
}
