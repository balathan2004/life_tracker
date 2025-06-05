import React, { ReactNode, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface LoadingContextInterface {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = React.createContext<LoadingContextInterface>({
  loading: false,
  setLoading: () => {},
});

const LoadingHolder = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingHolder;

export const useLoadingContext = () => useContext(LoadingContext);
