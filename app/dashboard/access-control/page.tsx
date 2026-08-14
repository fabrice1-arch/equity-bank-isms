'use client';

import Topbar from '@/components/layout/Topbar';

/* ─── Access Review Data ─── */
const accessReviews = [
  {
    user: 'James Mugisha',
    system: 'T24 Core Banking',
    accessLevel: 'ADMIN',
    status: 'APPROVED',
    lastReviewed: '2025-07-15',
    nextReview: '2025-10-15',
  },
  {
    user: 'Alice Uwimana',
    system: 'CRM Database',
    accessLevel: 'PRIVILEGED',
    status: 'APPROVED',
    lastReviewed: '2025-08-01',
    nextReview: '2025-11-01',
  },
  {
    user: 'Patrick Nkurunziza',
    system: 'Treasury Platform',
    accessLevel: 'WRITE',
    status: 'PENDING',
    lastReviewed: '2025-06-20',
    nextReview: '2025-09-20',
  },
  {
    user: 'Grace Ingabire',
    system: 'Payment Gateway',
    accessLevel: 'ADMIN',
    status: 'APPROVED',
    lastReviewed: '2025-07-30',
    nextReview: '2025-10-30',
  },
  {
    user: 'David Habimana',
    system: 'EazzyBanking API',
    accessLevel: 'READ',
    status: 'OVERDUE',
    lastReviewed: '2025-03-10',
    nextReview: '2025-06-10',
  },
  {
    user: 'Sarah Mukamana',
    system: 'SIEM / Splunk',
    accessLevel: 'WRITE',
    status: 'APPROVED',
    lastReviewed: '2025-08-05',
    nextReview: '2025-11-05',
  },
];

/* ─── Privileged Access Summary ─── */
const privilegedAccess = [
  { system: 'T24 Core Banking', count: 4 },
  { system: 'Payment Gateway', count: 3 },
  { system: 'Treasury Platform', count: 2 },
  { system: 'Active Directory', count: 5 },
  { system: 'Database Admin (DBA)', count: 2 },
  { system: 'Firewall / WAF', count: 3 },
];

function getAccessBadge(level: string) {
  switch (level) {
    case 'ADMIN':
      return 'badge badge-critical';
    case 'PRIVILEGED':
      return 'badge badge-purple';
    case 'WRITE':
      return 'badge badge-high';
    case 'READ':
      return 'badge badge-info';
    default:
      return 'badge badge-ghost';
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'APPROVED':
      return 'badge badge-resolved';
    case 'PENDING':
      return 'badge badge-in-progress';
    case 'OVERDUE':
      return 'badge badge-open';
    default:
      return 'badge badge-ghost';
  }
}

export default function AccessControlPage() {
  return (
    <>
      <Topbar title="Access Control" subtitle="User Access Reviews & Privileged Access" />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-top">
            <div className="page-title-wrapper">
              <div className="page-breadcrumb">Home / Dashboard / Access Control</div>
              <h1 className="page-title">
                Access <span>Control</span>
              </h1>
            </div>
            <div className="page-actions">
              <button className="btn btn-primary">+ New Review</button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 fade-in">
          {[
            { label: 'Total Reviews', value: '6', icon: '📋', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
            { label: 'Approved', value: '3', icon: '✅', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            { label: 'Pending', value: '1', icon: '⏳', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            { label: 'Overdue', value: '1', icon: '🔴', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
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

        <div className="grid-cols-2-1" style={{ marginTop: 24 }}>
          {/* Access Review Table */}
          <div className="card fade-in stagger-3">
            <div className="card-header">
              <h2 className="card-title">Access Reviews</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm">Filter</button>
                <button className="btn btn-secondary btn-sm">Export</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>System</th>
                    <th>Access Level</th>
                    <th>Status</th>
                    <th>Last Reviewed</th>
                    <th>Next Review</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accessReviews.map((review, idx) => (
                    <tr key={idx}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{review.user}</td>
                      <td>{review.system}</td>
                      <td>
                        <span className={getAccessBadge(review.accessLevel)}>{review.accessLevel}</span>
                      </td>
                      <td>
                        <span className={getStatusBadge(review.status)}>{review.status}</span>
                      </td>
                      <td
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {review.lastReviewed}
                      </td>
                      <td
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color:
                            review.status === 'OVERDUE' ? 'var(--danger)' : 'var(--text-muted)',
                          fontWeight: review.status === 'OVERDUE' ? 700 : 400,
                        }}
                      >
                        {review.nextReview}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" title="Review">
                            👁️
                          </button>
                          <button className="btn btn-ghost btn-sm" title="Revoke">
                            🚫
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privileged Access Summary */}
          <div className="card fade-in stagger-4">
            <div className="card-header">
              <h2 className="card-title">Privileged Access Summary</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Systems with elevated user privileges
            </p>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>System</th>
                    <th style={{ textAlign: 'center' }}>Privileged Users</th>
                  </tr>
                </thead>
                <tbody>
                  {privilegedAccess.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>
                        {item.system}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background:
                              item.count >= 4
                                ? 'rgba(239,68,68,0.15)'
                                : item.count >= 3
                                ? 'rgba(245,158,11,0.15)'
                                : 'rgba(6,182,212,0.15)',
                            color:
                              item.count >= 4
                                ? 'var(--danger)'
                                : item.count >= 3
                                ? 'var(--warning)'
                                : 'var(--accent-cyan)',
                            fontWeight: 800,
                            fontSize: 14,
                          }}
                        >
                          {item.count}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                marginTop: 8,
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                Total Privileged Accounts
              </span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: 'var(--accent-cyan)',
                }}
              >
                {privilegedAccess.reduce((sum, item) => sum + item.count, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
