import React from "react";
import { useWindowDimensions, View } from "react-native";
import FormMaker, { FormMakerProps } from "../elements/FormMaker";

type Props = {};

const JournalForm = (props: Props) => {
  const { width } = useWindowDimensions();

  const form: FormMakerProps[] = [
    {
      type: "input",
      inputProps: {
        formikKey: "notes",
        label: "Your Thoughts ✨",
        placeholder: "Anything on your mind today?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "somethingProductive",
        label: "Little Wins 🌱",
        placeholder: "What meaningful thing did you get done?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "travel",
        label: "Moments Outside 🚶‍♂️",
        placeholder: "Any places you went or small adventures?",
      },
    },
   
  ];

  return (
    <View style={{ flex: 1, width, paddingHorizontal: 16, marginVertical: 16 }}>
      <FormMaker data={form} />
    </View>
  );
};

export default JournalForm;
