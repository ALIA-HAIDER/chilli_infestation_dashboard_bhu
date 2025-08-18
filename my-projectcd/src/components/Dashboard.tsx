import React, { useState, useMemo, useEffect } from 'react';
import { 
  LogOut, 
  Search, 
  Calendar, 
  MapPin, 
  BarChart3,
  Settings,
  Filter,
  RefreshCw,
  AlertCircle,
  X,
  Camera,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Footer } from './Footer';
import { usePlantStore } from '../../store/usePlantStore';
import { useDiseaseStore } from '../../store/useDiseaseStore';

interface UserPlant {
  id: number;
  plant_image: string;
  location: string;
  disease_id: number;
  datetime: string;
}

interface DashboardProps {
  onLogout: () => void;
  onNavigateToDiseaseManagement: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, onNavigateToDiseaseManagement }) => {
  const { userPlants, isLoading, error, fetchUserPlants, clearError } = usePlantStore();
  const { diseases, fetchDiseases } = useDiseaseStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<UserPlant | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchUserPlants().catch((error) => {
      console.log('Failed to fetch plants:', error);
    });
    fetchDiseases().catch((error) => {
      console.log('Failed to fetch diseases:', error);
    });
  }, [fetchUserPlants, fetchDiseases]);

  // Get disease name by ID
  const getDiseaseName = (diseaseId: number) => {
    const disease = diseases.find(d => d.id === diseaseId);
    return disease ? disease.name : `Disease ID: ${diseaseId}`;
  };

  // Filter and search functionality
  const filteredPlants = useMemo(() => {
    return userPlants.filter(plant => {
      const diseaseName = getDiseaseName(plant.disease_id);
      const matchesSearch = diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.id.toString().includes(searchTerm);
      
      return matchesSearch;
    });
  }, [userPlants, diseases, searchTerm]);

  // Statistics
  // Using actual data instead of mock data

  const handleSelectPlant = (plant: UserPlant) => {
    setSelectedPlant(plant);
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  const handleRefresh = async () => {
    try {
      await fetchUserPlants();
    } catch (error) {
      console.error('Failed to refresh data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900">
                  CropScan AI Dashboard
                </h1>
                <p className="text-sm text-gray-500">Chilli Infestation Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={onNavigateToDiseaseManagement}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Settings className="h-4 w-4" />
                <span>Manage Diseases</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12 mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-2 text-gray-600">Loading plant data...</span>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Plants</p>
                <p className="text-2xl font-bold text-gray-900">{userPlants.length}</p>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    Active since september 2024
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Searches</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPlants.length}</p>
                <p className="text-xs text-gray-500 mt-1">Current filter results</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Locations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(userPlants.map(p => p.location)).size}
                </p>
                <p className="text-xs text-gray-500 mt-1">Farm locations tracked</p>
              </div>
            </div>
          </div>
        </div>
        {/* Statistics Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviewed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.reviewed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.high}</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by ID, disease, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
                
              </div>
            </div>
          </div>

          {/* Results count with enhanced styling */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                Showing <span className="text-green-600 font-semibold">{filteredPlants.length}</span> of <span className="text-gray-900 font-semibold">{userPlants.length}</span> plants
              </p>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Data Table with enhanced styling */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Plant ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Plant Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Disease Detected
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Recorded
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlants.map((plant) => (
                  <tr key={plant.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-gray-900">#{plant.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        <img
                          src={plant.plant_image}
                          alt={`Plant ${plant.id}`}
                          className="h-12 w-12 rounded-lg object-cover ring-2 ring-white shadow-sm hover:scale-110 transition-transform cursor-pointer"
                          onClick={() => handleSelectPlant(plant)}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMjQgMjhDMjYuMjA5MSAyOCAyOCAyNi4yMDkxIDI4IDI0QzI4IDIxLjc5MDkgMjYuMjA5MSAyMCAyNCAyMEMyMS43OTA5IDIwIDIwIDIxLjc5MDkgMjAgMjRDMjAgMjYuMjA5MSAyMS43OTA5IDI4IDI0IDI4WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{getDiseaseName(plant.disease_id)}</div>
                        <div className="text-xs text-gray-500">ID: {plant.disease_id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="font-medium">{plant.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{format(new Date(plant.datetime), 'MMM dd, yyyy')}</div>
                          <div className="text-xs text-gray-500">{format(new Date(plant.datetime), 'h:mm a')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleSelectPlant(plant)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPlants.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm ? 'No plants found' : 'No plants available'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search criteria.' 
                  : 'No plant records found in the database.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Footer */}
     

      {/* Enhanced Plant Detail Modal with Glassmorphism */}
      {selectedPlant && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Glassmorphism Background */}
          <div className="fixed inset-0 backdrop-blur-md bg-black/30 transition-all duration-300" onClick={handleCloseModal}></div>
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 transition-all duration-300 animate-in zoom-in-95 fade-in-0">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200/50 bg-gradient-to-r from-green-50/80 to-emerald-50/80 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Plant Analysis #{selectedPlant.id}
                    </h3>
                    <p className="text-sm text-gray-600">Detailed inspection report</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-400 backdrop-blur-sm transition-all duration-200 hover:bg-red-50 hover:text-red-500 hover:shadow-lg"
                >
                  <X className="h-5 w-5 transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[80vh] overflow-y-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Enhanced Image Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Camera className="h-5 w-5 mr-2 text-green-600" />
                      Plant Image
                    </h4>
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                      <img
                        src={selectedPlant.plant_image}
                        alt={`Plant ${selectedPlant.id}`}
                        className="h-80 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDQwMCAzMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBzdG9wLWNvbG9yPSIjRjNGNEY2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTVFN0VCIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMjAiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNjAiIHI9IjQwIiBmaWxsPSIjRDFENURCIiBvcGFjaXR5PSIwLjUiLz48dGV4dCB4PSIyMDAiIHk9IjE5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI1MDAiPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </div>
                  </div>

                  {/* Plant Information */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Search className="h-5 w-5 mr-2 text-green-600" />
                      Analysis Results
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Disease Information */}
                      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100">
                        <label className="text-sm font-semibold text-blue-800 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Disease Detected
                        </label>
                        <p className="mt-2 text-lg font-bold text-blue-900">{getDiseaseName(selectedPlant.disease_id)}</p>
                        <p className="text-sm text-blue-600 mt-1">Disease ID: {selectedPlant.disease_id}</p>
                      </div>

                      {/* Location Information */}
                      <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 border border-purple-100">
                        <label className="text-sm font-semibold text-purple-800 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Location
                        </label>
                        <p className="mt-2 text-lg font-medium text-purple-900">{selectedPlant.location}</p>
                      </div>

                      {/* Date Information */}
                      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 p-4 border border-orange-100">
                        <label className="text-sm font-semibold text-orange-800 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Date Recorded
                        </label>
                        <p className="mt-2 text-lg font-medium text-orange-900">
                          {format(new Date(selectedPlant.datetime), 'MMMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-orange-600">
                          at {format(new Date(selectedPlant.datetime), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution Section */}
                {(() => {
                  const disease = diseases.find(d => d.id === selectedPlant.disease_id);
                  return disease ? (
                    <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-6 border border-green-200 shadow-inner">
                      <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Recommended Treatment Solution
                      </h4>
                      <div className="rounded-xl bg-white/70 backdrop-blur-sm p-4 border border-green-100">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                          {disease.solution}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-green-700">
                        <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                        Solution provided by CropScan AI Disease Management System
                      </div>
                    </div>
                  ) : (
                    <div className="mt-8 rounded-2xl bg-gradient-to-r from-gray-50 to-slate-50 p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Solution Not Available
                      </h4>
                      <p className="text-gray-600">
                        No treatment solution found for this disease. Please consult with an agricultural expert.
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Enhanced Footer */}
              <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-slate-50/80 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span> {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="rounded-xl bg-gradient-to-r from-red-200 to-red-200 px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                    >
                      Close
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer variant="dashboard" />
    </div>
  );
};
