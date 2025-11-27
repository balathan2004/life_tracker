import { useField } from "formik";
import React from "react";
import { View, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";
import { ThemeText } from "../ui/TextElements";
import ThemeInput from "./ThemeInput";

export type FormikeInputProps = TextInputProps & {
  formikKey: string;
  onSubmitEditing?: () => void;
  containerStyle?: ViewStyle;
};

const FormikInput = ({
  formikKey,
  label,
  ref,
  onSubmitEditing,
  containerStyle,
  ...rest
}: FormikeInputProps) => {
  const [value] = useField(formikKey);

  return (
    <View style={[{marginBottom:16},containerStyle]}>
      <ThemeText
        style={{
          marginBottom: 8,
        }}
      >
        {label}
      </ThemeText>

      <ThemeInput
        value={value.value?.toString() || ""}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
        {...rest}
      />
    </View>
  );
};

export default FormikInput;
