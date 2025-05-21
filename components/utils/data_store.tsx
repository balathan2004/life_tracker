import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  key: string;
  value: object;
}

interface GetProps {
  key: string;
}

export const storeData = async ({ key, value }: Props) => {
  const json = await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getData = async ({ key }: GetProps) => {
  const json = await AsyncStorage.getItem(key);

  if (!json) return;
  return JSON.parse(json);
};
