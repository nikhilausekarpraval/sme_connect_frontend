
import { authScopes, pca } from "@/config/config";
import { isTokenExpired } from "../Helpers/Helpers";
import { apiService } from "./commonService";
import { AuthenticationResult } from "@azure/msal-browser";

let accessToken: string = "";

const authService = {

  async login(username: string, password: string) {

    try {
      const data = await apiService.post("api/Authenticate/login", { username, password })

      accessToken = data?.value.token;

      // set token to next js server 
      await this.storeToken(accessToken);

      sessionStorage.setItem('accessToken', accessToken);

      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },


  async getAccessTokenUsingIdToken(idToken: string) {
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

    }
  },

  async storeToken(token: string) {

    try {
      const response = await fetch('/api/auth/saveToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

    } catch (error) {
      console.error('Error storing token:', error);
    }
  },


  /**
   * Logs out the user by clearing tokens and invalidating the session.
   */
  async logout() {
    try {
      await apiService.post("api/Authenticate/logout", {})
      accessToken = "";
      sessionStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  /**
   * Retrieves the access token. If the token is expired, it tries to refresh it.
   * @returns {string|null} The access token or null if unavailable.
   */
  async getAccessToken() {

    try {
      let token;
      if (accessToken) {
        token = accessToken
      } else {
        token = sessionStorage.getItem("accessToken");
      }
      if (!token) return null;

      //Check if the access token exists and is still valid
      const isExpired = isTokenExpired(accessToken);
      if (isExpired && accessToken) {
        window.location.reload();
      }

      return token

    } catch (ex: any) {
      console.log(ex);
      return "";
    }
  },

  /**
   * Refreshes the access token using the refresh token.
   * @returns {string|null} The new access token or null if refreshing fails.
   * find if token is custom tokne or azure ad then call the api
   */
  async refreshToken() {

    try {

      var isAzureAdToken = isAzureAdToken(sessionStorage.getItem("accessToken")) as any;
      var newToken = "";
      if (isAzureAdToken) {

        newToken = await this.getAzureRefreshToken() as any

      } else {

        newToken = await this.getCustomRefreshToken();

      }

      sessionStorage.setItem("accessToken", newToken);

    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  },

  async getAzureRefreshToken() {
    const account = pca.getAllAccounts()[0];

    if (!account) {
      console.error("No user account found.");
      return null;
    }

    try {
      const response: AuthenticationResult = await pca.acquireTokenSilent({
        ...authScopes,
        account,
      });

      return response.accessToken;
    } catch (error) {
      console.error("Token acquisition failed:", error);
      return null;
    }
  },

  async getCustomRefreshToken() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOT_NET_CORE_URL}api/Authenticate/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: sessionStorage.getItem("accessToken") }),
    });

    if (response.ok) {
      const data = await response.json();
      return data?.value?.data;
    } else {
      console.error("Failed to refresh token");
      return null;
    }
  }
};

export default authService;
