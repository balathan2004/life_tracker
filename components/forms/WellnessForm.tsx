import { useFormikContext } from "formik";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import CustomRadio from "../elements/CustomRadio";
import FormMaker, { FormMakerProps } from "../elements/FormMaker";
import { dailyLogInterface } from "../interfaces";

type Props = {};

const WellnessForm = (props: Props) => {
  const { width } = useWindowDimensions();

  const { values, setFieldValue } = useFormikContext<dailyLogInterface>();

  const form: FormMakerProps[] = [
    {
      type: "input",
      inputProps: {
        formikKey: "bodyMeasurements.height",
        label: "Your Height 🌿",
        placeholder: "How tall are you feeling today?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "bodyMeasurements.weight",
        label: "Your Weight 🌼",
        placeholder: "What’s your current weight?",
      },
    },
     {
      type: "input",
      inputProps: {
        formikKey: "workout",
        label: "Movement & Energy 💪",
        placeholder: "How did you move your body today?",
      },
    },
    {
      type: "element",
      Element: () => (
        <CustomRadio
          label="Took bath?"
          value={values.isBathTaken ? "yes" : "no"}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={(value) => {
            setFieldValue("isBathTaken", value == "yes" ? true : false);
          }}
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1, width, paddingHorizontal: 16, marginVertical: 16 }}>
      <FormMaker data={form} />
    </View>
  );
};

export default WellnessForm;
