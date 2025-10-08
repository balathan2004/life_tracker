import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { ThemeText } from "../ui/TextElements";

type Props = NativeStackHeaderProps;

const CustomHeader = ({ navigation, options, route, back }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flexDirection: "row",
        height: 48,
        alignItems: "center",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: colors.outline,
      }}
    >
      <View
        style={{
          width: 40,
        }}
      >
        {back && <HeaderBackButton onPress={()=>navigation.goBack()} tintColor={colors.onBackground} />}
      </View>
      <View style={{ flex: 1 }}>
        <ThemeText style={{ textAlign: "center" }} variant="displaySmall">
          {options.title}
        </ThemeText>
      </View>
      <View
        style={{
          width: 40,
        }}
      >
        {}
      </View>
    </View>
  );
};

export default CustomHeader;
