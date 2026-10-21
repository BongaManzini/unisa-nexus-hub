import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Meetings = () => {
  const { meetings, addMeeting, addAuditEntry } = useAppContext();
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    participants: '',
    notes: '',
    attachments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeeting({
      ...newMeeting,
      participants: newMeeting.participants.split(',').map(p => p.trim()),
      attachments: newMeeting.attachments.split(',').map(a => a.trim()).filter(a => a)
    });
    setNewMeeting({ title: '', date: '', participants: '', notes: '', attachments: '' });
    setShowNewMeeting(false);
  };

  const handleDownloadAll = () => {
    addAuditEntry('MEETING_DOWNLOAD', 'Downloaded all meeting assets as secure ZIP', 'INFO');
    alert('Preparing secure ZIP archive with all meeting files...\n\nFiles will be encrypted and downloaded shortly.');
  };

  const handleDownloadMeeting = (meeting) => {
    addAuditEntry('MEETING_DOWNLOAD', `Downloaded meeting: ${meeting.title}`, 'INFO');
    alert(`Downloading secure archive for: ${meeting.title}\n\nIncluding: ${meeting.attachments.join(', ')}`);
  };

  return (
    <div className="card">
      <div className="flex-between">
        <h3>Meeting Management</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-success" onClick={handleDownloadAll}>
            📦 Download All as ZIP
          </button>
          <button className="btn btn-secondary" onClick={() => setShowNewMeeting(true)}>
            ➕ New Meeting
          </button>
        </div>
      </div>
      
      <p>Secure archiving and management of meeting records</p>

      <div style={{ marginTop: '20px' }}>
        {meetings.map(meeting => (
          <div key={meeting.id} className="meeting-item">
            <div className="meeting-header">
              <div className="meeting-title">{meeting.title}</div>
              <div className="meeting-date">📅 {meeting.date}</div>
            </div>
            <div className="meeting-details">
              <p><strong>Participants:</strong> {meeting.participants.join(', ')}</p>
              <p><strong>Notes:</strong> {meeting.notes}</p>
              {meeting.attachments.length > 0 && (
                <p>
                  <strong>Attachments:</strong> {meeting.attachments.map((att, idx) => (
                    <span key={idx} className="badge badge-info" style={{ marginLeft: '5px' }}>
                      📎 {att}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <button 
              className="btn btn-small btn-secondary" 
              style={{ marginTop: '10px' }}
              onClick={() => handleDownloadMeeting(meeting)}
            >
              📥 Download Meeting Archive
            </button>
          </div>
        ))}
      </div>

      {showNewMeeting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Schedule New Meeting</h3>
              <button className="btn-close" onClick={() => setShowNewMeeting(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Meeting Title</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Participants (comma-separated)</label>
                  <input
                    type="text"
                    value={newMeeting.participants}
                    onChange={(e) => setNewMeeting({...newMeeting, participants: e.target.value})}
                    placeholder="John Doe, Jane Smith"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={newMeeting.notes}
                    onChange={(e) => setNewMeeting({...newMeeting, notes: e.target.value})}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e6ed',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Attachments (comma-separated filenames)</label>
                  <input
                    type="text"
                    value={newMeeting.attachments}
                    onChange={(e) => setNewMeeting({...newMeeting, attachments: e.target.value})}
                    placeholder="document.pdf, presentation.pptx"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowNewMeeting(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Create Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
