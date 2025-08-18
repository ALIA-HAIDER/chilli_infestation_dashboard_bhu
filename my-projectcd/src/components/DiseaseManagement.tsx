import React, { useState, useMemo, useEffect } from 'react';
import { 
  Edit, 
  Search, 
  Trash2,
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle,
  RefreshCw,
  Database
} from 'lucide-react';
import { Footer } from './Footer';
import { useDiseaseStore } from '../../store/useDiseaseStore';

interface Disease {
  id: number;
  name: string;
  chategory: string;
  solution: string;
  created_at?: string;
  updated_at?: string;
}

interface DiseaseManagementProps {
  onBack: () => void;
}

export const DiseaseManagement: React.FC<DiseaseManagementProps> = ({ onBack }) => {
  const { 
    diseases, 
    isLoading, 
    error, 
    fetchDiseases, 
    populateDiseases, 
    updateDisease, 
    deleteDisease, 
    clearAllDiseases,
    clearError 
  } = useDiseaseStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingSolution, setEditingSolution] = useState('');

  // Fetch diseases on component mount
  useEffect(() => {
    fetchDiseases().catch((error) => {
      console.log('Initial fetch failed:', error);
      // Error is handled by the store
    });
  }, [fetchDiseases]);

  // Filter diseases based on search
  const filteredDiseases = useMemo(() => {
    if (!diseases || !Array.isArray(diseases)) {
      return [];
    }
    return diseases.filter(disease => 
      disease?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease?.chategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease?.solution?.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleEditSave = async (diseaseId: number) => {
    if (!editingSolution.trim()) return;
    
    try {
      await updateDisease(diseaseId, editingSolution);
      setEditingId(null);
      setEditingSolution('');
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to update disease');
    }
  };

  const handleDeleteDisease = async (diseaseId: number) => {
    if (!window.confirm('Are you sure you want to delete this disease?')) return;
    
    try {
      await deleteDisease(diseaseId);
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to delete disease');
    }
  };

  const handlePopulateDiseases = async () => {
    try {
      await populateDiseases();
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to populate diseases');
    }
  };

  const handleClearAllDiseases = async () => {
    if (!window.confirm('Are you sure you want to clear all diseases? This action cannot be undone.')) return;
    
    try {
      await clearAllDiseases();
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to clear diseases');
    }
  };

  const handleRefreshDiseases = async () => {
    try {
      await fetchDiseases();
    } catch (error) {
      // Error is handled by the store
      console.error('Failed to refresh diseases');
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
            <div className="flex gap-2">
              <button
                onClick={handleRefreshDiseases}
                disabled={isLoading}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors text-sm"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handlePopulateDiseases}
                disabled={isLoading}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors text-sm"
              >
                <Database className="h-4 w-4" />
                <span className="hidden sm:inline">Sample Data</span>
              </button>
              <button
                onClick={handleClearAllDiseases}
                disabled={isLoading}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 transition-colors text-sm"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={clearError}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Enhanced Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search diseases by name, category, or solution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-2 text-gray-600">Loading diseases...</span>
          </div>
        )}

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
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {disease.chategory}
                    </span>
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
                
                {disease.updated_at && (
                  <div className="mt-4 text-xs text-gray-500">
                    Last updated: {new Date(disease.updated_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Database className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No diseases found' : 'No diseases available'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Get started by populating the database with sample diseases'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={handlePopulateDiseases}
                disabled={isLoading}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 inline-flex items-center gap-2 transition-colors"
              >
                <Database className="h-5 w-5" />
                Populate Sample Data
              </button>
            )}
          </div>
        )}

        {/* Results Info */}
        {!isLoading && filteredDiseases.length > 0 && searchTerm && (
          <div className="mt-8 text-center text-gray-600">
            <button
              onClick={() => setSearchTerm('')}
              className="text-green-600 hover:text-green-700 underline"
            >
              Clear search to see all {diseases.length} diseases
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};
