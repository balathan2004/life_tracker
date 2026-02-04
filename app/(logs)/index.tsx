import LogListItem from "@/components/elements/LogListItem";
import { formatDailyLogForUI } from "@/components/interfaces";
import { useEncryptMutation, useGetDocByIdQuery } from "@/redux/api/crudApi";
import { format } from "date-fns";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function LogDetail() {
  const { doc_id } = useLocalSearchParams<{ doc_id: string }>();

  const navigation = useNavigation();

  const { data: { data } = {}, isLoading } = useGetDocByIdQuery(doc_id);
  const [encryptDoc] = useEncryptMutation();

  const formattedLog = data ? formatDailyLogForUI(data) : null;

  console.log({ data });

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
      { cancelable: true },
    );
  };

  const handleDelete = async () => {};

  useEffect(() => {
    if (data) {
      if (!data?.encrypted) {
        encryptDoc({ data });
      }

      navigation.setOptions({
        title: `${format(new Date(doc_id), "dd MMM yyyy ")} log`,
      });
    }
  }, [data]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 16,
          paddingHorizontal: 28,
          paddingBottom: 100,
          flex: 1,
        }}
      >
        {formattedLog &&
          Object.entries(formattedLog).map(([key, value]) => (
            <LogListItem key={key} label={key as any} value={value} />
          ))}
      </View>
    </ScrollView>
  );
}
