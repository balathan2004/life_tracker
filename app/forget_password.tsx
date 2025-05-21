import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");

  const { colors } = useTheme();

  const handleSubmit = async () => {
    console.log(email);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
    }, [])
  );

  return (
    <View style={globalStyles.safearea}>
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
    </View>
  );
}
