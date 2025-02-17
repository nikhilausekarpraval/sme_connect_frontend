'use client';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { emptyApplicationContext } from '../Constants/Constants';
import LoginForm from '../Dashboard/Forms/LoginForm';
import { acceptIntegers, isTokenExpired } from '../Helpers/Helpers';
import { IApplicationContext } from '../Interfaces/Interfaces';
import { useSession } from 'next-auth/react';
import UsersService from '../Services/usersService';

type ApplicationContextType = [IApplicationContext, Dispatch<SetStateAction<IApplicationContext>>];

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [applicationContext, setApplicationContext] = useState<IApplicationContext>(emptyApplicationContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: session, status } = useSession();
  const userService = new UsersService();

  useEffect(() => {
    const initializeUserContext = async () => {
      if (session) {
        const userEmail = session?.user?.email;
        const idToken = session?.idToken;
        const accessToken = session?.accessToken;
        console.log(idToken,session)
        
        if (accessToken) {
          try {
            // const accessToken = await getAccessToken();
            if (accessToken) {
              sessionStorage.setItem("accessToken", accessToken);
              console.log("Access Token:", accessToken);

              // Fetch user data using the access token
              await getUsersData(userEmail || "", accessToken);
            }
          } catch (error) {
            console.error("Error fetching access token:", error);
          }
        }
      }

      const storedToken = sessionStorage.getItem('accessToken');
      if (!storedToken) {
        setIsAuthenticated(false);
        return;
      }

      if (isTokenExpired(storedToken)) {
        setIsAuthenticated(false);
      } else {
        const storedUserContext = sessionStorage.getItem('userContext');
        if (storedUserContext) {
          setApplicationContext(JSON.parse(storedUserContext));
          setIsAuthenticated(true);
        }
      }
    };

    initializeUserContext();
  }, [session]);

  const getAccessToken = async (idToken: string) => {
    try {
      const response = await fetch("/api/auth/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();
      return data.accessToken;
    } catch (err) {
      console.error("Error fetching access token:", err);
      return null;
    }
  };

  const getUsersData = async (user: string, token: string) => {
    try {
      const data = await userService.getCurrentUserContext(user, token);
      console.log(data);
      setApplicationContext(JSON.parse(data?.value?.data));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  function handleLogin(userContext: IApplicationContext) {
    setApplicationContext(userContext);
    sessionStorage.setItem('userContext', JSON.stringify(userContext));
    setIsAuthenticated(true);
  }

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
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
}
