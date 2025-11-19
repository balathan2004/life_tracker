import React from "react";
import { View } from "react-native";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

type ValueTypes = dailyLogInterface[keyof dailyLogInterface];

type Props = {
  label: keyof dailyLogInterface;
  value: ValueTypes;
};

const LogListItem = ({ label, value }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        borderLeftWidth: 1,
        position: "relative",
        minHeight: 50,
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: "red",
          borderRadius: 50,
          position: "absolute",
          left: -5,
        }}
      />

      <View style={{ marginLeft: 24 }}>
  
        <ThemeText style={{ textTransform: "capitalize", marginVertical: 16 }}>
          {label}
        </ThemeText>
        <ValueRenderer value={value} />
      </View>
    </View>
  );
};

export default LogListItem;

const ValueRenderer = ({ value }: { value: ValueTypes }) => {
  return (
    <View>
      {typeof value == "object" &&
        Object.entries(([key, value]) => {
          <View key={key}>
            <ThemeText>{key}</ThemeText>
            <ThemeText>{value}</ThemeText>
          </View>;
        })}
      {typeof value == "string" && <ThemeText>{value}</ThemeText>}
      {typeof value=="number" && <ThemeText>{value?.toString()}</ThemeText>}
    </View>
  );
};
