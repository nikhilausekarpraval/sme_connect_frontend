// services/apiService.js
import authService from "./authService";



class ApiService {


  baseUrl: string;

  constructor() {
      this.baseUrl = 'http://localhost:3000/';
  }


  /**
   * Fetch data from an API endpoint, with token handling.
   * @param {string} endpoint - The API endpoint to call.
   * @param {object} options - Fetch options, including method and body.
   * @returns {Promise<any>} - The response data.
   */
  // eslint-disable-next-line
  async apiFetch(endpoint: string, options: any) {
    try {
      let token = await authService.getAccessToken();

      const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      let response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        // Token might be expired, try to refresh
        token = await authService.refreshToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
          });
        }
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${endpoint}: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error; // Re-throw the error for higher-level handling
    }
  }

  // CRUD methods
  async get(endpoint: string) {
    return await this.apiFetch(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, body: object) {
    return  await this.apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(endpoint: string, body: object) {
    return await this.apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint: string,items:any) {
    return await this.apiFetch(endpoint, { method: 'DELETE',body:JSON.stringify(items) });
  }
}

export const apiService = new ApiService();
