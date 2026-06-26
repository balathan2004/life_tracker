import React from "react";
import { Modal, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type Props = {
  isVisible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  contentStyle: ViewStyle;
};

const SimpleBottomSheet = ({
  children,
  isVisible,
  onDismiss,
  contentStyle,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Modal visible={isVisible} transparent onDismiss={onDismiss}>
      <View style={[styles.container, { paddingTop: top }]}>
        {/* <Pressable onPress={onDismiss} style={{ flex: 1 }}></Pressable> */}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    minHeight: 200,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
});

export default SimpleBottomSheet;
