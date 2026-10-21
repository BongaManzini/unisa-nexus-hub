import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

const HybridSync = () => {
  const { 
    currentUser, 
    startLargeTransfer, 
    updateTransferProgress, 
    completeTransfer 
  } = useAppContext();
  
  const [isTransferring, setIsTransferring] = useState(false);

  const canAccessSync = currentUser && 
    (currentUser.role === 'Owner/Admin' || currentUser.role === 'Sync Manager');

  const simulateLargeTransfer = (size) => {
    if (isTransferring) {
      alert('A transfer is already in progress');
      return;
    }

    setIsTransferring(true);
    const transferId = startLargeTransfer(size);
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 10; // Random progress between 10-25% per tick
      
      if (progress >= 100) {
        progress = 100;
        updateTransferProgress(transferId, progress);
        clearInterval(interval);
        
        setTimeout(() => {
          completeTransfer(transferId);
          setIsTransferring(false);
          alert(`✓ Transfer complete! ${size} file synced successfully.`);
        }, 500);
      } else {
        updateTransferProgress(transferId, Math.floor(progress));
      }
    }, 200); // Update every 200ms for smooth animation
  };

  if (!canAccessSync) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <div className="card" style={{
        width: '300px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 51, 102, 0.2)'
      }}>
        <h4 style={{ color: '#003366', marginBottom: '15px', fontSize: '16px' }}>
          🚀 Large File Transfer
        </h4>
        <p style={{ fontSize: '13px', marginBottom: '15px', color: '#666' }}>
          Simulate large file sync operations
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => simulateLargeTransfer('1GB')}
            disabled={isTransferring}
            style={{
              opacity: isTransferring ? 0.5 : 1,
              cursor: isTransferring ? 'not-allowed' : 'pointer'
            }}
          >
            📤 Upload 1GB File
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => simulateLargeTransfer('3GB')}
            disabled={isTransferring}
            style={{
              opacity: isTransferring ? 0.5 : 1,
              cursor: isTransferring ? 'not-allowed' : 'pointer'
            }}
          >
            📤 Upload 3GB File
          </button>
        </div>
        {isTransferring && (
          <div className="alert alert-info" style={{ marginTop: '10px', fontSize: '12px' }}>
            Transfer in progress... Check header for status
          </div>
        )}
      </div>
    </div>
  );
};

export default HybridSync;
