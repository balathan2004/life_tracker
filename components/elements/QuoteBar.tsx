import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CenterText } from "../ui/TextElements";
import { fetchData } from "../utils/fetching";
export default function QuoteBar() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetchData(
        "https://collab-quotes-server.vercel.app/public/get_one_random"
      );

      console.log(res);

      setQuote(res.quote[0].quote);
    };

    getQuote();
  }, []);

  return (
    <View>
      <CenterText style={{ fontSize: 16, marginVertical: 10 }}>
        {quote}
      </CenterText>
    </View>
  );
}
