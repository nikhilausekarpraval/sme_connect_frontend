'use client';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { emptyApplicationContext } from '../Constants/Constants';
import LoginForm from '../Dashboard/Forms/LoginForm';
import { isTokenExpired } from '../Helpers/Helpers';
import { IApplicationContext } from '../Interfaces/Interfaces';
import { useSession } from 'next-auth/react';
import UsersService from '../Services/usersService';

type ApplicationContextType = [IApplicationContext, Dispatch<SetStateAction<IApplicationContext>>];

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [applicationContext, setApplicationContext] = useState<IApplicationContext>(emptyApplicationContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: session } = useSession();
  const userService = useMemo(() => new UsersService(), []);

  useEffect(() => {
    const initializeUserContext = async () => {

      const userEmail = session?.user?.email;
      const accessToken = session?.accessToken;
      
      // Check if we already have valid user data in sessionStorage
      const storedToken = sessionStorage.getItem('accessToken');
      const storedUserContext = sessionStorage.getItem('userContext');

      if ((accessToken && !userEmail && isTokenExpired(accessToken)) && (storedToken && storedUserContext && isTokenExpired(storedToken))) {
        setIsAuthenticated(false);
        return;
      }

      if ((storedToken && storedUserContext && !isTokenExpired(storedToken))) {
        setApplicationContext(JSON.parse(storedUserContext));
        setIsAuthenticated(true);
      }


      try {

        if (userEmail && accessToken && !isTokenExpired(accessToken)) {
          const data = await userService.getCurrentUserContext(userEmail, accessToken);
          if (data?.value?.userContext) {
            setApplicationContext(data.value.userContext);
            sessionStorage.setItem('userContext', JSON.stringify(data.value.userContext));
            setIsAuthenticated(true);
          }
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
      }
    };

    initializeUserContext();
  }, [session, userService]);

  const handleLogin = useCallback((userContext: IApplicationContext) => {
    setApplicationContext(userContext);
    sessionStorage.setItem('userContext', JSON.stringify(userContext));
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <LoginForm handleLogin={handleLogin} />;
  }

  return (
    <ApplicationContext.Provider value={[applicationContext, setApplicationContext]}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
