// services/apiService.js
import authService from "./authService";



class ApiService {


  baseUrl: string;

  constructor() {
      this.baseUrl = 'http://localhost:9091/';
  }


  /**
   * Fetch data from an API endpoint, with token handling.
   * @param {string} endpoint - The API endpoint to call.
   * @param {object} options - Fetch options, including method and body.
   * @returns {Promise<any>} - The response data.
   */
  // eslint-disable-next-line
  async apiFetch(endpoint: string, options: any) {

  let response : any;
    try {
      
      const token = await authService.getAccessToken();
  
      const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
          cache: 'no-store' 
      };
  
       response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
  
      // Check for 401 and try to refresh the token
      // if (response.status === 401) {
      //   token = await authService.refreshToken();
      //   if (token) {
      //     headers['Authorization'] = `Bearer ${token}`;
      //     response = await fetch(`${this.baseUrl}${endpoint}`, {
      //       ...options,
      //       headers,
      //     });
      //   }
      // }
  
      // Check if response body is present and is JSON

      const contentType = response.headers.get('Content-Type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        return await response.json();
      } else if (response.ok && response.status === 204) {
        // 204 No Content
        return null;
      } else {
        //const errorText = await response.json();
        return response;
        // console.error('API fetch error - non-JSON response:', errorText);
        // throw new Error(`Error: ${errorText}`);
      }
  
    } catch (error:any) {
      console.error('API fetch error:', error);
      throw error;
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
