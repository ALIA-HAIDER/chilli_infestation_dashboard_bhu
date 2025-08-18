import type { PlantRequest } from '../types';

// Mock data for plant infestation requests
export const mockPlantRequests: PlantRequest[] = [
  {
    id: '1',
    pictures: [
      'https://images.unsplash.com/photo-1544461284-799eb50dc4d3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop'
    ],
    disease: 'Bacterial Leaf Spot',
    solution: 'Apply copper-based fungicide spray every 7-10 days. Remove affected leaves and improve air circulation around plants.',
    createdDate: '2025-08-05T10:30:00Z',
    location: 'Farm A, Sector 1',
    status: 'reviewed',
    severity: 'high'
  },
  {
    id: '2',
    pictures: [
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1569688148124-30b1a49ce69b?w=400&h=300&fit=crop'
    ],
    disease: 'Anthracnose',
    solution: 'Use resistant varieties, improve drainage, and apply preventive fungicide treatments during humid weather.',
    createdDate: '2025-08-06T14:15:00Z',
    location: 'Farm B, Sector 3',
    status: 'pending',
    severity: 'medium'
  },
  {
    id: '3',
    pictures: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop'
    ],
    disease: 'Powdery Mildew',
    solution: 'Reduce humidity, increase air circulation, and apply sulfur-based fungicide. Avoid overhead watering.',
    createdDate: '2025-08-07T09:45:00Z',
    location: 'Farm C, Sector 2',
    status: 'resolved',
    severity: 'low'
  },
  {
    id: '4',
    pictures: [
      'https://images.unsplash.com/photo-1569688148124-30b1a49ce69b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1594652634010-6a2a2121e4da?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544461284-799eb50dc4d3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&h=300&fit=crop'
    ],
    disease: 'Aphid Infestation',
    solution: 'Introduce beneficial insects like ladybugs, use insecticidal soap, or apply neem oil spray.',
    createdDate: '2025-08-08T16:20:00Z',
    location: 'Farm A, Sector 4',
    status: 'reviewed',
    severity: 'medium'
  },
  {
    id: '5',
    pictures: [
      'https://images.unsplash.com/photo-1594652634010-6a2a2121e4da?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop'
    ],
    disease: 'Fusarium Wilt',
    solution: 'Remove infected plants, improve soil drainage, use disease-free seeds, and apply soil fumigation.',
    createdDate: '2025-08-09T11:10:00Z',
    location: 'Farm D, Sector 1',
    status: 'pending',
    severity: 'high'
  },
  {
    id: '6',
    pictures: [
      'https://images.unsplash.com/photo-1583925001617-12c7b6e3ab8e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544461284-799eb50dc4d3?w=400&h=300&fit=crop'
    ],
    disease: 'Spider Mites',
    solution: 'Increase humidity, use predatory mites, apply miticide sprays, and remove heavily infested leaves.',
    createdDate: '2025-08-10T08:30:00Z',
    location: 'Farm B, Sector 2',
    status: 'reviewed',
    severity: 'medium'
  }
];

// Mock admin credentials
export const adminCredentials = {
  email: 'admin@example.com',
  password: 'admin123'
};
