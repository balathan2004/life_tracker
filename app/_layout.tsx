import LoadingHolder from "@/components/context/loadingContext";
import { darkTheme } from "@/components/ui/themes";
import { store } from "@/redux/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
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

  const scheme = useColorScheme();

  console.log({ scheme });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={darkTheme}>
      <ThemeProvider value={darkTheme as any}>
        <Provider store={store}>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
              }}
            >
              <LoadingHolder>
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
              </LoadingHolder>
              <StatusBar
                translucent={false}
                backgroundColor={scheme === "dark" ? "black" : "white"}
                style={scheme === "dark" ? "dark" : "light"}
              />

              <Toast />
            </SafeAreaView>
          </SafeAreaProvider>
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
