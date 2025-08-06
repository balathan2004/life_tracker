import LoadingHolder from "@/components/context/loadingContext";
import UserHolder from "@/components/context/userContext";
import { darkTheme } from "@/components/ui/themes";
import { store } from "@/features/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={darkTheme}>
      <Provider store={store}>
    
        <LoadingHolder>
          <UserHolder>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />

              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen
                name="(daily_activity)"
                options={{ headerShown: false }}
              />

              <Stack.Screen name="(logs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </UserHolder>
        </LoadingHolder>

        <StatusBar style="auto" />
            <Toast />
      </Provider>
    </ThemeProvider>
  );
}
