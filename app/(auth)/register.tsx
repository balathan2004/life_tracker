import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    NativeSyntheticEvent,
    TextInput,
    TextInputChangeEventData,
    View,
} from "react-native";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

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
        <CenterText style={{ fontSize: 20 }}>Register</CenterText>
        <View>
          <ThemeText>Email</ThemeText>
          <TextInput
            onChange={(e) => handleInput(e, "email")}
            style={styles.input}
            value={userData.email}
          ></TextInput>
        </View>

        <View>
          <ThemeText>Password</ThemeText>
          <TextInput
            onChange={(e) => handleInput(e, "password")}
            style={styles.input}
            value={userData.password}
          ></TextInput>
        </View>

        <PrimaryButton onPress={handleSubmit}>{"Register"}</PrimaryButton>
      </View>
    </View>
  );
}
