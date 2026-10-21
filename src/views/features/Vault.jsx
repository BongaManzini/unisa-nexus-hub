import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Vault = () => {
  const { currentUser, vaultFiles, updateVaultFile, toggleFileEncryption, addAuditEntry } = useAppContext();
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState('');

  const isSyncManager = currentUser?.role === 'Sync Manager';
  const canViewContent = !isSyncManager;

  const handleEdit = (file) => {
    if (isSyncManager) {
      alert('Access Denied: Sync Managers cannot view or edit file content for data privacy.');
      addAuditEntry('ACCESS_DENIED', `Sync Manager attempted to view file: ${file.name}`, 'WARNING');
      return;
    }
    setEditingFile(file);
    setEditContent(file.content);
  };

  const handleSave = () => {
    updateVaultFile(editingFile.id, { 
      content: editContent,
      lastModified: new Date().toLocaleDateString('en-ZA')
    });
    setEditingFile(null);
    setEditContent('');
  };

  const handleToggleEncryption = (fileId) => {
    toggleFileEncryption(fileId);
  };

  return (
    <div className="card">
      <h3>Secure File Vault</h3>
      <p>End-to-end encrypted file storage with role-based access control</p>

      {isSyncManager && (
        <div className="alert alert-warning">
          <strong>Privacy Notice:</strong> As a Sync Manager, you can manage file transfers but cannot view file content to ensure data privacy.
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {vaultFiles.map(file => (
          <div key={file.id} className="file-item">
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-meta">
                <span>{file.type} • {file.size}</span>
                <span className={`badge ${file.encrypted ? 'badge-encrypted' : 'badge-unencrypted'}`}>
                  {file.encrypted ? '🔒 Encrypted' : '🔓 Unencrypted'}
                </span>
                {file.projectType && (
                  <span className="badge badge-info">{file.projectType}</span>
                )}
                {file.ssdlc && <span className="badge badge-ssdlc">SSDLC</span>}
                {file.lbc && <span className="badge badge-lbc">LBC</span>}
              </div>
              {file.githubLink && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  🔗 <a href={file.githubLink} target="_blank" rel="noopener noreferrer" style={{ color: '#003366' }}>
                    {file.githubLink}
                  </a>
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                Last modified: {file.lastModified}
              </div>
            </div>
            <div className="file-actions">
              {canViewContent && (
                <button className="btn btn-secondary btn-small" onClick={() => handleEdit(file)}>
                  ✏️ Edit
                </button>
              )}
              <button 
                className="btn btn-success btn-small"
                onClick={() => handleToggleEncryption(file.id)}
              >
                {file.encrypted ? '🔓 Decrypt' : '🔒 Encrypt'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingFile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit File: {editingFile.name}</h3>
              <button className="btn-close" onClick={() => setEditingFile(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>File Content</label>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="10"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e6ed',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '13px'
                  }}
                />
              </div>
              <div style={{ marginTop: '15px' }}>
                <div className="badge badge-info" style={{ marginRight: '10px' }}>
                  Project: {editingFile.projectType || 'General'}
                </div>
                {editingFile.ssdlc && <span className="badge badge-ssdlc" style={{ marginRight: '10px' }}>SSDLC Compliant</span>}
                {editingFile.lbc && <span className="badge badge-lbc">LBC Framework</span>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditingFile(null)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
