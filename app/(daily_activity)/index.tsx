import CustomTabView from "@/components/elements/CustomTabView";
import JournalForm from "@/components/forms/JournalForm";
import MealsForm from "@/components/forms/MealsForm";
import WellnessForm from "@/components/forms/WellnessForm";
import { dailyLogInterface } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { useAuth } from "@/redux/api/authSlice";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {};
const initialValues: Partial<dailyLogInterface> = {
  isBathTaken: false,
  workout: "",
  bodyMeasurements: {
    height: "",
    weight: "",
  },
  meals: {
    breakfast: "",
    dinner: "",
    lunch: "",
    snacks: "",
  },
  notes: "",
  somethingProductive: "",
  travel: "",
};

const Index = (props: Props) => {
  const { width } = useWindowDimensions();

  const { dailyLog, useUpdateDailyLog } = useAuth();

  const { form } = useLocalSearchParams<{ form?: string }>();

  const [selectedPage, setSelectedPage] = useState(parseInt(form || "0"));

  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!dailyLog) return;
    setFormValue((prev) => ({
      ...prev,
      bodyMeasurements: dailyLog.bodyMeasurements,
      workout: dailyLog.workout,
      isBathTaken: dailyLog.isBathTaken,
      meals: { ...dailyLog.meals },
      notes: dailyLog.notes,
      somethingProductive: dailyLog.somethingProductive,
    }));
  }, [dailyLog]);

  const data = [
    { title: "Meals", Component: MealsForm },
    { title: "Notes", Component: JournalForm },
    { title: "Health", Component: WellnessForm },
  ];

  const handleSubmit = (values: Partial<dailyLogInterface>) => {
    useUpdateDailyLog(values);
    Toast.show({
      type: "success",
      text1: "Saved",
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit }) => (
        <CustomTabView
          selectedPage={selectedPage}
          data={data}
          commonFooter={() => (
            <View style={{ marginHorizontal: 16 }}>
              <PrimaryButton onPress={() => handleSubmit()}>
                Submit
              </PrimaryButton>
            </View>
          )}
        />
      )}
    </Formik>
  );
};

export default Index;
