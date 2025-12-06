import { CenterText, ThemeText } from "@/components/ui/TextElements";
import { useAuth } from "@/redux/api/authSlice";
import { formatDistanceToNow } from "date-fns";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
const image = require("../../assets/images/cat.jpeg");

export default function Home() {
  const { userData, handleLogout } = useAuth();

  console.log({ userData });
  const { colors } = useTheme();

  return (
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
        {userData.display_name}
      </CenterText>
      <ThemeText>{userData.email}</ThemeText>
      <ThemeText>
        Joined
        {" " + formatDistanceToNow(new Date(userData?.created_at))} Ago
      </ThemeText>
      {/* <PrimaryButton onPress={handleLogout}>Logout</PrimaryButton> */}
    </View>
  );
}
