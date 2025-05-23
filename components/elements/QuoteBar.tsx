import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { CenterText } from "../ui/TextElements";
import { fetchData } from "../utils/fetching";
export default function QuoteBar() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetchData(
        "https://collab-quotes-server.vercel.app/posts/get_one_random"
      );

      setQuote(res.quote.quote);
    };

    getQuote();
  }, []);

  return (
    <View>
      <CenterText>{quote}</CenterText>
    </View>
  );
}
