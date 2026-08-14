'use client';

import Topbar from '@/components/layout/Topbar';

/* ─── Lifecycle Steps ─── */
const lifecycleSteps = [
  { label: 'Detection', icon: '🔍' },
  { label: 'Reporting', icon: '📢' },
  { label: 'Containment', icon: '🛡️' },
  { label: 'Eradication', icon: '🧹' },
  { label: 'Recovery', icon: '🔄' },
  { label: 'Lessons', icon: '📝' },
];

/* ─── Incidents Data ─── */
const incidents = [
  {
    id: 'INC-2025-001',
    title: 'Phishing Attack on Corporate Email Gateway',
    severity: 'P1',
    status: 'CONTAINED',
    affectedSystems: 'Exchange Server, AD',
    reporter: 'SOC Team',
    detected: '2025-08-12 09:15',
  },
  {
    id: 'INC-2025-002',
    title: 'Suspicious API Calls to Payment Gateway',
    severity: 'P2',
    status: 'OPEN',
    affectedSystems: 'Payment Gateway API',
    reporter: 'WAF Alert',
    detected: '2025-08-13 14:32',
  },
  {
    id: 'INC-2025-003',
    title: 'Ransomware Detected on Branch Workstation',
    severity: 'P1',
    status: 'IN_PROGRESS',
    affectedSystems: 'Branch-KGL-04 PC',
    reporter: 'IT Helpdesk',
    detected: '2025-08-13 16:48',
  },
  {
    id: 'INC-2025-004',
    title: 'Unauthorized Privileged Account Access',
    severity: 'P2',
    status: 'RESOLVED',
    affectedSystems: 'T24 Core Banking',
    reporter: 'PAM Alert',
    detected: '2025-08-10 11:05',
  },
  {
    id: 'INC-2025-005',
    title: 'DDoS Attack on Mobile Banking Platform',
    severity: 'P3',
    status: 'CLOSED',
    affectedSystems: 'EazzyBanking API',
    reporter: 'NOC Team',
    detected: '2025-08-08 02:20',
  },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'P1':
      return 'badge badge-critical';
    case 'P2':
      return 'badge badge-high';
    case 'P3':
      return 'badge badge-medium';
    case 'P4':
      return 'badge badge-low';
    default:
      return 'badge badge-ghost';
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'OPEN':
      return 'badge badge-open';
    case 'IN_PROGRESS':
      return 'badge badge-in-progress';
    case 'CONTAINED':
      return 'badge badge-purple';
    case 'RESOLVED':
      return 'badge badge-resolved';
    case 'CLOSED':
      return 'badge badge-closed';
    default:
      return 'badge badge-ghost';
  }
}

function formatStatus(status: string) {
  return status.replace(/_/g, ' ');
}

export default function IncidentsPage() {
  return (
    <>
      <Topbar title="Incident Response" subtitle="Security Incident Management" />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-top">
            <div className="page-title-wrapper">
              <div className="page-breadcrumb">Home / Dashboard / Incidents</div>
              <h1 className="page-title">
                Incident <span>Response</span>
              </h1>
            </div>
            <div className="page-actions">
              <button className="btn btn-primary">+ Report Incident</button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 fade-in">
          {[
            { label: 'Total Incidents', value: '12', icon: '🚨', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
            { label: 'Open', value: '3', icon: '🔴', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
            { label: 'Mean Time to Resolve', value: '4.2 hrs', icon: '⏱️', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            { label: 'Regulatory Notified', value: '2', icon: '📋', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className={`kpi-card fade-in stagger-${i + 1}`}
              style={{ '--kpi-color': kpi.color, '--kpi-bg': kpi.bg } as React.CSSProperties}
            >
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-body">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Incident Lifecycle Timeline */}
        <div className="card fade-in stagger-3" style={{ marginTop: 24 }}>
          <div className="card-header">
            <h2 className="card-title">Incident Lifecycle</h2>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '8px 0',
            }}
          >
            {/* Connecting line */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 40,
                right: 40,
                height: 2,
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue), var(--accent-purple))',
                transform: 'translateY(-50%)',
                zIndex: 0,
                opacity: 0.5,
              }}
            />

            {lifecycleSteps.map((step, index) => (
              <div
                key={step.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  position: 'relative',
                  zIndex: 1,
                  flex: 1,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: index <= 2 ? 'var(--accent-cyan)' : 'var(--bg-surface)',
                    border: `2px solid ${index <= 2 ? 'var(--accent-cyan)' : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    boxShadow: index <= 2 ? '0 0 16px rgba(6,182,212,0.3)' : 'none',
                    transition: 'var(--transition)',
                  }}
                >
                  {step.icon}
                </div>
                {/* Label */}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: index <= 2 ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents Table */}
        <div className="card fade-in stagger-4" style={{ marginTop: 24 }}>
          <div className="card-header">
            <h2 className="card-title">Incident Log</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm">Filter</button>
              <button className="btn btn-secondary btn-sm">Export</button>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Affected Systems</th>
                  <th>Reporter</th>
                  <th>Detected</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      {inc.id}
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500, maxWidth: 260 }}>
                      {inc.title}
                    </td>
                    <td>
                      <span className={getSeverityBadge(inc.severity)}>{inc.severity}</span>
                    </td>
                    <td>
                      <span className={getStatusBadge(inc.status)}>{formatStatus(inc.status)}</span>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{inc.affectedSystems}</td>
                    <td>{inc.reporter}</td>
                    <td
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {inc.detected}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost btn-sm" title="View Details">
                          👁️
                        </button>
                        <button className="btn btn-ghost btn-sm" title="Escalate">
                          ⬆️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
