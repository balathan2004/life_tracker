import { cardStyles } from "@/styles/cards.css";
import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { ThemeText } from "../ui/TextElements";

type Props = TextInputProps & {
  inputLabel?: string;
};

const ThemeInput = ({ inputLabel, contentStyle, ...rest }: Props) => {
  const minheight = 38;
  const [height, setHeight] = useState(minheight);

  return (
    <View>
      {inputLabel && (
        <ThemeText style={{ fontSize: 16, marginBottom: 12 }}>
          {inputLabel}
        </ThemeText>
      )}
      <TextInput
        mode="outlined"
        multiline
        onContentSizeChange={({ nativeEvent }) => {
          const newHeight = Math.max(40, nativeEvent.contentSize.height);
          if (Math.abs(newHeight - height) > 5) {
            setHeight(newHeight);
          }
        }}
        contentStyle={[cardStyles.input, { height: height }, contentStyle]}
        {...rest}
      ></TextInput>
    </View>
  );
};

export default ThemeInput;
