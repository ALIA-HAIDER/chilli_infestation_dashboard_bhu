import { axiosInstance } from '../lib/axiosInstance';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserPlant {
  id: number;
  plant_image: string;
  location: string;
  disease_id: number;
  datetime: string;
}

interface PlantState {
  userPlants: UserPlant[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUserPlants: () => Promise<void>;
  clearError: () => void;
}

export const usePlantStore = create<PlantState>()(
  persist(
    (set) => ({
      userPlants: [],
      isLoading: false,
      error: null,

      clearError: () => {
        set({ error: null });
      },

      fetchUserPlants: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('Fetching user plants from backend...');
          const response = await axiosInstance.get('/get_user_plants');
          console.log('User plants response:', response.data);
          
          set({ 
            userPlants: response.data,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Failed to fetch user plants:', error);
          let errorMessage = 'Failed to fetch user plants';
          
          if (error.response) {
            if (error.response.status === 404) {
              errorMessage = 'No user plants found';
              set({ userPlants: [] }); // Clear plants if none found
            } else if (error.response.data?.error) {
              errorMessage = error.response.data.error;
            } else if (error.response.data?.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.status === 401) {
              errorMessage = 'Authentication required. Please login again.';
            }
          } else if (error.request) {
            errorMessage = 'Unable to connect to server. Please check your connection.';
          }
          
          set({ 
            error: errorMessage,
            isLoading: false 
          });
          throw error;
        }
      },
    }),
    {
      name: 'plant-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        userPlants: state.userPlants 
      }),
    }
  )
);
