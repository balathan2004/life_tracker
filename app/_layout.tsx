import LoadingHolder from "@/components/context/loadingContext";
import ReplyHolder from "@/components/context/replyContext";
import UserHolder from "@/components/context/userContext";
import { SnackbarReply } from "@/components/elements/snackBarPopup";
import { darkTheme } from "@/components/ui/themes";
import { store } from "@/features/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
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
          <ReplyHolder>
            <UserHolder>
              <SnackbarReply />
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
          </ReplyHolder>
        </LoadingHolder>

      <StatusBar style="auto" />
      </Provider>
    </ThemeProvider>
  );
}
