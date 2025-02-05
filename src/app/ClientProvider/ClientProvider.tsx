'use client';

import store from '@/store/store';
import React, { ReactNode } from 'react';  
import { Provider } from 'react-redux';      
  
interface ClientProviderProps {
  children: ReactNode; 
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;  
};

export default ClientProvider;
