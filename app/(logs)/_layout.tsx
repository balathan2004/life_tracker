import CustomHeader from "@/components/elements/CustomHeader";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Daily Log",
          headerTitle: "Daily Log",
          header: (props) => <CustomHeader {...props} />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
