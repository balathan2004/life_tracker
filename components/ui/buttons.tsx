import { ReactNode } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import { ThemeText } from "./TextElements";

type Props = TouchableOpacityProps & {
  children: ReactNode;
};
export function PrimaryButton({ children, ...props }: Props) {
  return (
    <View>
      <TouchableOpacity
        {...props}
        style={[styles.pressable, { backgroundColor: "skyblue", height: 45 }]}
      >
        <ThemeText style={{ fontSize: 18, fontWeight: "bold" }}>
          {children}
        </ThemeText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
