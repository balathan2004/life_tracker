import { User } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useKeyboardHeight } from "@/components/utils/useKeyboard";
import { useLoginMutation } from "@/redux/api/authApi";
import { styles } from "@/styles/auth.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const height = useKeyboardHeight();

  const [login, { isLoading }] = useLoginMutation();

  const [message, setMessage] = useState("");

  const { colors } = useTheme();

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    const value = event.nativeEvent.text;
    setUserData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    const userCredString = (await AsyncStorage.getItem("userCred")) || "";

    const userCred = userCredString
      ? (JSON.parse(userCredString) as User)
      : null;

    const res = await login(userData)
      .unwrap()
      .then((res) => {
        if (userCred && res.data.user.uid !== userCred.uid) {
          AsyncStorage.removeItem("dailyLog");
        }
        setMessage(res.message);
        Toast.show({
          type: "success",
          text1: res.message,
        });
        router.replace("/(tabs)");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err.error || err.data.message,
        });
        console.log(err);
        setMessage(err.error || err.data.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 16,
        paddingBottom: height,
      }}
    >
      <CenterText style={{ fontSize: 28 }}>Login</CenterText>
      <CenterText style={{ fontSize: 18, textTransform: "capitalize" }}>
        {message}
      </CenterText>

      <ThemeText style={{ marginVertical: 5, fontSize: 16 }}>Email</ThemeText>
      <TextInput
        placeholder="Email address"
        autoCapitalize="none"
        placeholderTextColor="#888"
        onChange={(e) => handleInput(e, "email")}
        value={userData.email}
        style={styles.input}
      ></TextInput>

      <ThemeText style={{ marginVertical: 5, fontSize: 16 }}>
        Password
      </ThemeText>
      <TextInput
        placeholderTextColor="#888"
        placeholder="Password"
        autoCapitalize="none"
        onChange={(e) => handleInput(e, "password")}
        value={userData.password}
        style={styles.input}
      ></TextInput>

      <CenterText style={{ marginVertical: 16, fontSize: 16 }}>
        <Link href={"/forget_password"}> Forget Password</Link>
      </CenterText>

      <PrimaryButton
        loading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit}
      >
        Login
      </PrimaryButton>
      <CenterText
        style={{
          marginVertical: 16,
        }}
      >
        New here{" "}
        <ThemeText
          style={{ color: colors.primary, textDecorationLine: "underline" }}
        >
          <Link href="/(auth)/register">Create Account </Link>
        </ThemeText>
      </CenterText>
    </View>
  );
}
