import CustomTabView from "@/components/elements/CustomTabView";
import JournalForm from "@/components/forms/JournalForm";
import MealsForm from "@/components/forms/MealsForm";
import WellnessForm from "@/components/forms/WellnessForm";
import { dailyLogInterface } from "@/components/interfaces";
import { useAuth } from "@/redux/api/authSlice";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

type Props = {};
const initialValues: Partial<dailyLogInterface> = {
  isBathTaken: false,
  workout: "",
  bodyMeasurements: {
    height: "",
    weight: "",
  },
};

const Index = (props: Props) => {
  const { width } = useWindowDimensions();

  const { dailyLog } = useAuth();

  const [formValue, setFormValue] = useState(initialValues);

  useEffect(() => {
    if (!dailyLog) return;
    setFormValue((prev) => ({
      bodyMeasurements: dailyLog.bodyMeasurements,
      workout: dailyLog.workout,
      isBathTaken: dailyLog.isBathTaken,
    }));
  }, [dailyLog]);

 

  const data = [
    { title: "Meals", Component: MealsForm },
    { title: "Notes", Component: JournalForm },
    { title: "Health", Component: WellnessForm },
  ];

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={(values) => console.log({ values })}
    >
      <CustomTabView data={data} />
    </Formik>
  );
};

export default Index;
