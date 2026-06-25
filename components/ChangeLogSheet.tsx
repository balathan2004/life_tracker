import { CHANGELOG } from "@/utils/ChangeLogs";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import SimpleBottomSheet from "./SimpleBottomSheet";
import { CenterText } from "./ui/TextElements";
type Props = {
  isVisible: boolean;
  onDismiss: () => void;
};

const ChangeLogSheet = ({ isVisible, onDismiss }: Props) => {
  const { colors } = useTheme();

  return (
    <SimpleBottomSheet isVisible={isVisible} onDismiss={onDismiss}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 16,

          padding: 16,
        }}
      >
        <AntDesign
          onPress={onDismiss}
          name="close-circle"
          size={24}
          color="black"
        />

        <CenterText style={{ textAlign: "center" }}>Change Logs</CenterText>
        <AntDesign
          onPress={onDismiss}
          name="close-circle"
          size={24}
          color="black"
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 12,
        }}
      >
        {CHANGELOG.map((item, index) => (
          <ChangeLogItem
            key={item.version + index}
            version={item.version}
            date={item.date}
            changes={item.changes}
          />
        ))}
      </ScrollView>
    </SimpleBottomSheet>
  );
};

export default ChangeLogSheet;

type LogProps = {
  version: string;
  date: string;
  changes: string[];
};

export const ChangeLogItem = ({ version, date, changes }: LogProps) => {
  const { colors, fonts } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.primaryContainer,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          ...fonts.bodyMedium,
          color: colors.onBackground,
        }}
      >
        v{version}
      </Text>

      <Text
        style={{
          ...fonts.labelMedium,
          color: colors.onBackground,
          opacity: 0.7,
          marginBottom: 12,
        }}
      >
        {date}
      </Text>

      {changes.map((change) => (
        <Text
          key={change}
          style={{
            ...fonts.bodySmall,
            color: colors.onBackground,
            marginBottom: 6,
          }}
        >
          • {change}
        </Text>
      ))}
    </View>
  );
};
