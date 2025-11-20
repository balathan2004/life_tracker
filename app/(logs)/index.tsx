
import { useLoadingContext } from "@/components/context/loadingContext";
import LogListItem from "@/components/elements/LogListItem";
import { formatDailyLogForUI } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { useGetSingleLogQuery } from "@/redux/api/crudApi";
import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";


export default function LogDetail() {

  const { doc_id } = useLocalSearchParams<{ doc_id: string }>();




  const { data: { data } = {}, isLoading } = useGetSingleLogQuery(doc_id)

  console.log({ data });

  const { setLoading } = useLoadingContext()


  const formattedLog = data ? formatDailyLogForUI(data) : null


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

  };



  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16, paddingHorizontal: 28, paddingBottom: 100 }}>
        <CenterText style={{ fontSize: 20, marginBottom: 24 }}>
          {format(new Date(doc_id), "dd MMMM")} Log
        </CenterText>

        {formattedLog && Object.entries(formattedLog).map(([key, value]) => <LogListItem key={key} label={key as any} value={value} />)}




      </View>
    </ScrollView>
  );
}
