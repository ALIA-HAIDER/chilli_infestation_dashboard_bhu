export interface PlantRequest {
  id: string;
  pictures: string[]; // Changed from single picture to array of pictures
  disease: string;
  solution: string;
  createdDate: string;
  location: string;
  status: 'pending' | 'reviewed' | 'resolved';
  severity: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
