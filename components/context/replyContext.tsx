import React, { ReactNode, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface ReplyContextInterface {
  reply: string;
  setReply: React.Dispatch<React.SetStateAction<string>>;
}

const ReplyContext = React.createContext<ReplyContextInterface>({
  reply: "",
  setReply: () => {},
});

const ReplyHolder = ({ children }: Props) => {
  const [reply, setReply] = useState("");

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export default ReplyHolder;

export const useReplyContext = () => useContext(ReplyContext);
