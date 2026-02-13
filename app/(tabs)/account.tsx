import { PrimaryButton } from "@/components/ui/buttons";
import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { formatDistanceToNow } from "date-fns";
import { router } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
const image = require("../../assets/images/cat.jpeg");
export default function Account() {
  const { user, handleLogout } = useAuth();

  const { colors } = useTheme();

  const logout = () => {
    router.replace("/(auth)");
    // handleLogout();
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: colors.background,
          marginVertical: 24,
          marginHorizontal: 16,
          flex: 1,
          gap: 16,
          alignItems: "center",
        }}
      >
        <CenterText
          style={{
            paddingVertical: 12,
            fontSize: 24,
          }}
        >
          Your Profile
        </CenterText>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
          }}
          source={image}
        />
        <CenterText
          style={{
            textTransform: "uppercase",
          }}
        >
          {user?.display_name}
        </CenterText>
        <ThemeText>{user?.email}</ThemeText>
        <ThemeText>
          Joined
          {" " + formatDistanceToNow(new Date(user?.created_at))} Ago
        </ThemeText>
        <PrimaryButton onPress={logout}>Logout</PrimaryButton>
      </View>
    </ScrollView>
  );
}
