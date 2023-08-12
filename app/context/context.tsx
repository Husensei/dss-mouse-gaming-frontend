"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  criteria: any;
  setCriteria: Dispatch<SetStateAction<any>>;
  alternative: any;
  setAlternative: Dispatch<SetStateAction<any>>;
}

const globalContext = createContext<ContextProps>({
  criteria: [],
  setCriteria: (): any => [],
  alternative: [],
  setAlternative: (): any => [],
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [criteria, setCriteria] = useState([]);
  const [alternative, setAlternative] = useState([]);

  return (
    <globalContext.Provider
      value={{
        criteria,
        setCriteria,
        alternative,
        setAlternative,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
