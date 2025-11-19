// import { dailyLogInterface } from "@/components/interfaces";
// import { CenterText } from "@/components/ui/TextElements";
// import { useAuth } from "@/redux/api/authSlice";
// import { format, formatDate } from "date-fns";
// import { useLocalSearchParams, useNavigation } from "expo-router";
// import React, { useEffect } from "react";
// import { Alert, View } from "react-native";
// import JSONTree from "react-native-json-tree";
// import { Text } from "react-native-paper";

// const formatDateNow = (date: string) => {
//   return formatDate(date, "dd mm yyyy");
// };

// export default function LogDetail() {
//   // all query‑string params arrive here as strings
//   const { doc } = useLocalSearchParams<{ doc: string }>();
//   const navigation = useNavigation();

//   const { userData } = useAuth();
//   // convert the JSON string back into your object
//   const log: dailyLogInterface = JSON.parse(doc);

//   useEffect(() => {
//     if (log?.date) {
//       // Parse the ISO date string directly
//       const formatted = format(new Date(log.date), "dd MMMM");

//       navigation.setOptions({
//         title: `${formatted} Log`,
//       });
//     }
//   }, [log?.date]);

//   const showConfirmation = () => {
//     Alert.alert(
//       "Are you Sure",
//       "This Action cant be undone",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//           onPress: () => console.log("Cancelled"),
//         },
//         {
//           text: "OK",
//           onPress: handleDelete,
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleDelete = async () => {
//     // if (!log || !log.date || !userData) {
//     //   return;
//     // }
//     // const response = (await fetchData(
//     //   `${domain_url}/api/delete_doc?user_id=${userData.uid}&doc_id=${log.date}`
//     // )) as ResponseConfig;
//     //  Toast.show({
//     //       type:"success",
//     //       text1:response.message
//     //     })
//     // if (response.status == 200) {
//     //   router.back();
//     // }
//   };

//   const customGetItemString = (
//     _type: any,
//     _data: any,
//     itemType: React.ReactNode,
//     itemString: string | number | undefined
//   ): React.ReactNode => {

//     console.log({_data,_type,itemType,itemString});
//     // If itemString contains "keys" or "items" (for arrays), return an empty string
//     // Otherwise, return the original itemType and itemString
//     if (
//       typeof itemString === "string" &&
//       (itemString.includes("keys") || itemString.includes("items"))
//     ) {
//       return ""; //itemType; // Only return the type (e.g., "Object", "Array") without the count
//     }
//     if ((itemType == "sleepTime" || itemType == "wakeUpTime") && itemString) {
//       return (
//         <>
//           {itemType} {format(new Date(itemString), "hh mm a")}
//         </>
//       );
//     }
//     return (
//       <>
//         {itemType} {itemString}
//       </>
//     );
//   }; // to hide no of keys in Object the default in modules

//   return (
//     <>
//       <View style={{ padding: 16 }}>
//         <CenterText style={{ fontSize: 20, marginVertical: 10 }}>
//           Daily Log
//         </CenterText>

//         <JSONTree
//           labelRenderer={(label) => (
//             <Text
//               style={{ color: "#FBC02D", textTransform: "capitalize" }}
//               variant="bodySmall"
//             >
//               {label}:
//             </Text>
//           )}
//           valueRenderer={(value) => (
//             <Text
//               style={{
//                 color: "#90CAF9",
//               }}
//               variant="bodySmall"
//             >
//               {value?.toString()}
//             </Text>
//           )}
//           data={{ ...log }}
//           shouldExpandNode={() => true}
//           hideRoot={true}
//           getItemString={customGetItemString}
//         />
//         {/* <PrimaryButton onPress={showConfirmation}>Delete Log</PrimaryButton> */}
//       </View>
//     </>
//   );
// }


import LogListItem from "@/components/elements/LogListItem";
import { dailyLogInterface } from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { format, formatDate } from "date-fns";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";


const formatDateNow = (date: string) => {
  return formatDate(date, "dd mm yyyy");
};

export default function LogDetail() {

  const { doc } = useLocalSearchParams<{ doc: string }>();
  const navigation = useNavigation();



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


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <CenterText style={{ fontSize: 20, marginVertical: 10 }}>
          Daily Log
        </CenterText>

        {Object.entries(log).map(([key, value]) => <LogListItem key={key} label={key as any} value={value} />)}


      </View>
    </ScrollView>
  );
}
