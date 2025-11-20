import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { dailyLogInterface } from "../interfaces";
import { ThemeText } from "../ui/TextElements";

type ValueTypes = dailyLogInterface[keyof dailyLogInterface];

type Props = {
  label: keyof dailyLogInterface;
  value: string | string[] | object;
};

const LogListItem = ({ label, value }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        borderLeftWidth: 1,
        borderColor:"#5F606A",
        position: "relative",
        paddingBottom: 8,
      }}
    >
      <View
        style={{
          height: 10,
          width: 10,
          backgroundColor: colors.primary,
          borderRadius: 50,
          position: "absolute",
          left: -5,
          top: 16,
        }}
      />

      <View style={{ marginLeft: 24 }}>
        <ThemeText style={{ textTransform: "capitalize", marginVertical: 12 }}>
          {label}
        </ThemeText>
        <ValueRenderer value={value} />
      </View>
    </View>
  );
};

export default LogListItem;

const ValueRenderer = ({ value }: { value: any }) => {


  const { colors } = useTheme();

  return (
    <View >
      {typeof value == "object" &&
        Object.entries(value).map(([key, element]: [string, any]) => (
          <View style={{ flexDirection: "row", gap: 16,marginVertical:4 }} key={key}>
            <ThemeText style={{
              color: "#B0B300", minWidth: 75
            }}>{key} :</ThemeText>
            <ThemeText>{element}</ThemeText>
          </View>
        ))}
      {typeof value == "string" && <ThemeText style={{color:"#B0B300"}}>{value}</ThemeText>}
      {typeof value == "number" && <ThemeText>{value?.toString()}</ThemeText>}
    </View>
  );
};
