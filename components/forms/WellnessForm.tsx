import React from "react";
import { useWindowDimensions, View } from "react-native";
import FormMaker, { FormMakerProps } from "../elements/FormMaker";

type Props = {};

const WellnessForm = (props: Props) => {
  const { width } = useWindowDimensions();

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
  ];

  return (
    <View style={{ flex: 1, width, paddingHorizontal: 16, marginVertical: 16 }}>
      <FormMaker data={form} />
    </View>
  );
};

export default WellnessForm;
