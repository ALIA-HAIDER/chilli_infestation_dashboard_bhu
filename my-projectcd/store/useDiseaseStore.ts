import { axiosInstance } from '../lib/axiosInstance';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Disease {
  id: number;
  name: string;
  chategory: string; // Using 'chategory' to match backend spelling
  solution: string;
  created_at?: string;
  updated_at?: string;
}

interface DiseaseState {
  diseases: Disease[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDiseases: () => Promise<void>;
  populateDiseases: () => Promise<void>;
  updateDisease: (diseaseId: number, solution: string) => Promise<void>;
  deleteDisease: (diseaseId: number) => Promise<void>;
  clearAllDiseases: () => Promise<void>;
  clearError: () => void;
}

export const useDiseaseStore = create<DiseaseState>()(
  persist(
    (set, get) => ({
      diseases: [],
      isLoading: false,
      error: null,

      clearError: () => {
        set({ error: null });
      },

      fetchDiseases: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('Fetching diseases from backend...');
          const response = await axiosInstance.get('/get_diseases');
          console.log('Diseases response:', response.data);
          
          set({ 
            diseases: response.data,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Failed to fetch diseases:', error);
          let errorMessage = 'Failed to fetch diseases';
          
          if (error.response) {
            if (error.response.status === 404) {
              errorMessage = 'No diseases found';
              set({ diseases: [] }); // Clear diseases if none found
            } else if (error.response.data?.error) {
              errorMessage = error.response.data.error;
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

      populateDiseases: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('Populating diseases...');
          const response = await axiosInstance.post('/populate_diseases');
          console.log('Populate diseases response:', response.data);
          
          // After populating, fetch the updated list
          await get().fetchDiseases();
          
          set({ isLoading: false });
        } catch (error: any) {
          console.error('Failed to populate diseases:', error);
          let errorMessage = 'Failed to populate diseases';
          
          if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
          } else if (error.response?.status === 401) {
            errorMessage = 'Authentication required. Please login again.';
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

      updateDisease: async (diseaseId: number, solution: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Updating disease:', diseaseId, 'with solution:', solution);
          const response = await axiosInstance.put(`/update_disease/${diseaseId}`, {
            solution: solution
          });
          console.log('Update disease response:', response.data);
          
          // Update the local state
          const currentDiseases = get().diseases;
          const updatedDiseases = currentDiseases.map(disease => 
            disease.id === diseaseId 
              ? { ...disease, solution: solution }
              : disease
          );
          
          set({ 
            diseases: updatedDiseases,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Failed to update disease:', error);
          let errorMessage = 'Failed to update disease';
          
          if (error.response) {
            if (error.response.status === 404) {
              errorMessage = 'Disease not found';
            } else if (error.response.data?.error) {
              errorMessage = error.response.data.error;
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

      deleteDisease: async (diseaseId: number) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Deleting disease:', diseaseId);
          const response = await axiosInstance.delete(`/delete_disease/${diseaseId}`);
          console.log('Delete disease response:', response.data);
          
          // Remove from local state
          const currentDiseases = get().diseases;
          const filteredDiseases = currentDiseases.filter(disease => disease.id !== diseaseId);
          
          set({ 
            diseases: filteredDiseases,
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Failed to delete disease:', error);
          let errorMessage = 'Failed to delete disease';
          
          if (error.response) {
            if (error.response.status === 404) {
              errorMessage = 'Disease not found';
            } else if (error.response.data?.error) {
              errorMessage = error.response.data.error;
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

      clearAllDiseases: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log('Clearing all diseases...');
          const response = await axiosInstance.delete('/clear_diseases');
          console.log('Clear diseases response:', response.data);
          
          set({ 
            diseases: [],
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Failed to clear diseases:', error);
          let errorMessage = 'Failed to clear all diseases';
          
          if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
          } else if (error.response?.status === 401) {
            errorMessage = 'Authentication required. Please login again.';
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
      name: 'disease-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        diseases: state.diseases 
      }),
    }
  )
);
