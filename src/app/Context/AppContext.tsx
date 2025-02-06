'use client';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { emptyApplicationContext } from '../Constants/Constants';
import LoginForm from '../Dashboard/Forms/LoginForm';
import { isTokenExpired } from '../Helpers/Helpers';
import { IApplicationContext } from '../Interfaces/Interfaces';

type ApplicationContextType = [IApplicationContext, Dispatch<SetStateAction<IApplicationContext>>];

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [applicationContext, setApplicationContext] = useState<IApplicationContext>(emptyApplicationContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    
    if (!storedToken) {
      setIsAuthenticated(false); 
    }  else {
        if(isTokenExpired(storedToken)){
            setIsAuthenticated(false);
        }else {
            const storedUserContext = sessionStorage.getItem('userContext');
            if (storedUserContext) {
              setApplicationContext(JSON.parse(storedUserContext));
              setIsAuthenticated(true);
            }
        }
      }
  }, []);

  function handleLogin(userContext: IApplicationContext) {
    setApplicationContext(userContext);
    sessionStorage.setItem('userContext', JSON.stringify(userContext));
    setIsAuthenticated(true);
    
  };


  if (!isAuthenticated) {
    return <LoginForm handleLogin={handleLogin} />;
  } else {

    return (
      <ApplicationContext.Provider value={[applicationContext,setApplicationContext]}>
        {children}
      </ApplicationContext.Provider>
    );
  }
}

export function useAppContext() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
