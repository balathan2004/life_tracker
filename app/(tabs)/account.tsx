import { useLoadingContext } from "@/components/context/loadingContext";
import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import {
  allDocResponseConfig,
  dailyLogInterface,
} from "@/components/interfaces";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect } from "expo-router";
import moment from "moment";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Home() {
  const { userCred } = useUserContext();
  const [docs, setDocs] = useState<dailyLogInterface[]>([]);
  const { loading, setLoading } = useLoadingContext();

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
  useFocusEffect(
    useCallback(() => {
      // This runs every time the screen is focused (opened or came back to)
      fetchDocs(); // or any logic you want
    }, [])
  );

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
        <ThemeText>Loading</ThemeText>
      ) : (
        <View>
          <CenterText>Your Logs</CenterText>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={docs}
            renderItem={renderItem}
            keyExtractor={(item) => item.wakeUpTime.toString()}
          ></FlatList>
        </View>
      )}
    </View>
  );
}
