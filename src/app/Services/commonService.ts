// services/apiService.js
import authService from "./authService";



class ApiService {
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

      let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401) {
        // Token might be expired, try to refresh
        token = await authService.refreshToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
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
  get(endpoint: string) {
    return this.apiFetch(endpoint, { method: 'GET' });
  }

  post(endpoint: string, body: object) {
    return this.apiFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint: string, body: object) {
    return this.apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint: string) {
    return this.apiFetch(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
