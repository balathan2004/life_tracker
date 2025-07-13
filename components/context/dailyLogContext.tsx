// import React, { ReactNode, useContext, useEffect, useState } from "react";
// import { dailyLogInterface, initDailyLog } from "../interfaces";
// import { getData, storeData } from "../utils/data_store";
// type dailyLogCredType = dailyLogInterface;

// interface Props {
//   children: ReactNode;
// }

// interface DailyLogContextInterface {
//   dailyLog: dailyLogCredType;
//   setDailyLog: React.Dispatch<React.SetStateAction<dailyLogCredType>>;
// }

// const DailyLogContext = React.createContext<DailyLogContextInterface>({
//   dailyLog: initDailyLog(),
//   setDailyLog: () => {},
// });

// const DailyLogHolder = ({ children }: Props) => {
//   const [dailyLog, setDailyLog] = useState<dailyLogCredType>(initDailyLog());

//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       const stored = (await getData("dailyLog")) as dailyLogCredType | null;
//       if (stored) {
//         setDailyLog(stored);
//       }
//       setLoaded(true);
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     if (loaded) {
//       storeData({ key: "dailyLog", value: dailyLog });
//     }
//   }, [dailyLog, loaded]);

//   return (
//     <DailyLogContext.Provider value={{ dailyLog, setDailyLog }}>
//       {children}
//     </DailyLogContext.Provider>
//   );
// };

// export default DailyLogHolder;

// export const useDailyLogContext = () => useContext(DailyLogContext);
