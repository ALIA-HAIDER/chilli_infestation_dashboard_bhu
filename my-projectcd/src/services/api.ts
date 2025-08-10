// API endpoints and types for the Chilli Infestation Dashboard
// This file defines the API structure for future backend integration

import type { PlantRequest } from '../types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface PlantRequestsQuery {
  page?: number;
  limit?: number;
  status?: 'pending' | 'reviewed' | 'resolved';
  severity?: 'low' | 'medium' | 'high';
  search?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PlantRequestCreate {
  picture: File | string;
  disease: string;
  solution: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PlantRequestUpdate {
  status?: 'pending' | 'reviewed' | 'resolved';
  disease?: string;
  solution?: string;
  severity?: 'low' | 'medium' | 'high';
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  VERIFY_TOKEN: '/api/auth/verify',
  
  // Plant Requests
  GET_REQUESTS: '/api/requests',
  GET_REQUEST: '/api/requests/:id',
  CREATE_REQUEST: '/api/requests',
  UPDATE_REQUEST: '/api/requests/:id',
  DELETE_REQUEST: '/api/requests/:id',
  
  // Statistics
  GET_STATS: '/api/stats',
  GET_DASHBOARD_DATA: '/api/dashboard',
  
  // File Upload
  UPLOAD_IMAGE: '/api/upload/image',
} as const;

// API Service class for future implementation
export class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = 'http://localhost:3000') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication methods
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.request<void>(API_ENDPOINTS.LOGOUT, {
      method: 'POST',
    });
    this.removeToken();
    return result;
  }

  // Plant request methods
  async getRequests(query?: PlantRequestsQuery): Promise<ApiResponse<PlantRequest[]>> {
    const params = new URLSearchParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `${API_ENDPOINTS.GET_REQUESTS}?${params.toString()}`;
    return this.request<PlantRequest[]>(endpoint);
  }

  async getRequest(id: string): Promise<ApiResponse<PlantRequest>> {
    const endpoint = API_ENDPOINTS.GET_REQUEST.replace(':id', id);
    return this.request<PlantRequest>(endpoint);
  }

  async createRequest(data: PlantRequestCreate): Promise<ApiResponse<PlantRequest>> {
    return this.request<PlantRequest>(API_ENDPOINTS.CREATE_REQUEST, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRequest(
    id: string,
    data: PlantRequestUpdate
  ): Promise<ApiResponse<PlantRequest>> {
    const endpoint = API_ENDPOINTS.UPDATE_REQUEST.replace(':id', id);
    return this.request<PlantRequest>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteRequest(id: string): Promise<ApiResponse<void>> {
    const endpoint = API_ENDPOINTS.DELETE_REQUEST.replace(':id', id);
    return this.request<void>(endpoint, {
      method: 'DELETE',
    });
  }

  // Statistics methods
  async getStats(): Promise<ApiResponse<any>> {
    return this.request<any>(API_ENDPOINTS.GET_STATS);
  }

  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);
    
    return this.request<{ url: string }>(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }
}

// Export a default instance
export const apiService = new ApiService();
