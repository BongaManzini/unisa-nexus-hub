import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const AdManager = () => {
  const { ads, addAd, updateAd, deleteAd } = useAppContext();
  const [showNewAd, setShowNewAd] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [newAd, setNewAd] = useState({
    type: 'text',
    content: '',
    active: true,
    backgroundColor: '#003366',
    textColor: '#FFC300'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAd) {
      updateAd(editingAd.id, newAd);
      setEditingAd(null);
    } else {
      addAd(newAd);
    }
    setNewAd({
      type: 'text',
      content: '',
      active: true,
      backgroundColor: '#003366',
      textColor: '#FFC300'
    });
    setShowNewAd(false);
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setNewAd(ad);
    setShowNewAd(true);
  };

  const handleDelete = (adId) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      deleteAd(adId);
    }
  };

  const handleToggleActive = (ad) => {
    updateAd(ad.id, { ...ad, active: !ad.active });
  };

  return (
    <div className="card">
      <div className="flex-between">
        <h3>Advertisement Manager</h3>
        <button className="btn btn-secondary" onClick={() => {
          setShowNewAd(true);
          setEditingAd(null);
          setNewAd({
            type: 'text',
            content: '',
            active: true,
            backgroundColor: '#003366',
            textColor: '#FFC300'
          });
        }}>
          ➕ Create New Ad
        </button>
      </div>
      
      <p>Manage rotating banner advertisements across the platform</p>

      <div style={{ marginTop: '20px' }}>
        {ads.map(ad => (
          <div key={ad.id} className="file-item">
            <div className="file-info">
              <div className="file-name">
                {ad.type === 'text' ? '📝 Text Ad' : '🖼️ Image Ad'}
              </div>
              <div className="file-meta">
                <span className={`badge ${ad.active ? 'badge-info' : 'badge-warning'}`}>
                  {ad.active ? '✓ Active' : '✗ Inactive'}
                </span>
                <span style={{ 
                  backgroundColor: ad.backgroundColor,
                  color: ad.textColor,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  Color Preview
                </span>
              </div>
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                {ad.type === 'text' ? (
                  <div style={{ 
                    backgroundColor: ad.backgroundColor,
                    color: ad.textColor,
                    padding: '10px',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    {ad.content}
                  </div>
                ) : (
                  <img 
                    src={ad.content} 
                    alt="Ad preview" 
                    style={{ maxWidth: '100%', maxHeight: '60px', objectFit: 'contain' }}
                  />
                )}
              </div>
            </div>
            <div className="file-actions">
              <button 
                className="btn btn-small btn-success"
                onClick={() => handleToggleActive(ad)}
              >
                {ad.active ? '⏸️ Deactivate' : '▶️ Activate'}
              </button>
              <button className="btn btn-small btn-secondary" onClick={() => handleEdit(ad)}>
                ✏️ Edit
              </button>
              <button 
                className="btn btn-small" 
                style={{ backgroundColor: '#f44336', color: 'white' }}
                onClick={() => handleDelete(ad.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNewAd && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingAd ? 'Edit Advertisement' : 'Create New Advertisement'}</h3>
              <button className="btn-close" onClick={() => {
                setShowNewAd(false);
                setEditingAd(null);
              }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Ad Type</label>
                  <select
                    value={newAd.type}
                    onChange={(e) => setNewAd({...newAd, type: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e6ed',
                      borderRadius: '6px'
                    }}
                  >
                    <option value="text">Text Ad</option>
                    <option value="image">Image Ad</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{newAd.type === 'text' ? 'Ad Text' : 'Image URL'}</label>
                  <input
                    type="text"
                    value={newAd.content}
                    onChange={(e) => setNewAd({...newAd, content: e.target.value})}
                    placeholder={newAd.type === 'text' ? 'Enter ad text' : 'https://example.com/image.jpg'}
                    required
                  />
                </div>

                <div className="color-picker-group">
                  <div className="color-picker-item">
                    <label>Background Color</label>
                    <input
                      type="color"
                      value={newAd.backgroundColor}
                      onChange={(e) => setNewAd({...newAd, backgroundColor: e.target.value})}
                    />
                  </div>
                  <div className="color-picker-item">
                    <label>Text Color</label>
                    <input
                      type="color"
                      value={newAd.textColor}
                      onChange={(e) => setNewAd({...newAd, textColor: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={newAd.active}
                      onChange={(e) => setNewAd({...newAd, active: e.target.checked})}
                    />
                    Active (show in rotation)
                  </label>
                </div>

                <div className="ad-preview">
                  <strong>Preview:</strong>
                  <div style={{ marginTop: '10px' }}>
                    {newAd.type === 'text' ? (
                      <div style={{
                        backgroundColor: newAd.backgroundColor,
                        color: newAd.textColor,
                        padding: '15px',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}>
                        {newAd.content || 'Your ad text will appear here'}
                      </div>
                    ) : (
                      newAd.content && (
                        <img 
                          src={newAd.content} 
                          alt="Preview" 
                          style={{ maxWidth: '100%', maxHeight: '80px' }}
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowNewAd(false);
                  setEditingAd(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {editingAd ? 'Update Ad' : 'Create Ad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdManager;
