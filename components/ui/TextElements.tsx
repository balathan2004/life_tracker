import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

export function ThemeText({ children, style }: Props) {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text }, style]}>{children}</Text>;
}

export function CenterText({ children, style }: Props) {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text, textAlign: "center" }, style]}>
      {children}
    </Text>
  );
}
