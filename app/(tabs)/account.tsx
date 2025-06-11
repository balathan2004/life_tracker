import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import {
  allDocResponseConfig,
  dailyLogInterface,
} from "@/components/interfaces";
import { WhiteButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { getData } from "@/components/utils/data_store";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { globalStyles } from "@/styles/global.css";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const { userCred } = useUserContext();

  const [text, setText] = useState("");

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

  const handle = async () => {
    const data = await getData("userCred");
    setText(JSON.stringify(data) || "not value");
  };

  return (
    <View style={globalStyles.safearea}>
      {docs.map((doc) => (
        <DayReport key={doc.wakeUpTime} data={doc} />
      ))}
      <View>
        <CenterText>usercred {JSON.stringify(userCred)}</CenterText>
        <CenterText>{JSON.stringify(text)}</CenterText>
        <WhiteButton onPress={handle}>Click</WhiteButton>
      </View>
    </View>
  );
}
