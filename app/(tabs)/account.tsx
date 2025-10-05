import { CenterText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { View } from "react-native";
import { useTheme } from "react-native-paper";



export default function Home() {
  const { userData } = useAuth();
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        marginVertical: 24,
        marginHorizontal: 16,
        flex: 1,
      }}
    >
      <CenterText
        style={{
          paddingVertical: 12,
        }}
      >
        Your Logs
      </CenterText>
      <CenterText>{userData.display_name}</CenterText>
      <CenterText>{JSON.stringify(userData)}</CenterText>
    </View>
  );
}
