import { darkTheme } from "@/components/ui/themes";
import { store } from "@/redux/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={darkTheme as any}>
      <ThemeProvider value={darkTheme as any}>
        <Provider store={store}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: darkTheme.colors.background,
              }}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
              >
                <Stack>
                  <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="(daily_activity)"
                    options={{ headerShown: false }}
                  />

                  <Stack.Screen
                    name="(logs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </KeyboardAvoidingView>

              <StatusBar
                backgroundColor={darkTheme.colors.background}
                barStyle={"light-content"}
              />

              <Toast />
            </SafeAreaView>
          </SafeAreaProvider>
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
