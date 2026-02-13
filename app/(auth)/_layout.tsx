import CustomHeader from "@/components/elements/CustomHeader";
import { Stack } from "expo-router";

export default function AuthLayout() {
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

      <Stack.Screen
        name="forget_password"
        options={{
          title: "Forget Password",
          // headerShown: false,
          header: (props) => <CustomHeader {...props} />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
