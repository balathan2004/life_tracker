import { getIn, useFormikContext } from "formik";
import React from "react";
import { View, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";
import { dailyLogInterface } from "../interfaces";
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
  const { values, setFieldValue } = useFormikContext<dailyLogInterface>();

  const value = getIn(values, formikKey);

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      <ThemeText
        style={{
          marginBottom: 8,
        }}
      >
        {label}
      </ThemeText>

      <ThemeInput
        contentStyle={{ paddingLeft: 4 }}
        value={value?.toString() || ""}
        onSubmitEditing={onSubmitEditing}
        onChangeText={(text) => setFieldValue(formikKey, text)}
        ref={ref}
        {...rest}
      />
    </View>
  );
};

export default FormikInput;
