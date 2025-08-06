import { useLoadingContext } from "@/components/context/loadingContext";
import { useUserContext } from "@/components/context/userContext";
import DayReport from "@/components/elements/dayReport";
import {
  dailyLogInterface
} from "@/components/interfaces";
import { CenterText } from "@/components/ui/TextElements";
import { useLazyGetAllDocsQuery } from "@/features/api/crudApi";
import { globalStyles } from "@/styles/global.css";
import { useFocusEffect } from "expo-router";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Home() {
  const { userCred } = useUserContext();
  const [docs, setDocs] = useState<dailyLogInterface[]>([]);
  const { loading, setLoading } = useLoadingContext();
  const [refreshing, setRefreshing] = useState(false);
  const [getAllDocs,{isLoading}]=useLazyGetAllDocsQuery()

  const fetchDocs = async () => {

    if(!userCred || !userCred.uid){
      return
    }
 
    const response =await getAllDocs({uid:userCred.uid}).unwrap()

 
    if (response && response.status==200) {
      const values: dailyLogInterface[] = Object.values(response.docs).sort(
        (a, b) => {
          const dateA = moment(a.date, "DD-MM-YYYY");
          const dateB = moment(b.date, "DD-MM-YYYY");
          return dateB.valueOf() - dateA.valueOf(); // latest first
        }
      );
      setDocs(values);
    }

  };

  useEffect(()=>{
    fetchDocs()
    Toast.show({
      type:"success"
      ,text1:"hello wolrd"
    })
  },[])

  useEffect(()=>{
    setLoading(isLoading)
  },[isLoading])

  useFocusEffect(
    useCallback(() => {
      // This runs every time the screen is focused (opened or came back to)
      fetchDocs(); // or any logic you want
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocs();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: dailyLogInterface }) => {
    return (
      <View>
        <DayReport data={item} />
      </View>
    );
  };

  return (
    <View style={globalStyles.safearea}>
    <View>
      <CenterText>{userCred?.display_name}</CenterText>
    </View>
      {loading ? (
        <CenterText>Loading</CenterText>
      ) : (
        <View>
          <CenterText>Your Logs</CenterText>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={docs}
            renderItem={renderItem}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item.wakeUpTime.toString()}
          ></FlatList>
        </View>
      )}
    </View>
  );
}
