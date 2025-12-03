import React from "react";
import { useWindowDimensions, View } from "react-native";
import FormMaker, { FormMakerProps } from "../elements/FormMaker";

type Props = {};

const MealsForm = (props: Props) => {
  const { width } = useWindowDimensions();

  const form: FormMakerProps[] = [
    {
      type: "input",
      inputProps: {
        formikKey: "meals.breakfast",
        label: "Morning fuel 🌅",
        placeholder: "What did you enjoy for breakfast?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "meals.lunch",
        label: "Midday meal 🍽️",
        placeholder: "What kept you going for lunch?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "meals.snacks",
        label: "Little boosts ✨",
        placeholder: "Any snacks or small bites?",
      },
    },
    {
      type: "input",
      inputProps: {
        formikKey: "meals.dinner",
        label: "Evening meal 🌙",
        placeholder: "What did you enjoy for dinner?",
      },
    },
  ];

  return (
    <View style={{ flex: 1, width, paddingHorizontal: 16, marginVertical: 16 }}>
      <FormMaker data={form} />
    </View>
  );
};

export default MealsForm;
