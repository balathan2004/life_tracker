// import ThemeInput from "@/components/elements/ThemeInput";
// import { dailyLogInterface } from "@/components/interfaces";
// import { PrimaryButton } from "@/components/ui/buttons";
// import { useAuth } from "@/redux/api/authSlice";
// import { globalStyles } from "@/styles/global.css";
// import { Formik } from "formik";
// import { View } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useTheme } from "react-native-paper";
// import Toast from "react-native-toast-message";

// const renderData: {
//   key: keyof dailyLogInterface | string;
//   label: string;
//   placeholder: string;
// }[] = [
//   {
//     key: "workout",
//     label: "Workout",
//     placeholder: "Type or duration...",
//   },
//   {
//     key: "bodyMeasurements.height",
//     label: "Height",
//     placeholder: "Enter height",
//   },
//   {
//     key: "bodyMeasurements.weight",
//     label: "Weight",
//     placeholder: "Enter weight",
//   },
// ];

// const initialValues: Partial<dailyLogInterface> = {
//   isBathTaken: false,
//   workout: "",
//   bodyMeasurements: {
//     height: "",
//     weight: "",
//   },
// };
// const extractDailyLogValues = (
//   dailyLog: dailyLogInterface
// ): Partial<dailyLogInterface> => ({
//   workout: dailyLog?.workout ?? "",
//   isBathTaken: dailyLog.isBathTaken,
//   bodyMeasurements: {
//     height: dailyLog?.bodyMeasurements?.height ?? "",
//     weight: dailyLog?.bodyMeasurements?.weight ?? "",
//   },
// });

// export default function Home() {
//   const { dailyLog, useUpdateDailyLog } = useAuth();
//   const { colors } = useTheme();



//   const mergedValues = {
//     ...initialValues,
//     ...extractDailyLogValues(dailyLog),
//   };

//   const handleSubmit = (values: Partial<dailyLogInterface>) => {
//     useUpdateDailyLog({
//       ...values,
//     });

//     Toast.show({
//       type: "success",
//       text1: "saved",
//     });
//     console.log({ values });
//   };

//   return (
//     <KeyboardAwareScrollView
//       style={{
//         marginTop: 16,
//         marginBottom: 28,
//         paddingHorizontal: 16,
//       }}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={globalStyles.card}>
//         <Formik
//           enableReinitialize
//           initialValues={mergedValues}
//           onSubmit={(values) => handleSubmit(values)}
//         >
//           {({ handleChange, handleSubmit, values }) => (
//             <View>
//               {renderData.map(({ key, placeholder, label }) => {
//                 return (
//                   <View
//                     key={key}
//                     style={{
//                       marginVertical: 8,
//                     }}
//                   >
//                     <ThemeInput
//                       inputLabel={label}
//                       value={
//                         key.includes(".")
//                           ? key
//                               .split(".")
//                               .reduce((acc, k) => acc?.[k] ?? "", values as any)
//                           : (values as any)[key]
//                       }
//                       onChangeText={handleChange(key)}
//                       placeholder={placeholder}
//                     />
//                   </View>
//                 );
//               })}

//               <PrimaryButton
//                 style={{
//                   marginTop: 24,
//                   borderRadius: 10,
//                 }}
//                 onPress={() => handleSubmit()}
//               >
//                 Submit
//               </PrimaryButton>
//             </View>
//           )}
//         </Formik>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }
