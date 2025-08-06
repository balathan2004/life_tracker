import { useLoadingContext } from "@/components/context/loadingContext";
import { useReplyContext } from "@/components/context/replyContext";
import { useUserContext } from "@/components/context/userContext";
import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { storeData } from "@/components/utils/data_store";
import { useRegisterMutation } from "@/features/api/authApi";
import { styles } from "@/styles/auth.css";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { loading, setLoading } = useLoadingContext();
  const { setUserCred } = useUserContext();
  const [message, setMessage] = useState("");
  const { setReply } = useReplyContext();
    const [register,{isLoading}]=useRegisterMutation()

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
    
      const res=(await register(userData).unwrap())

    setMessage(res.message);
    setReply(res.message);
    if (res && res.status == 200 && res.credentials) {
      await storeData({ key: "userCred", value: res.credentials });
      setUserCred(res.credentials);
      router.push("/(tabs)");
    }
  };

    useEffect(()=>{
      setLoading(isLoading)
    },[isLoading])

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
            autoCapitalize="none"
            onChange={(e) => handleInput(e, "email")}
            style={styles.input}
            value={userData.email}
          ></TextInput>
        </View>

        <View>
          <ThemeText>Password</ThemeText>
          <TextInput
            autoCapitalize="none"
            onChange={(e) => handleInput(e, "password")}
            style={styles.input}
            value={userData.password}
          ></TextInput>
        </View>

        <PrimaryButton disabled={loading} onPress={handleSubmit}>
          {"Register"}
        </PrimaryButton>
      </View>
    </View>
  );
}
