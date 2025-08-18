import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { DiseaseManagement } from './components/DiseaseManagement';
import { useAuthStore } from '../store/useAuthStore';
import './App.css';

type CurrentPage = 'login' | 'dashboard' | 'disease-management';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('dashboard');
  const { isAuthenticated, initializeAuth, logout } = useAuthStore();

  useEffect(() => {
    // Initialize authentication on app start
    initializeAuth();
  }, [initializeAuth]);

  const handleLogin = (success: boolean) => {
    if (success) {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
  };

  const handleNavigateToDiseaseManagement = () => {
    setCurrentPage('disease-management');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            onLogout={handleLogout} 
            onNavigateToDiseaseManagement={handleNavigateToDiseaseManagement}
          />
        );
      case 'disease-management':
        return (
          <DiseaseManagement 
            onBack={handleBackToDashboard}
          />
        );
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;
