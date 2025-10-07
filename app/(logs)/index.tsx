import { dailyLogInterface } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { format, formatDate } from "date-fns";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import JSONTree from "react-native-json-tree";

const formatDateNow = (date: string) => {
  return formatDate(date, "dd mm yyyy");
};

export default function LogDetail() {
  // all query‑string params arrive here as strings
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const navigation = useNavigation();

  const { userData } = useAuth();
  // convert the JSON string back into your object
  const log: dailyLogInterface = JSON.parse(doc);


useEffect(() => {
  if (log?.date) {
    // Parse the ISO date string directly
    const formatted = format(new Date(log.date), "dd MMMM");

    navigation.setOptions({
      title: `${formatted} Log`,
    });
  }
}, [log?.date]);


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
    // if (!log || !log.date || !userData) {
    //   return;
    // }
    // const response = (await fetchData(
    //   `${domain_url}/api/delete_doc?user_id=${userData.uid}&doc_id=${log.date}`
    // )) as ResponseConfig;
    //  Toast.show({
    //       type:"success",
    //       text1:response.message
    //     })
    // if (response.status == 200) {
    //   router.back();
    // }
  };

  const customGetItemString = (
    _type: any,
    _data: any,
    itemType: React.ReactNode,
    itemString: string | number | undefined
  ): React.ReactNode => {
    // If itemString contains "keys" or "items" (for arrays), return an empty string
    // Otherwise, return the original itemType and itemString
    if (
      typeof itemString === "string" &&
      (itemString.includes("keys") || itemString.includes("items"))
    ) {
      return ""; //itemType; // Only return the type (e.g., "Object", "Array") without the count
    }
    return (
      <>
        {itemType} {itemString}
      </>
    );
  }; // to hide no of keys in Object the default in modules

  return (
    <>
      <View style={{ padding: 16 }}>
        <CenterText style={{ fontSize: 20, marginVertical: 10 }}>
          Daily Log
        </CenterText>

        <JSONTree
          data={{ ...log }}
          shouldExpandNode={() => true}
          hideRoot={true}
          getItemString={customGetItemString}
        />
        <PrimaryButton onPress={showConfirmation}>Delete Log</PrimaryButton>
      </View>
    </>
  );
}
