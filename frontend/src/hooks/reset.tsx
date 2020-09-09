import React, { createContext, useContext, useCallback, useState } from 'react';

interface ResetContextData {
  resetCreateConsult: boolean;
  resetCreateConsultPage(renderState: boolean): void;
  resetConsultList: boolean;
  resetConsultListPage(renderState: boolean): void;
}

const ResetContext = createContext<ResetContextData>({} as ResetContextData);

const ResetProvider: React.FC = ({ children }) => {
  const [resetCreateConsult, setResetCreateConsult] = useState(false);
  const [resetConsultList, setResetConsultList] = useState(false);

  const resetCreateConsultPage = useCallback((renderState: boolean) => {
    setResetCreateConsult(renderState);
  }, []);

  const resetConsultListPage = useCallback((renderState: boolean) => {
    setResetConsultList(renderState);
  }, []);

  return (
    <ResetContext.Provider
      value={{
        resetCreateConsult,
        resetCreateConsultPage,
        resetConsultList,
        resetConsultListPage,
      }}
    >
      {children}
    </ResetContext.Provider>
  );
};

function useReset(): ResetContextData {
  const context = useContext(ResetContext);

  if (!context) {
    throw new Error('useReset must be used whitin a ResetProvider');
  }

  return context;
}

export { ResetProvider, useReset };
