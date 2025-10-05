import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
