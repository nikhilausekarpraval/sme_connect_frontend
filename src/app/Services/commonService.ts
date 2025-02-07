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
  async apiFetch(endpoint: string, options: any, serverToken = "", newBaseUrl = "") {
    debugger;
    let response: any;
    try {
      const token = serverToken !== "" ? serverToken : await authService.getAccessToken();
  
      // Check if the request body is FormData
      const isFormData = options?.body instanceof FormData;
  
      // Set headers dynamically
      const headers: any = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        cache: 'no-store',
      };
  
      // Remove 'Content-Type' header for FormData (browser will set it automatically)
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
  
      response = await fetch(
        `${newBaseUrl !== "" ? newBaseUrl : this.baseUrl}${endpoint}`,
        {
          ...options,
          headers,
        }
      );
  
      // Check if response is JSON
      const contentType = response.headers.get('Content-Type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        return await response.json();
      } else if (response.ok && response.status === 204) {
        return null; // 204 No Content
      } else {
        return response; // Return full response if not JSON
      }
  
    } catch (error: any) {
      console.error('API fetch error:', error);
      throw error;
    }
  }
  
  

  // CRUD methods
  async get(endpoint: string,token="",newBaseUrl="") {
    return await this.apiFetch(endpoint, { method: 'GET' },token,newBaseUrl);
  }

  async post(endpoint: string, body: object | FormData, newBaseUrl = "", token="") {
    const isFormData = body instanceof FormData;
  
    return await this.apiFetch(
      endpoint,
      {
        method: 'POST',
        body: isFormData ? body : JSON.stringify(body),
      },
      token,
      newBaseUrl
    );
  }
  
  async put(endpoint: string, body: object,newBaseUrl="") {
    return await this.apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    },"",newBaseUrl);
  }

  async delete(endpoint: string,items:any,newBaseUrl="") {
    return await this.apiFetch(endpoint, { method: 'DELETE',body:JSON.stringify(items) },"",newBaseUrl);
  }
}

export const apiService = new ApiService();
