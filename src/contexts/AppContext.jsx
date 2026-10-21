import React, { createContext, useState, useContext } from 'react';
import {
  initialUsers,
  initialVaultFiles,
  initialMeetings,
  initialAds,
  initialTeams,
  initialAuditLog,
  initialSyncStatus
} from '../data/initialData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Authentication
  const [currentUser, setCurrentUser] = useState(null);
  const [users] = useState(initialUsers);

  // Data States
  const [vaultFiles, setVaultFiles] = useState(initialVaultFiles);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [ads, setAds] = useState(initialAds);
  const [teams, setTeams] = useState(initialTeams);
  const [auditLog, setAuditLog] = useState(initialAuditLog);
  const [syncStatus, setSyncStatus] = useState(initialSyncStatus);

  // Add audit log entry
  const addAuditEntry = (action, details, severity = 'INFO') => {
    const newEntry = {
      id: auditLog.length + 1,
      timestamp: new Date().toLocaleString('en-ZA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      user: currentUser?.name || 'System',
      action,
      details,
      severity
    };
    setAuditLog(prev => [newEntry, ...prev]);
  };

  // Auth functions
  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      addAuditEntry('LOGIN', `Successful login for ${user.name}`, 'INFO');
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    addAuditEntry('LOGOUT', `User ${currentUser?.name} logged out`, 'INFO');
    setCurrentUser(null);
  };

  const signup = (username, password, name, role) => {
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }
    const newUser = {
      id: users.length + 1,
      username,
      password,
      role,
      name
    };
    users.push(newUser);
    addAuditEntry('USER_CREATED', `New user created: ${name}`, 'INFO');
    return { success: true, message: 'Account created successfully' };
  };

  // Vault functions
  const updateVaultFile = (fileId, updates) => {
    setVaultFiles(prev => prev.map(file =>
      file.id === fileId ? { ...file, ...updates } : file
    ));
    addAuditEntry('FILE_UPDATED', `File updated: ${updates.name || fileId}`, 'INFO');
  };

  const toggleFileEncryption = (fileId) => {
    setVaultFiles(prev => prev.map(file =>
      file.id === fileId ? { ...file, encrypted: !file.encrypted } : file
    ));
    addAuditEntry('ENCRYPTION_TOGGLED', `Encryption toggled for file ID: ${fileId}`, 'INFO');
  };

  // Meetings functions
  const addMeeting = (meeting) => {
    const newMeeting = { ...meeting, id: meetings.length + 1 };
    setMeetings(prev => [...prev, newMeeting]);
    addAuditEntry('MEETING_CREATED', `New meeting created: ${meeting.title}`, 'INFO');
  };

  // Ads functions
  const addAd = (ad) => {
    const newAd = { ...ad, id: ads.length + 1 };
    setAds(prev => [...prev, newAd]);
    addAuditEntry('AD_CREATED', `New ad created`, 'INFO');
  };

  const updateAd = (adId, updates) => {
    setAds(prev => prev.map(ad => ad.id === adId ? { ...ad, ...updates } : ad));
    addAuditEntry('AD_UPDATED', `Ad updated: ID ${adId}`, 'INFO');
  };

  const deleteAd = (adId) => {
    setAds(prev => prev.filter(ad => ad.id !== adId));
    addAuditEntry('AD_DELETED', `Ad deleted: ID ${adId}`, 'INFO');
  };

  // Team functions
  const updateTeamMember = (teamType, memberId, updates) => {
    setTeams(prev => ({
      ...prev,
      [teamType]: prev[teamType].map(member =>
        member.id === memberId ? { ...member, ...updates } : member
      )
    }));
    addAuditEntry('TEAM_UPDATED', `Team member updated: ${updates.name || memberId}`, 'INFO');
  };

  // Sync functions
  const toggleAutoSync = () => {
    setSyncStatus(prev => ({
      ...prev,
      autoSyncEnabled: !prev.autoSyncEnabled
    }));
    addAuditEntry('SYNC_TOGGLED', `Auto-sync ${syncStatus.autoSyncEnabled ? 'disabled' : 'enabled'}`, 'INFO');
  };

  const startLargeTransfer = (size) => {
    const transferItem = {
      id: Date.now(),
      size,
      progress: 0,
      status: 'uploading'
    };
    setSyncStatus(prev => ({
      ...prev,
      syncQueue: [...prev.syncQueue, transferItem]
    }));
    addAuditEntry('SYNC_INITIATED', `Started large file transfer (${size})`, 'INFO');
    return transferItem.id;
  };

  const updateTransferProgress = (transferId, progress) => {
    setSyncStatus(prev => ({
      ...prev,
      syncQueue: prev.syncQueue.map(item =>
        item.id === transferId ? { ...item, progress } : item
      )
    }));
  };

  const completeTransfer = (transferId) => {
    setSyncStatus(prev => ({
      ...prev,
      syncQueue: prev.syncQueue.filter(item => item.id !== transferId),
      lastSync: new Date().toLocaleString('en-ZA')
    }));
    addAuditEntry('SYNC_COMPLETED', `File transfer completed`, 'INFO');
  };

  const value = {
    // Auth
    currentUser,
    login,
    logout,
    signup,
    
    // Data
    vaultFiles,
    meetings,
    ads,
    teams,
    auditLog,
    syncStatus,
    
    // Functions
    updateVaultFile,
    toggleFileEncryption,
    addMeeting,
    addAd,
    updateAd,
    deleteAd,
    updateTeamMember,
    addAuditEntry,
    toggleAutoSync,
    startLargeTransfer,
    updateTransferProgress,
    completeTransfer
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
