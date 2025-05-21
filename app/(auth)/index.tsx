import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { colors } = useTheme();

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log(userData);
  };

  useFocusEffect(
    useCallback(() => {
      setUserData({ email: "", password: "" });
    }, [])
  );

  return (
    <View style={globalStyles.safearea}>
      <View style={styles.container}>
        <CenterText style={{ fontSize: 20 }}>Login</CenterText>
        <View>
          <ThemeText style={{ marginVertical: 5 }}>Email</ThemeText>
          <TextInput
            onChange={(e) => handleInput(e, "email")}
            value={userData.email}
            style={styles.input}
          ></TextInput>
        </View>

        <View>
          <ThemeText style={{ marginVertical: 5 }}>Password</ThemeText>
          <TextInput
            onChange={(e) => handleInput(e, "password")}
            value={userData.password}
            style={styles.input}
          ></TextInput>
        </View>
        <CenterText style={{ marginVertical: 10 }}>
          <Link href={"/forget_password"}> Forget Password</Link>
        </CenterText>
        <PrimaryButton onPress={handleSubmit}>{"Login"}</PrimaryButton>
      </View>
    </View>
  );
}
