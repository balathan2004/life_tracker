import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useLoadingContext } from "../context/loadingContext";

export const LoadingComponent = () => {
  const { loading } = useLoadingContext();

  if (!loading) return null; // Don't render anything if not loading

  return (
    <View style={styles.overlay}>
      <ActivityIndicator animating={true} color={"skyblue"} size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }], // Adjust based on spinner size
    zIndex: 9999,
  },
});
