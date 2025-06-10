import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import { SnackbarReply } from "@/components/elements/snackBarPopup";
import {
  allDocResponseConfig,
  dailyLogInterface,
} from "@/components/interfaces";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const { userCred } = useUserContext();

  const [docs, setDocs] = useState<dailyLogInterface[]>([]);

  const fetchDocs = async () => {
    const response = (await fetchData(
      `${domain_url}/api/fetch_docs?userId=${userCred?.uid}`
    )) as allDocResponseConfig;
    if (response) {
      const values: dailyLogInterface[] = response.docs.flatMap((obj) =>
        Object.values(obj)
      );
      setDocs(values);
    }
  };

  return (
    <View style={globalStyles.safearea}>
      {docs.map((doc) => (
        <DayReport key={doc.wakeUpTime} data={doc} />
      ))}
      <SnackbarReply />
    </View>
  );
}
