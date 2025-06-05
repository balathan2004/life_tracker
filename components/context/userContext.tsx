import React, { ReactNode, useContext, useState } from "react";
import { UserDataInterface } from "../interfaces";



interface Props {
  children: ReactNode;
}


interface UserContextInterface {
  userCred: null | UserDataInterface;
  setUserCred: React.Dispatch<React.SetStateAction<UserDataInterface | null>>;
}

const UserContext = React.createContext<UserContextInterface>({
  userCred: null,
  setUserCred: () => {},
});

const UserHolder = ({children}: Props) => {
  const [userCred, setUserCred] = useState<null | UserDataInterface>(null);

  return (
    <UserContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserHolder;

export const useUserContext = () => useContext(UserContext);
