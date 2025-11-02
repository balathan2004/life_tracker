import { MD3DarkTheme } from "react-native-paper";

const fontConfig = {
  default: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    letterSpacing: 0,
  },
  displayLarge: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "400",
    fontSize: 28,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 44,
    letterSpacing: 0,
  },

  bodyLarge: {
    fontFamily: "Poppins-Medium",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: "Poppins-Medium",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: "Poppins-Medium",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 1.5 *16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: "Poppins-Regular",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0a84ff",
    background: "rgb(34, 37, 49)",
    onBackground: "#ffffff",
    surface: "#1c1c1e",
    text: "#ffffff",
    outline: "#333333",
    error: "#ff453a",
    onSurface: "#ffffff",
    primaryContainer:"#141C2F"
  },
  fonts: fontConfig,
};
