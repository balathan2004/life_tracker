import AsyncStorage from "@react-native-async-storage/async-storage";
import { dailyLogInterface, UserDataInterface } from "../interfaces";

type GetProps = "userCred" | "dailyLog" | "refreshToken";

interface StoreProps {
  key: GetProps;
  value: object;
}

export const storeData = async ({ key, value }: StoreProps) => {
  const json = await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getData = async (key: GetProps) => {
  const json = await AsyncStorage.getItem(key);

  if (!json) return null;
  if (json.startsWith("{") || json.startsWith("[")) {
    return JSON.parse(json) as UserDataInterface | dailyLogInterface;
  }
  return json as string;
};
