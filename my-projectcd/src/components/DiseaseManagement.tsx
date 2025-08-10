import React, { useState, useMemo } from 'react';
import { 
  Edit, 
  Search, 
  Plus, 
  Trash2,
  ArrowLeft,
  CheckCircle,
  X
} from 'lucide-react';
import { Footer } from './Footer';

interface Disease {
  id: string;
  name: string;
  description: string;
  solution: string;
  lastUpdated: string;
  updatedBy: string;
}

interface DiseaseManagementProps {
  onBack: () => void;
}

// Mock data for diseases
const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Bacterial Leaf Spot',
    description: 'A bacterial infection causing dark spots on leaves with yellow halos.',
    solution: 'Apply copper-based fungicide spray every 7-10 days. Remove affected leaves and improve air circulation around plants.',
    lastUpdated: '2025-08-05T10:30:00Z',
    updatedBy: 'Admin'
  },
  {
    id: '2',
    name: 'Anthracnose',
    description: 'A fungal disease causing dark, sunken lesions on fruits and leaves.',
    solution: 'Use resistant varieties, improve drainage, and apply preventive fungicide treatments during humid weather.',
    lastUpdated: '2025-08-06T14:15:00Z',
    updatedBy: 'Admin'
  },
  {
    id: '3',
    name: 'Powdery Mildew',
    description: 'A fungal disease appearing as white powdery coating on leaves.',
    solution: 'Reduce humidity, increase air circulation, and apply sulfur-based fungicide. Avoid overhead watering.',
    lastUpdated: '2025-08-07T09:45:00Z',
    updatedBy: 'Admin'
  },
  {
    id: '4',
    name: 'Aphid Infestation',
    description: 'Small insects that suck plant sap, causing yellowing and curling of leaves.',
    solution: 'Introduce beneficial insects like ladybugs, use insecticidal soap, or apply neem oil spray.',
    lastUpdated: '2025-08-08T16:20:00Z',
    updatedBy: 'Admin'
  },
  {
    id: '5',
    name: 'Fusarium Wilt',
    description: 'A soil-borne fungal disease causing wilting and yellowing of plants.',
    solution: 'Remove infected plants, improve soil drainage, use disease-free seeds, and apply soil fumigation.',
    lastUpdated: '2025-08-09T11:10:00Z',
    updatedBy: 'Admin'
  },
  {
    id: '6',
    name: 'Spider Mites',
    description: 'Tiny arachnids that cause stippling and webbing on leaves.',
    solution: 'Increase humidity, use predatory mites, apply miticide sprays, and remove heavily infested leaves.',
    lastUpdated: '2025-08-10T08:30:00Z',
    updatedBy: 'Admin'
  }
];

export const DiseaseManagement: React.FC<DiseaseManagementProps> = ({ onBack }) => {
  const [diseases, setDiseases] = useState<Disease[]>(mockDiseases);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSolution, setEditingSolution] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDisease, setNewDisease] = useState({
    name: '',
    description: '',
    solution: ''
  });

  // Filter diseases based on search
  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => 
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [diseases, searchTerm]);

  const handleEditStart = (disease: Disease) => {
    setEditingId(disease.id);
    setEditingSolution(disease.solution);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingSolution('');
  };

  const handleEditSave = (diseaseId: string) => {
    setDiseases(prev => prev.map(disease => 
      disease.id === diseaseId 
        ? { 
            ...disease, 
            solution: editingSolution,
            lastUpdated: new Date().toISOString(),
            updatedBy: 'Admin'
          }
        : disease
    ));
    setEditingId(null);
    setEditingSolution('');
    
    // Here you would normally send the updated solution to your backend
    console.log('Updating disease solution in backend:', { diseaseId, solution: editingSolution });
  };

  const handleAddDisease = () => {
    if (!newDisease.name || !newDisease.description || !newDisease.solution) return;
    
    const disease: Disease = {
      id: (diseases.length + 1).toString(),
      name: newDisease.name,
      description: newDisease.description,
      solution: newDisease.solution,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    };
    
    setDiseases(prev => [...prev, disease]);
    setNewDisease({ name: '', description: '', solution: '' });
    setShowAddForm(false);
    
    // Here you would normally send the new disease to your backend
    console.log('Adding new disease to backend:', disease);
  };

  const handleDeleteDisease = (diseaseId: string) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      setDiseases(prev => prev.filter(disease => disease.id !== diseaseId));
      
      // Here you would normally delete the disease from your backend
      console.log('Deleting disease from backend:', diseaseId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Disease Management
                </h1>
                <p className="text-sm text-gray-500">Manage treatment solutions</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              <span>Add Disease</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search diseases by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Results count */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">
              Showing <span className="text-blue-600 font-semibold">{filteredDiseases.length}</span> of <span className="text-gray-900 font-semibold">{diseases.length}</span> diseases
            </p>
            <div className="text-xs text-gray-500">
              Total treatment solutions available
            </div>
          </div>
        </div>

        {/* Diseases List */}
        <div className="space-y-6">
          {filteredDiseases.map((disease) => (
            <div key={disease.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {disease.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {disease.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {editingId === disease.id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(disease.id)}
                          className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditStart(disease)}
                          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteDisease(disease.id)}
                          className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treatment Solution
                  </label>
                  {editingId === disease.id ? (
                    <textarea
                      value={editingSolution}
                      onChange={(e) => setEditingSolution(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter treatment solution..."
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                      {disease.solution}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Last updated: {new Date(disease.lastUpdated).toLocaleDateString()} by {disease.updatedBy}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No diseases found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <Footer />

      {/* Add Disease Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add New Disease
                </h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disease Name
                  </label>
                  <input
                    type="text"
                    value={newDisease.name}
                    onChange={(e) => setNewDisease(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter disease name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDisease.description}
                    onChange={(e) => setNewDisease(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter disease description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treatment Solution
                  </label>
                  <textarea
                    value={newDisease.solution}
                    onChange={(e) => setNewDisease(prev => ({ ...prev, solution: e.target.value }))}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter treatment solution..."
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDisease}
                  disabled={!newDisease.name || !newDisease.description || !newDisease.solution}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add Disease
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};
