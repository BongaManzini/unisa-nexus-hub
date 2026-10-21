import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const TeamSharing = () => {
  const { currentUser, teams, updateTeamMember } = useAppContext();
  const [editingMember, setEditingMember] = useState(null);
  const [editRole, setEditRole] = useState('');

  const isAdmin = currentUser?.role === 'Owner/Admin';

  const handleEditRole = (teamType, member) => {
    if (!isAdmin) {
      alert('Only Admins can modify team roles');
      return;
    }
    setEditingMember({ ...member, teamType });
    setEditRole(member.role);
  };

  const handleSaveRole = () => {
    updateTeamMember(editingMember.teamType, editingMember.id, { role: editRole });
    setEditingMember(null);
    setEditRole('');
  };

  return (
    <div className="card">
      <h3>Team Sharing & RBAC</h3>
      <p>Role-Based Access Control for team members</p>

      {!isAdmin && (
        <div className="alert alert-warning">
          You have read-only access to team information. Only Admins can modify roles.
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: '#003366', marginBottom: '15px' }}>Core Leadership Team</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {teams.coreLeadership.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>
                  <span className="badge badge-info">{member.role}</span>
                </td>
                <td>{member.email}</td>
                {isAdmin && (
                  <td>
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={() => handleEditRole('coreLeadership', member)}
                    >
                      ✏️ Edit Role
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: '#003366', marginBottom: '15px' }}>Mars Rover Project Team</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {teams.marsRover.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>
                  <span className="badge badge-info">{member.role}</span>
                </td>
                <td>{member.email}</td>
                {isAdmin && (
                  <td>
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={() => handleEditRole('marsRover', member)}
                    >
                      ✏️ Edit Role
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Role: {editingMember.name}</h3>
              <button className="btn-close" onClick={() => setEditingMember(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>New Role</label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  placeholder="Enter new role"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditingMember(null)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveRole}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSharing;
