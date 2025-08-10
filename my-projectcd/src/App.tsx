import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { DiseaseManagement } from './components/DiseaseManagement';
import './App.css';

type CurrentPage = 'login' | 'dashboard' | 'disease-management';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('login');

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
    if (success) {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
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
