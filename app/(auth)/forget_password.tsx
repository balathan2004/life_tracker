import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { styles } from "@/styles/auth.css";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState("");

  const { colors } = useTheme();

  const [sendResetEmail, { isLoading }] = useResetPasswordMutation();
  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Please enter your email",
      });
      return;
    }

    const res = await sendResetEmail({ email })
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: res.message,
        });
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.error || err.data.message,
        });
      });
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
    }, [])
  );

  return (
    <View style={styles.container}>
      <CenterText style={{ fontSize: 20 }}>Reset Password</CenterText>
      <View>
        <ThemeText style={{ marginVertical: 5 }}>Email</ThemeText>
        <TextInput
          onChange={(e) => setEmail(e.nativeEvent.text)}
          value={email}
          style={styles.input}
        ></TextInput>
      </View>

      <CenterText style={{ marginVertical: 10 }}>
        <Link href={"/(auth)"}>Login Here</Link>
      </CenterText>

      <PrimaryButton onPress={handleSubmit}>
        Request Reset Password
      </PrimaryButton>
    </View>
  );
}
