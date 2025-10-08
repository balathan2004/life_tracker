import { dailyLogInterface } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { ThemeText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { globalStyles } from "@/styles/global.css";
import { Formik } from "formik";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

const renderData: {
  key: keyof dailyLogInterface | string;
  placeholder: string;
}[] = [
  {
    key: "notes",
    placeholder: "Notes",
  },
  {
    key: "somethingProductive",
    placeholder: "some productive things",
  },
  {
    key: "travel",
    placeholder: "Travel",
  },
  {
    key: "workout",
    placeholder: "Workout",
  },
  {
    key: "bodyMeasurements.height",
    placeholder: "Height",
  },
  {
    key: "bodyMeasurements.weight",
    placeholder: "Weight",
  },
];

const initialValues: Partial<dailyLogInterface> = {
  notes: "",
  somethingProductive: "",
  travel: "",
  workout: "",
  bodyMeasurements: {
    height: "",
    weight: "",
  },
};
const extractDailyLogValues = (
  dailyLog: dailyLogInterface
): Partial<dailyLogInterface> => ({
  notes: dailyLog?.notes ?? "",
  somethingProductive: dailyLog?.somethingProductive ?? "",
  travel: dailyLog?.travel ?? "",
  workout: dailyLog?.workout ?? "",
  bodyMeasurements: {
    height: dailyLog?.bodyMeasurements?.height ?? "",
    weight: dailyLog?.bodyMeasurements?.weight ?? "",
  },
});

export default function Home() {
  const { dailyLog, useUpdateDailyLog } = useAuth();
  const { colors } = useTheme();

  const mergedValues = {
    ...initialValues,
    ...extractDailyLogValues(dailyLog),
  };

  const handleSubmit = (values: Partial<dailyLogInterface>) => {
    useUpdateDailyLog({
      ...values,
    });

    Toast.show({
      type: "success",
      text1: "saved",
    });
    console.log({ values });
  };

  return (
    <KeyboardAwareScrollView
      style={{
        marginTop:16,
        marginBottom:28,
        paddingHorizontal:16
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={globalStyles.card}>
        <Formik
          enableReinitialize
          initialValues={mergedValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View>
              {renderData.map(({ key, placeholder }) => {
                return (
                  <View
                    key={key}
                    style={{
                      marginVertical: 16,
                    }}
                  >
                    <ThemeText style={{ fontSize: 18, marginBottom: 12 }}>
                      {placeholder}
                    </ThemeText>
                    <TextInput
                      mode="outlined"
                      style={{
                        color: colors.onBackground,
                      }}
                      value={
                        key.includes(".")
                          ? key
                              .split(".")
                              .reduce((acc, k) => acc?.[k] ?? "", values as any)
                          : (values as any)[key]
                      }
                      onChangeText={handleChange(key)}
                      placeholder={placeholder}
                    ></TextInput>
                  </View>
                );
              })}

              <PrimaryButton
                style={{
                  marginTop: 24,
                  borderRadius: 10,
                }}
                onPress={() => handleSubmit()}
              >
                Submit
              </PrimaryButton>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
