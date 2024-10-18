// services/authService.js

import {jwtDecode} from 'jwt-decode';
import { apiService } from "./commonService"
import { JwtPayload } from '../Interfaces/Interfaces';

let accessToken : string = "";
let refreshToken : string = "";


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

    try{
      var token;
      if(accessToken){
        token = accessToken
      }else {
        token = localStorage.getItem("accessToken");
      }
      // if (!token) return null;
  
      // Check if the access token exists and is still valid
      // const isExpired = authService.isTokenExpired(token);
      // if (isExpired) {
      //   const refreshedToken = await authService.refreshToken();
      //   return refreshedToken;
      // }
      return token
    }catch(ex:any){
        console.log(ex);
        return "";
    }
  },

  /**
   * Refreshes the access token using the refresh token.
   * @returns {string|null} The new access token or null if refreshing fails.
   */
  async refreshToken() {
    const token = this.getAccessToken();
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

};

export default authService;
