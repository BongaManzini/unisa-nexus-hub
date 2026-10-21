import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Header = () => {
  const { currentUser, logout, ads, syncStatus, toggleAutoSync } = useAppContext();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const activeAds = ads.filter(ad => ad.active);

  // Rotate ads every 8 seconds
  useEffect(() => {
    if (activeAds.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % activeAds.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeAds.length]);

  const currentAd = activeAds[currentAdIndex];

  const canAccessSync = currentUser && 
    (currentUser.role === 'Owner/Admin' || currentUser.role === 'Sync Manager');

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-brand">
          <h1>🎓 UNISA Collaboration Platform</h1>
        </div>
        <div className="header-user">
          <div className="user-info">
            <div className="user-name">{currentUser?.name}</div>
            <div className="user-role">{currentUser?.role}</div>
          </div>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {currentAd && (
        <div 
          className="ad-banner" 
          style={{
            backgroundColor: currentAd.backgroundColor,
            color: currentAd.textColor
          }}
        >
          {currentAd.type === 'text' ? (
            <div>{currentAd.content}</div>
          ) : (
            <img src={currentAd.content} alt="Advertisement" />
          )}
        </div>
      )}

      <div className="sync-status-bar">
        <div className="sync-info">
          <div className="sync-indicator">
            <div className="sync-dot" style={{
              backgroundColor: syncStatus.autoSyncEnabled ? '#4CAF50' : '#ff9800'
            }}></div>
            <span>
              {syncStatus.autoSyncEnabled ? 'Auto-Sync Active' : 'Auto-Sync Disabled'}
            </span>
          </div>
          <span>Last Sync: {syncStatus.lastSync}</span>
          {syncStatus.syncQueue.length > 0 && (
            <span>Active Transfers: {syncStatus.syncQueue.length}</span>
          )}
        </div>

        {canAccessSync && (
          <div className="sync-actions">
            <button className="btn-sync" onClick={toggleAutoSync}>
              {syncStatus.autoSyncEnabled ? 'Disable Auto-Sync' : 'Enable Auto-Sync'}
            </button>
          </div>
        )}
      </div>

      {syncStatus.syncQueue.length > 0 && (
        <div style={{ padding: '10px 30px', backgroundColor: '#002a54' }}>
          {syncStatus.syncQueue.map(item => (
            <div key={item.id} style={{ marginBottom: '8px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'white',
                marginBottom: '4px'
              }}>
                <span>Transferring {item.size}...</span>
                <span>{item.progress}%</span>
              </div>
              <div className="progress-bar-container" style={{ height: '8px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
