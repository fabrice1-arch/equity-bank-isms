'use client';

import Topbar from '@/components/layout/Topbar';

/* ─── Risk Register Data ─── */
const risks = [
  {
    id: 'RSK-001',
    title: 'Core Banking System Downtime',
    asset: 'T24 Core Banking',
    level: 'critical',
    score: 25,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'James Mugisha',
  },
  {
    id: 'RSK-002',
    title: 'Customer Data Exfiltration',
    asset: 'CRM Database',
    level: 'critical',
    score: 20,
    treatment: 'Mitigate',
    status: 'In Progress',
    owner: 'Alice Uwimana',
  },
  {
    id: 'RSK-003',
    title: 'Insider Trading via Privileged Access',
    asset: 'Treasury Platform',
    level: 'high',
    score: 16,
    treatment: 'Mitigate',
    status: 'Open',
    owner: 'Patrick Nkurunziza',
  },
  {
    id: 'RSK-004',
    title: 'DDoS Attack on Mobile Banking',
    asset: 'EazzyBanking API',
    level: 'high',
    score: 15,
    treatment: 'Transfer',
    status: 'Mitigated',
    owner: 'Grace Ingabire',
  },
  {
    id: 'RSK-005',
    title: 'Third-Party API Key Leak',
    asset: 'Payment Gateway',
    level: 'high',
    score: 12,
    treatment: 'Mitigate',
    status: 'In Progress',
    owner: 'David Habimana',
  },
  {
    id: 'RSK-006',
    title: 'Phishing Campaign Targeting Staff',
    asset: 'Corporate Email',
    level: 'medium',
    score: 9,
    treatment: 'Mitigate',
    status: 'Mitigated',
    owner: 'Sarah Mukamana',
  },
  {
    id: 'RSK-007',
    title: 'Unpatched ATM Controller Firmware',
    asset: 'ATM Network',
    level: 'medium',
    score: 8,
    treatment: 'Accept',
    status: 'Open',
    owner: 'Eric Ndayisaba',
  },
  {
    id: 'RSK-008',
    title: 'Physical Access to Server Room',
    asset: 'Data Center',
    level: 'low',
    score: 4,
    treatment: 'Mitigate',
    status: 'Mitigated',
    owner: 'Jean Uwayo',
  },
];

/* ─── Heatmap cell data (impact x likelihood) ─── */
// heatmap[row][col] = number of risks in that cell
// Rows: Impact 5→1 (top→bottom), Cols: Likelihood 1→5 (left→right)
const heatmapData: number[][] = [
  [0, 1, 2, 3, 2], // Impact 5
  [1, 2, 3, 2, 1], // Impact 4
  [2, 3, 4, 2, 1], // Impact 3
  [3, 4, 2, 1, 0], // Impact 2
  [5, 3, 2, 1, 0], // Impact 1
];

function getHeatmapColor(impact: number, likelihood: number): string {
  const score = impact * likelihood;
  if (score >= 15) return '#ef4444';       // Critical – red
  if (score >= 10) return '#f97316';       // High – orange
  if (score >= 5) return '#f59e0b';        // Medium – yellow/amber
  return '#10b981';                         // Low – green
}

function getLevelBadge(level: string) {
  const cls: Record<string, string> = {
    critical: 'badge badge-critical',
    high: 'badge badge-high',
    medium: 'badge badge-medium',
    low: 'badge badge-low',
  };
  return cls[level] || 'badge badge-ghost';
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Open':
      return 'badge badge-open';
    case 'In Progress':
      return 'badge badge-in-progress';
    case 'Mitigated':
      return 'badge badge-resolved';
    default:
      return 'badge badge-ghost';
  }
}

export default function RiskAssessmentPage() {
  return (
    <>
      <Topbar title="Risk Assessment" subtitle="Risk Register & Heatmap" />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-header-top">
            <div className="page-title-wrapper">
              <div className="page-breadcrumb">Home / Dashboard / Risk Assessment</div>
              <h1 className="page-title">
                Risk <span>Assessment</span>
              </h1>
            </div>
            <div className="page-actions">
              <button className="btn btn-primary">+ Add Risk</button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-4 fade-in">
          {[
            { label: 'Total Risks', value: 47, icon: '⚠️', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
            { label: 'Critical', value: 8, icon: '🔴', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
            { label: 'High', value: 15, icon: '🟠', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
            { label: 'Mitigated', value: 24, icon: '✅', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
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

        {/* Risk Heatmap */}
        <div className="card fade-in stagger-3" style={{ marginTop: 24 }}>
          <div className="card-header">
            <h2 className="card-title">Risk Heatmap (Impact × Likelihood)</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
            {/* Y-axis label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                paddingRight: 8,
                minWidth: 24,
              }}
            >
              IMPACT
            </div>

            <div style={{ flex: 1 }}>
              {/* Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '36px repeat(5, 1fr)',
                  gridTemplateRows: 'repeat(5, 56px) 36px',
                  gap: 4,
                }}
              >
                {heatmapData.map((row, ri) => {
                  const impact = 5 - ri; // Impact from 5 down to 1
                  return [
                    /* Row label */
                    <div
                      key={`label-${ri}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {impact}
                    </div>,
                    /* Cells */
                    ...row.map((count, ci) => {
                      const likelihood = ci + 1;
                      const bgColor = getHeatmapColor(impact, likelihood);
                      return (
                        <div
                          key={`cell-${ri}-${ci}`}
                          style={{
                            background: bgColor,
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            fontWeight: 800,
                            color: 'white',
                            opacity: count > 0 ? 1 : 0.5,
                            transition: 'var(--transition)',
                            cursor: 'pointer',
                          }}
                          title={`Impact: ${impact}, Likelihood: ${likelihood}, Risks: ${count}`}
                        >
                          {count}
                        </div>
                      );
                    }),
                  ];
                })}

                {/* Bottom row: empty corner + likelihood labels */}
                <div key="corner" />
                {[1, 2, 3, 4, 5].map((l) => (
                  <div
                    key={`ll-${l}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>

              {/* X-axis label */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                LIKELIHOOD
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            {[
              { label: 'Critical (15-25)', color: '#ef4444' },
              { label: 'High (10-14)', color: '#f97316' },
              { label: 'Medium (5-9)', color: '#f59e0b' },
              { label: 'Low (1-4)', color: '#10b981' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: item.color,
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Register Table */}
        <div className="card fade-in stagger-4" style={{ marginTop: 24 }}>
          <div className="card-header">
            <h2 className="card-title">Risk Register</h2>
            <button className="btn btn-secondary btn-sm">Export CSV</button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Risk ID</th>
                  <th>Title</th>
                  <th>Asset</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Treatment</th>
                  <th>Status</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {risks.map((risk) => (
                  <tr key={risk.id}>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent-cyan)' }}>
                      {risk.id}
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{risk.title}</td>
                    <td>{risk.asset}</td>
                    <td>
                      <span className={getLevelBadge(risk.level)}>
                        {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{risk.score}</td>
                    <td>
                      <span className="badge badge-ghost">{risk.treatment}</span>
                    </td>
                    <td>
                      <span className={getStatusBadge(risk.status)}>{risk.status}</span>
                    </td>
                    <td>{risk.owner}</td>
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
