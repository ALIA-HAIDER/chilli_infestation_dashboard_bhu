import { axiosInstance } from '../lib/axiosInstance';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id?: string;
  username: string;
  email?: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: { username: string; password: string }) => Promise<void>;
  signup: (userData: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,

      initializeAuth: () => {
        const token = localStorage.getItem('token');
        
        if (token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({ isAuthenticated: true, token });
        }
      },

      login: async (userData) => {
        set({ isLoading: true });
        try {
          console.log('Attempting login with:', userData);
          
          const requestData = {
            email: userData.username.trim(), // Backend expects 'email' field
            password: userData.password
          };
          
          const response = await axiosInstance.post('/auth/signin', requestData);
          console.log('Login response:', response.data);
          
          const { token, user } = response.data;
          
          if (token) {
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
          
          set({ 
            isAuthenticated: true, 
            user: user || { username: userData.username },
            token,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Login failed:', error);
          console.error('Error response:', error.response?.data);
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          console.log('Attempting signup with:', userData);
          
          const requestData = {
            name: userData.username.trim(),
            email: userData.email.trim(),
            password: userData.password
          };
          
          console.log('Sending signup request with data:', JSON.stringify(requestData, null, 2));
          const response = await axiosInstance.post('/auth/signup', requestData);
          console.log('Signup response:', response.data);
          
          const { token, user } = response.data;
          
          if (token) {
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
          
          set({ 
            isAuthenticated: true, 
            user: user || { username: userData.username, email: userData.email },
            token,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Signup failed:', error);
          console.error('Error response:', error.response?.data);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          token: null,
          isLoading: false 
        });
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        token: state.token 
      }),
    }
  )
);

