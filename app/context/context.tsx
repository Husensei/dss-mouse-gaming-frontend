"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  criteria: any;
  setCriteria: Dispatch<SetStateAction<any>>;
  alternative: any;
  setAlternative: Dispatch<SetStateAction<any>>;
  matrix: any;
  setMatrix: Dispatch<SetStateAction<any>>;
  preference: any;
  setPreference: Dispatch<SetStateAction<any>>;
  mappingCriteria: any;
  setMappingCriteria: Dispatch<SetStateAction<any>>;
}

const globalContext = createContext<ContextProps>({
  criteria: [],
  setCriteria: (): any => [],
  alternative: [],
  setAlternative: (): any => [],
  matrix: [],
  setMatrix: (): any => [],
  preference: [],
  setPreference: (): any => [],
  mappingCriteria: [],
  setMappingCriteria: (): any => [],
});

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [criteria, setCriteria] = useState([]);
  const [alternative, setAlternative] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [preference, setPreference] = useState([]);
  const [mappingCriteria, setMappingCriteria] = useState([]);

  return (
    <globalContext.Provider
      value={{
        criteria,
        setCriteria,
        alternative,
        setAlternative,
        matrix,
        setMatrix,
        preference,
        setPreference,
        mappingCriteria,
        setMappingCriteria,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(globalContext);
