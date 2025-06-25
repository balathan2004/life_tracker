import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { useReplyContext } from "../context/replyContext";
import { ThemeText } from "../ui/TextElements";

export const SnackbarReply = () => {
  const { reply, setReply } = useReplyContext();

  const dismissSnackbar = () => {
    setReply("");
  };

  useEffect(() => {
    let timer: number;

    if (reply) {
      timer = setTimeout(() => {}, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [reply]);

  return (
    <View style={styles.snackWrap}>
      <Snackbar
        visible={!!reply}
        onDismiss={dismissSnackbar}
        action={{
          label: "Close",
          onPress: dismissSnackbar,
        }}
        wrapperStyle={{ top: 0 }}
        duration={4000}
        style={styles.snackbar}
      >
        <ThemeText style={{ textTransform: "capitalize" }}>{reply}</ThemeText>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  snackWrap: {
    position: "absolute",
    top: 40,
    left: 10,
    right: 10,
    zIndex: 9999, // ensures it's above everything
  },
  snackbar: {
    backgroundColor: "#333",
    borderRadius: 10,
  },
});
