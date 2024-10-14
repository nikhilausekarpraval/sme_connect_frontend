'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { IApplicationContext, IUserContext } from '../Interfaces/Interfaces';
import LoginForm from '../Dashboard/Forms/LoginForm';
import { isTokenExpired } from '../Helpers/Helpers';

const AppContext = createContext<IApplicationContext | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [contextData, setContextData] = useState<IApplicationContext | undefined>(undefined);
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
              setContextData(JSON.parse(storedUserContext));
              setIsAuthenticated(true);
            }
        }
      }
  }, []);

  function handleLogin(userContext: IApplicationContext) {
    setContextData(userContext);
    localStorage.setItem('userContext', JSON.stringify(userContext));
    setIsAuthenticated(true);
    console.log("User logged in successfully");
  };


  if (!isAuthenticated) {
    return <LoginForm handleLogin={handleLogin} />;
  } else {
    console.log(contextData)
    return (
      <AppContext.Provider value={contextData}>
        {children}
      </AppContext.Provider>
    );
  }
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
