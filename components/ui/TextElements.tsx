import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text, TextProps } from "react-native-paper";

type Props = TextProps<any> & {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};
export function ThemeText({ children, style, ...props }: Props) {
  return (
    <Text style={[style]} {...props}>
      {children}
    </Text>
  );
}

export function CenterText({ children, style, ...props }: Props) {
  return (
    <Text style={[{ textAlign: "center" }, style]} {...props}>
      {children}
    </Text>
  );
}
