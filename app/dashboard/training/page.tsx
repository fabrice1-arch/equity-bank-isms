'use client';

import Topbar from '@/components/layout/Topbar';

const kpiData = [
  { label: 'Total Courses', value: '5', icon: '📚', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { label: 'Completion Rate', value: '73%', icon: '✅', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { label: 'Avg Score', value: '84%', icon: '🎯', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { label: 'Phishing Simulations', value: '4', icon: '🎣', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
];

const trainingCourses = [
  {
    title: 'Information Security Fundamentals',
    description: 'Core concepts of information security, CIA triad, and ISO 27001 basics for all Equity Bank employees.',
    targetRole: 'All Staff',
    duration: '2 hours',
    passingScore: 80,
    dueDate: '2026-09-15',
    completion: 89,
    mandatory: true,
  },
  {
    title: 'Phishing Awareness & Email Security',
    description: 'Identify and report phishing attempts, social engineering tactics, and suspicious email indicators.',
    targetRole: 'All Staff',
    duration: '1.5 hours',
    passingScore: 85,
    dueDate: '2026-09-01',
    completion: 76,
    mandatory: true,
  },
  {
    title: 'Secure Coding Practices',
    description: 'OWASP Top 10, secure API development, input validation, and vulnerability prevention for developers.',
    targetRole: 'IT / Engineering',
    duration: '4 hours',
    passingScore: 75,
    dueDate: '2026-10-01',
    completion: 54,
    mandatory: true,
  },
  {
    title: 'Data Privacy & GDPR Compliance',
    description: 'Data protection principles, customer consent management, and regulatory obligations under GDPR/DPA.',
    targetRole: 'Management',
    duration: '3 hours',
    passingScore: 80,
    dueDate: '2026-09-30',
    completion: 68,
    mandatory: false,
  },
  {
    title: 'Incident Response Procedures',
    description: 'Step-by-step incident reporting, escalation paths, containment strategies, and post-incident reviews.',
    targetRole: 'IT Security',
    duration: '2.5 hours',
    passingScore: 90,
    dueDate: '2026-08-31',
    completion: 82,
    mandatory: true,
  },
];

const phishingSimulations = [
  {
    campaign: 'Q2 Executive Spear Phishing',
    sent: 45,
    clicked: 4,
    reported: 38,
    clickRate: 8.9,
    department: 'Executive',
    date: '2026-06-15',
  },
  {
    campaign: 'Branch Staff Email Lure',
    sent: 320,
    clicked: 67,
    reported: 198,
    clickRate: 20.9,
    department: 'Branch Operations',
    date: '2026-05-22',
  },
  {
    campaign: 'IT Credential Harvesting',
    sent: 85,
    clicked: 6,
    reported: 74,
    clickRate: 7.1,
    department: 'IT Department',
    date: '2026-07-10',
  },
  {
    campaign: 'HR Benefits Phishing',
    sent: 210,
    clicked: 72,
    reported: 105,
    clickRate: 34.3,
    department: 'All Departments',
    date: '2026-04-18',
  },
];

function getClickRateColor(rate: number) {
  if (rate < 15) return 'var(--success)';
  if (rate <= 30) return 'var(--warning)';
  return 'var(--danger)';
}

function getRoleBadge(role: string) {
  switch (role) {
    case 'All Staff': return 'badge badge-info';
    case 'IT / Engineering': return 'badge badge-purple';
    case 'IT Security': return 'badge badge-critical';
    case 'Management': return 'badge badge-medium';
    default: return 'badge badge-ghost';
  }
}

export default function TrainingPage() {
  return (
    <>
      <Topbar
        title="Security Training"
        subtitle="Security Awareness & Compliance Training"
      />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-wrapper">
            <div className="page-breadcrumb">Home / Dashboard / Training</div>
            <h1 className="page-title">
              Security <span>Training</span>
            </h1>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-4" style={{ marginBottom: 28 }}>
          {kpiData.map((kpi) => (
            <div
              key={kpi.label}
              className="kpi-card fade-in"
              style={
                {
                  '--kpi-color': kpi.color,
                  '--kpi-bg': kpi.bg,
                } as React.CSSProperties
              }
            >
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-body">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Training Courses */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
            📚 Training Courses
          </h2>
          <div className="grid-2">
            {trainingCourses.map((course, i) => (
              <div key={i} className={`card fade-in stagger-${i + 1}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span className={getRoleBadge(course.targetRole)}>{course.targetRole}</span>
                  {course.mandatory && (
                    <span className="badge badge-critical">Mandatory</span>
                  )}
                </div>

                <h3 className="card-title" style={{ marginBottom: 8, fontSize: 15 }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                  {course.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16, fontSize: 12 }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Duration</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.duration}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Passing Score</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.passingScore}%</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Due Date</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {course.dueDate}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Completion</span>
                    <span style={{ fontWeight: 700, color: course.completion >= 75 ? 'var(--success)' : 'var(--warning)' }}>
                      {course.completion}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${course.completion}%`,
                        background: course.completion >= 75
                          ? 'linear-gradient(90deg, var(--success), #34d399)'
                          : 'linear-gradient(90deg, var(--warning), #fbbf24)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phishing Simulation Results */}
        <div className="card fade-in">
          <div className="card-header">
            <h2 className="card-title">🎣 Phishing Simulation Results</h2>
            <span className="badge badge-info">{phishingSimulations.length} Campaigns</span>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Sent</th>
                  <th>Clicked</th>
                  <th>Reported</th>
                  <th>Click Rate</th>
                  <th>Department</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {phishingSimulations.map((sim, i) => (
                  <tr key={i} className={`fade-in stagger-${i + 1}`}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sim.campaign}</td>
                    <td>{sim.sent}</td>
                    <td>{sim.clicked}</td>
                    <td>{sim.reported}</td>
                    <td>
                      <span style={{
                        fontWeight: 700,
                        color: getClickRateColor(sim.clickRate),
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13,
                      }}>
                        {sim.clickRate}%
                      </span>
                    </td>
                    <td>{sim.department}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{sim.date}</td>
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
