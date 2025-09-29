import { useLoadingContext } from "@/components/context/loadingContext";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useLoginMutation } from "@/redux/api/authApi";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const [login, { isLoading }] = useLoginMutation();

  const { loading, setLoading } = useLoadingContext();

  const [message, setMessage] = useState("");

  const { colors } = useTheme();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handleInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string
  ) => {
    const value = event.nativeEvent.text;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      return;
    }

    const res = await login(userData).unwrap();

    console.log({ res });

    setMessage(res.message);
    Toast.show({
      type: "success",
      text1: res.message,
    });

    if (res && res.credentials) {
      router.push("/(tabs)");
    }
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
        <CenterText style={{ fontSize: 18 }}>{message}</CenterText>

        <View>
          <ThemeText style={{ marginVertical: 5 }}>Email</ThemeText>
          <TextInput
            autoCapitalize="none"
            onChange={(e) => handleInput(e, "email")}
            value={userData.email}
            style={styles.input}
          ></TextInput>
        </View>

        <View>
          <ThemeText style={{ marginVertical: 5 }}>Password</ThemeText>
          <TextInput
            autoCapitalize="none"
            onChange={(e) => handleInput(e, "password")}
            value={userData.password}
            style={styles.input}
          ></TextInput>
        </View>
        <CenterText style={{ marginVertical: 10 }}>
          <Link href={"/forget_password"}> Forget Password</Link>
        </CenterText>
        <PrimaryButton disabled={loading} onPress={handleSubmit}>
          {"Login"}
        </PrimaryButton>
      </View>
    </View>
  );
}
