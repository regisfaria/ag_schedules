import React, { createContext, useContext, useCallback, useState } from 'react';

interface ResetContextData {
  resetCreateConsult: boolean;
  resetCreateConsultPage(renderState: boolean): void;
}

const ResetContext = createContext<ResetContextData>({} as ResetContextData);

const ResetProvider: React.FC = ({ children }) => {
  const [resetCreateConsult, setResetCreateConsult] = useState(false);

  const resetCreateConsultPage = useCallback((renderState: boolean) => {
    setResetCreateConsult(renderState);
  }, []);

  return (
    <ResetContext.Provider
      value={{ resetCreateConsult, resetCreateConsultPage }}
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
