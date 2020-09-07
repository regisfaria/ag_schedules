import React, { createContext, useContext, useCallback, useState } from 'react';

interface ResetContextData {
  resetCreateConsult: boolean;
  resetCreateConsultPage(renderState: boolean): void;
  resetCreateRestTime: boolean;
  resetCreateRestTimePage(renderState: boolean): void;
  renderButtonsDays: boolean;
  renderButtonsDaysPage(renderState: boolean): void;
}

const ResetContext = createContext<ResetContextData>({} as ResetContextData);

const ResetProvider: React.FC = ({ children }) => {
  const [resetCreateConsult, setResetCreateConsult] = useState(false);
  const [resetCreateRestTime, setResetCreateRestTime] = useState(false);
  const [renderButtonsDays, setRenderButtonsDaysPage] = useState(false);

  const resetCreateConsultPage = useCallback((renderState: boolean) => {
    setResetCreateConsult(renderState);
  }, []);

  const resetCreateRestTimePage = useCallback((renderState: boolean) => {
    setResetCreateRestTime(renderState);
  }, []);

  const renderButtonsDaysPage = useCallback((renderState: boolean) => {
    setRenderButtonsDaysPage(renderState);
  }, []);

  return (
    <ResetContext.Provider
      value={{
        resetCreateConsult,
        resetCreateConsultPage,
        resetCreateRestTime,
        resetCreateRestTimePage,
        renderButtonsDays,
        renderButtonsDaysPage,
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
