import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ResetProvider } from './reset';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ResetProvider>{children}</ResetProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
