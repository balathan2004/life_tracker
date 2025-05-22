import React, { ReactNode, useContext, useState } from "react";
import { dailyLogInterface, initDailyLog } from "../interfaces";

type dailyLogCredType = dailyLogInterface;

interface DailyLogContextInterface {
  dailyLog: dailyLogCredType;
  setDailyLog: React.Dispatch<React.SetStateAction<dailyLogCredType>>;
}

const DailyLogContext = React.createContext<DailyLogContextInterface>({
  dailyLog: initDailyLog(),
  setDailyLog: () => {},
});

const DailyLogHolder = (children: ReactNode) => {
  const [dailyLog, setDailyLog] = useState<dailyLogCredType>(initDailyLog());

  return (
    <DailyLogContext.Provider value={{ dailyLog, setDailyLog }}>
      {children}
    </DailyLogContext.Provider>
  );
};

export default DailyLogHolder;

export const useDailyLogContext = () => useContext(DailyLogContext);
