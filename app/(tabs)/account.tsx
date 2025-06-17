import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import {
  allDocResponseConfig,
  dailyLogInterface,
} from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { getData } from "@/components/utils/data_store";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect } from "expo-router";
import moment from "moment";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Home() {
  const { userCred } = useUserContext();

  const [text, setText] = useState("");

  const [docs, setDocs] = useState<dailyLogInterface[]>([]);

  const fetchDocs = async () => {
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
      console.log(values);
      setDocs(values);
    }
  };
  useFocusEffect(
    useCallback(() => {
      // This runs every time the screen is focused (opened or came back to)
      fetchDocs(); // or any logic you want
    }, [])
  );

  const handle = async () => {
    const data = await getData("userCred");
    setText(JSON.stringify(data) || "not value");
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
      <View>
        <CenterText>Your Logs</CenterText>
        <FlatList
          data={docs}
          renderItem={renderItem}
          keyExtractor={(item) => item.wakeUpTime.toString()}
        ></FlatList>
      </View>
    </View>
  );
}
