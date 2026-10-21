import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Vault from './features/Vault';
import Meetings from './features/Meetings';
import TeamSharing from './admin/TeamSharing';
import AuditLog from './admin/AuditLog';
import AdManager from './admin/AdManager';

const Dashboard = () => {
  const { currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState('vault');

  const isAdmin = currentUser?.role === 'Owner/Admin';
  const isSyncManager = currentUser?.role === 'Sync Manager';
  const isMarketingManager = currentUser?.role === 'Marketing Manager';

  const tabs = [
    { id: 'vault', label: '🗄️ Secure Vault', component: Vault, access: true },
    { id: 'meetings', label: '📅 Meetings', component: Meetings, access: true },
    { id: 'team', label: '👥 Team Sharing', component: TeamSharing, access: isAdmin },
    { id: 'audit', label: '📋 Audit Log', component: AuditLog, access: isAdmin },
    { id: 'ads', label: '📢 Ad Manager', component: AdManager, access: isAdmin || isMarketingManager }
  ];

  const availableTabs = tabs.filter(tab => tab.access);
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome, {currentUser?.name}! Your role: <strong>{currentUser?.role}</strong></p>
        
        <div className="tab-navigation">
          {availableTabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dashboard-content">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default Dashboard;
