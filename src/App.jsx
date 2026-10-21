import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Auth from './components/Auth';
import Header from './components/common/Header';
import Dashboard from './views/Dashboard';
import HybridSync from './components/HybridSync';
import '../src/styles/styles.css';

const AppContent = () => {
  const { currentUser } = useAppContext();

  return (
    <div className="app-container">
      {!currentUser ? (
        <Auth />
      ) : (
        <>
          <Header />
          <Dashboard />
          <HybridSync />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
