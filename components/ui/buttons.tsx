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
  const isDisabled = props.disabled;

  return (
    <View>
      <TouchableOpacity
        {...props}
        style={[
          styles.pressable,
          {
            backgroundColor: isDisabled ? "gray" : "skyblue",
            height: 45,
            borderRadius: 8,
          },
        ]}
      >
        <ThemeText style={{ fontSize: 18, fontWeight: "bold" }}>
          {children}
        </ThemeText>
      </TouchableOpacity>
    </View>
  );
}

export function WhiteButton({ children, ...props }: Props) {
  const isDisabled = props.disabled;

  return (
    <View>
      <TouchableOpacity
        {...props}
        style={[
          styles.pressable,
          { backgroundColor: isDisabled ? "gray" : "white", height: 45 ,
            borderRadius: 6,
          },
        ]}
      >
        <ThemeText style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
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
    marginVertical: 5,
  },
});
