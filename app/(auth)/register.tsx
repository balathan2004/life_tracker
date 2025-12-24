import { useLoadingContext } from "@/components/context/loadingContext";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useRegisterMutation } from "@/redux/api/authApi";
import { styles } from "@/styles/auth.css";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
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

  const { loading, setLoading } = useLoadingContext();

  const [message, setMessage] = useState("");

  const { colors } = useTheme();

  const [register, { isLoading }] = useRegisterMutation();

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    const res = await register(userData).unwrap();

    setMessage(res.message);
    Toast.show({
      type: "success",
      text1: res.message,
    });
    if (res && res.credentials) {
      router.push("/(tabs)");
    }
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
        }}
      >
        <CenterText style={{ fontSize: 28 }}>Register</CenterText>

        <ThemeText>Email</ThemeText>
        <TextInput
          autoCapitalize="none"
          onChange={(e) => handleInput(e, "email")}
          style={styles.input}
          value={userData.email}
        ></TextInput>

        <ThemeText>Password</ThemeText>
        <TextInput
          autoCapitalize="none"
          onChange={(e) => handleInput(e, "password")}
          style={styles.input}
          value={userData.password}
        ></TextInput>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onPress={handleSubmit}
          >
            Register
          </PrimaryButton>
          <CenterText
            style={{
              marginVertical: 16,
            }}
          >
            Have an account{" "}
            <ThemeText
              style={{ color: colors.primary, textDecorationLine: "underline" }}
            >
              <Link href="/(auth)">Login Here</Link>
            </ThemeText>
          </CenterText>
        </View>
      </View>
    </View>
  );
}
