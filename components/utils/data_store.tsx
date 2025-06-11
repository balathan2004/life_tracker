import AsyncStorage from "@react-native-async-storage/async-storage";
import { dailyLogInterface, UserDataInterface } from "../interfaces";

type GetProps = "userCred" | "dailyLog";

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
  return JSON.parse(json) as UserDataInterface | dailyLogInterface;
};
