import { useReplyContext } from "@/components/context/replyContext";
import { useUserContext } from "@/components/context/userContext";
import { dailyLogInterface, ResponseConfig } from "@/components/interfaces";
import { WhiteButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { fetchData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import JSONTree from "react-native-json-tree";

export default function LogDetail() {
  // all query‑string params arrive here as strings
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const navigation = useNavigation();
  const { setReply } = useReplyContext();
  const { userCred } = useUserContext();
  // convert the JSON string back into your object
  const log: dailyLogInterface = JSON.parse(doc);

  useEffect(() => {
    if (log?.date) {
      navigation.setOptions({ title: `date ${log.date}` });
    }
  }, [log.date]);

  const showConfirmation = () => {
    Alert.alert(
      "Are you Sure",
      "This Action cant be undone",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Cancelled"),
        },
        {
          text: "OK",
          onPress: handleDelete,
        },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = async () => {
    if (!log || !log.date || !userCred) {
      return;
    }

    const response = (await fetchData(
      `${domain_url}/api/delete_doc?user_id=${userCred.uid}&doc_id=${log.date}`
    )) as ResponseConfig;

    setReply(response.message);
    if (response.status == 200) {
      router.back();
    }
  };

  return (
    <>
      <View style={{ padding: 16 }}>
        <CenterText style={{ fontSize: 20, marginVertical: 10 }}>
          Daily Log
        </CenterText>

        <JSONTree data={{ ...log }} shouldExpandNode={() => true} />
        <WhiteButton onPress={showConfirmation}>Delete Log</WhiteButton>
      </View>
    </>
  );
}
