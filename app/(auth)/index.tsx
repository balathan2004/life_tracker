import { useLoadingContext } from "@/components/context/loadingContext";
import { useUserContext } from "@/components/context/userContext";
import { AuthResponseConfig } from "@/components/interfaces";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { storeData } from "@/components/utils/data_store";
import { SendData } from "@/components/utils/fetching";
import { domain_url } from "@/env";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { setUserCred } = useUserContext();

  const { loading, setLoading } = useLoadingContext();

  const [message, setMessage] = useState("");

  const { colors } = useTheme();

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
    setLoading(true);

    const res = (await SendData({
      route: `${domain_url}/auth/login`,
      data: { ...userData },
    })) as AuthResponseConfig;

    console.log(res);
    setMessage(res.message)
    if (res && res.status == 200 && res.credentials) {
      await storeData({ key: "userCred", value: res.credentials });
      setUserCred(res.credentials);
      router.push('/(tabs)')
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
        <PrimaryButton disabled={loading} onPress={handleSubmit}>
          {"Login"}
        </PrimaryButton>
      </View>
    </View>
  );
}
