'use client';
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IApplicationContext, IUserContext } from '../Interfaces/Interfaces';
import LoginForm from '../Dashboard/Forms/LoginForm';
import { isTokenExpired } from '../Helpers/Helpers';
import { emptyApplicationContext } from '../Constants/Constants';

type ApplicationContextType = [IApplicationContext, Dispatch<SetStateAction<IApplicationContext>>];

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [applicationContext, setApplicationContext] = useState<IApplicationContext>(emptyApplicationContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    
    if (!storedToken) {
      setIsAuthenticated(false); 
    }  else {
        if(isTokenExpired(storedToken)){
            setIsAuthenticated(false);
        }else {
            const storedUserContext = localStorage.getItem('userContext');
            if (storedUserContext) {
              setApplicationContext(JSON.parse(storedUserContext));
              setIsAuthenticated(true);
            }
        }
      }
  }, []);

  function handleLogin(userContext: IApplicationContext) {
    setApplicationContext(userContext);
    localStorage.setItem('userContext', JSON.stringify(userContext));
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
