import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const AuditLog = () => {
  const { auditLog } = useAppContext();
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredLogs = filterSeverity === 'ALL' 
    ? auditLog 
    : auditLog.filter(log => log.severity === filterSeverity);

  const getSeverityBadge = (severity) => {
    const badges = {
      INFO: 'badge-info',
      WARNING: 'badge-warning',
      CRITICAL: 'badge-critical'
    };
    return badges[severity] || 'badge-info';
  };

  return (
    <div className="card">
      <div className="flex-between">
        <h3>Audit Log</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            style={{
              padding: '8px 15px',
              border: '2px solid #e0e6ed',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Severities</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>
      
      <p>Immutable security audit trail of all system activities</p>

      <div className="alert alert-info" style={{ marginTop: '15px' }}>
        🔒 This log is immutable and cannot be modified. All entries are permanently recorded for compliance.
      </div>

      <table className="data-table" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log.id}>
              <td style={{ fontSize: '12px' }}>{log.timestamp}</td>
              <td><strong>{log.user}</strong></td>
              <td>
                <code style={{ 
                  backgroundColor: '#f0f4f8', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {log.action}
                </code>
              </td>
              <td style={{ fontSize: '13px' }}>{log.details}</td>
              <td>
                <span className={`badge ${getSeverityBadge(log.severity)}`}>
                  {log.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredLogs.length === 0 && (
        <div className="text-center" style={{ padding: '40px', color: '#999' }}>
          No audit entries found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default AuditLog;
