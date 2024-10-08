// services/authService.js

import {jwtDecode} from 'jwt-decode';
import { apiService } from "./commonService"

let accessToken : string = "";
let refreshToken : string = "";


interface JwtPayload {
    exp: number;  
    iat?: number; 
    sub?: string; 
    [key: string]:unknown;
  }

const authService = {
  
  async login(username:string, password:string) {
    try {
      const data = await apiService.post("api/Authenticate/login",{ username, password })

      accessToken = data.token;
      
      localStorage.setItem('accessToken', accessToken);

      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Logs out the user by clearing tokens and invalidating the session.
   */
  async logout() {
    try {
      await apiService.post("api/Authenticate/logout",{})

      // Clear tokens
      accessToken = "";
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  /**
   * Retrieves the access token. If the token is expired, it tries to refresh it.
   * @returns {string|null} The access token or null if unavailable.
   */
  async getAccessToken() {
    // Check if the access token exists and is still valid
    const token = accessToken || localStorage.getItem('accessToken');
    // if (!token) return null;

    // const isExpired = authService.isTokenExpired(token);
    // if (isExpired) {
    //   const refreshedToken = await authService.refreshToken();
    //   return refreshedToken;
    // }

    return token;
  },

  /**
   * Refreshes the access token using the refresh token.
   * @returns {string|null} The new access token or null if refreshing fails.
   */
  async refreshToken() {
    const token = refreshToken || localStorage.getItem('refreshToken');
    if (!token) return null;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: token }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      accessToken = data.accessToken;
      localStorage.setItem('accessToken', data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  },

  /**
   * Checks if the token is expired by decoding its payload and comparing the expiry time.
   * @param {string} token
   * @returns {boolean} True if the token is expired, false otherwise.
   */
  isTokenExpired(token :string) {
    try {
      const decodedToken : JwtPayload  = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return true;
    }
  },
};

export default authService;
