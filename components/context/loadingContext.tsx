import React, { ReactNode, useContext, useEffect, useState } from "react";
import { LoadingComponent } from "../elements/loadingComponent";

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

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000); 

      // Cleanup the timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <LoadingComponent />
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingHolder;

export const useLoadingContext = () => useContext(LoadingContext);
