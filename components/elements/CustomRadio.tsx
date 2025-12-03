import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { ThemeText } from "../ui/TextElements";

type Props = {
  value: string;
  onChange: (value: any) => void;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
};

const CustomRadio = ({ onChange, value, label, options }: Props) => {
  return (
    <RadioButton.Group
      onValueChange={(newValue) => onChange(newValue)}
      value={value}
    >
      {label && <ThemeText>{label}</ThemeText>}
      <View style={{ flexDirection: "row",marginTop:8 }}>
        {options.map((item,index) => (
          <View key={index} style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
           
            <RadioButton value={item.value} />
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

export default CustomRadio;
