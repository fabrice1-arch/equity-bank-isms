'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';

const auditLogs = [
  {
    timestamp: '2026-08-14 11:42:18',
    user: 'admin@equitybank.rw',
    action: 'USER_LOGIN',
    resource: 'Auth Gateway',
    ip: '196.12.45.101',
    severity: 'INFO',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:38:05',
    user: 'j.habimana@equitybank.rw',
    action: 'POLICY_UPDATE',
    resource: 'Data Encryption Standard v3.0',
    ip: '196.12.45.88',
    severity: 'INFO',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:35:22',
    user: 'unknown@external.com',
    action: 'LOGIN_FAILED',
    resource: 'Auth Gateway',
    ip: '185.220.101.34',
    severity: 'WARNING',
    success: false,
  },
  {
    timestamp: '2026-08-14 11:31:47',
    user: 's.uwimana@equitybank.rw',
    action: 'KEY_ROTATION',
    resource: 'Core Banking DB — AES-256',
    ip: '196.12.45.92',
    severity: 'INFO',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:28:10',
    user: 'system@equitybank.rw',
    action: 'FIREWALL_BLOCK',
    resource: 'WAF — Rule #4821',
    ip: '103.75.190.11',
    severity: 'CRITICAL',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:22:55',
    user: 'e.mugabo@equitybank.rw',
    action: 'PERMISSION_CHANGE',
    resource: 'IAM — Role: DB_Admin',
    ip: '196.12.45.77',
    severity: 'WARNING',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:18:33',
    user: 'd.mukamana@equitybank.rw',
    action: 'INCIDENT_CREATE',
    resource: 'INC-2026-0847',
    ip: '196.12.45.65',
    severity: 'ERROR',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:14:01',
    user: 'admin@equitybank.rw',
    action: 'BACKUP_COMPLETE',
    resource: 'Prod DB — Full Backup',
    ip: '196.12.45.101',
    severity: 'INFO',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:09:44',
    user: 'p.niyonzima@equitybank.rw',
    action: 'DATA_EXPORT',
    resource: 'Customer Reports Q2',
    ip: '196.12.45.58',
    severity: 'WARNING',
    success: true,
  },
  {
    timestamp: '2026-08-14 11:02:19',
    user: 'unknown@tor-exit.net',
    action: 'BRUTE_FORCE',
    resource: 'SSH — Server PROD-03',
    ip: '23.129.64.213',
    severity: 'CRITICAL',
    success: false,
  },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'INFO': return 'badge badge-info';
    case 'WARNING': return 'badge badge-medium';
    case 'ERROR': return 'badge badge-high';
    case 'CRITICAL': return 'badge badge-critical';
    default: return 'badge badge-ghost';
  }
}

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      searchQuery === '' ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery);

    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;

    return matchesSearch && matchesSeverity && matchesAction;
  });

  return (
    <>
      <Topbar
        title="Audit Logs"
        subtitle="Activity Monitoring & Compliance"
      />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-top">
            <div className="page-title-wrapper">
              <div className="page-breadcrumb">Home / Dashboard / Audit Logs</div>
              <h1 className="page-title">
                Audit <span>Logs</span>
              </h1>
            </div>
            <div className="page-actions">
              <button className="btn btn-secondary">
                📥 Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="search-bar">
          <div className="search-input-wrapper" style={{ flex: 1 }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by user, action, resource, or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 160 }}
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="ALL">All Severities</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <select
            className="form-select"
            style={{ width: 180 }}
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="ALL">All Actions</option>
            <option value="USER_LOGIN">User Login</option>
            <option value="LOGIN_FAILED">Login Failed</option>
            <option value="POLICY_UPDATE">Policy Update</option>
            <option value="KEY_ROTATION">Key Rotation</option>
            <option value="FIREWALL_BLOCK">Firewall Block</option>
            <option value="PERMISSION_CHANGE">Permission Change</option>
            <option value="INCIDENT_CREATE">Incident Create</option>
            <option value="BACKUP_COMPLETE">Backup Complete</option>
            <option value="DATA_EXPORT">Data Export</option>
            <option value="BRUTE_FORCE">Brute Force</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="grid-cols-3-1" style={{ gridTemplateColumns: '1fr 280px' }}>
          {/* Audit Table */}
          <div className="card fade-in">
            <div className="card-header">
              <h2 className="card-title">Activity Log</h2>
              <span className="badge badge-ghost">{filteredLogs.length} entries</span>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Resource</th>
                    <th>IP Address</th>
                    <th>Severity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, i) => (
                    <tr key={i} className={`fade-in stagger-${Math.min(i + 1, 8)}`}>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, whiteSpace: 'nowrap' }}>
                        {log.timestamp}
                      </td>
                      <td style={{ fontSize: 12.5, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {log.user}
                      </td>
                      <td>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent-cyan)' }}>
                          {log.action}
                        </code>
                      </td>
                      <td style={{ fontSize: 12.5, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {log.resource}
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        {log.ip}
                      </td>
                      <td>
                        <span className={getSeverityBadge(log.severity)}>
                          {log.severity}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', fontSize: 16 }}>
                        {log.success ? (
                          <span style={{ color: 'var(--success)' }}>✓</span>
                        ) : (
                          <span style={{ color: 'var(--danger)' }}>✗</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar — Log Statistics */}
          <div className="card fade-in stagger-2" style={{ alignSelf: 'flex-start' }}>
            <div className="card-header">
              <h2 className="card-title">📊 Log Statistics</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 4 }}>
                  Total Logs Today
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-cyan)' }}>247</div>
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 4 }}>
                  Failed Actions
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--danger)' }}>12</div>
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 4 }}>
                  Critical Events
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#ef4444' }}>3</div>
              </div>
              <div style={{ padding: '14px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 4 }}>
                  Top Action
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>USER_LOGIN</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>89 occurrences</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
