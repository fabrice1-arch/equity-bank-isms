'use client';

import Topbar from '@/components/layout/Topbar';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const kpiData = [
  {
    label: 'Total Risks',
    value: 47,
    icon: '⚠️',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.1)',
  },
  {
    label: 'Critical Risks',
    value: 8,
    icon: '🔴',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
  },
  {
    label: 'Open Incidents',
    value: 12,
    icon: '🚨',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    label: 'Compliance Score',
    value: '78%',
    icon: '✅',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
];

const riskTrendData = [
  { month: 'Jan', critical: 5, high: 12, medium: 18, low: 7 },
  { month: 'Feb', critical: 7, high: 14, medium: 16, low: 9 },
  { month: 'Mar', critical: 6, high: 11, medium: 20, low: 6 },
  { month: 'Apr', critical: 9, high: 15, medium: 17, low: 8 },
  { month: 'May', critical: 8, high: 13, medium: 21, low: 10 },
  { month: 'Jun', critical: 10, high: 16, medium: 19, low: 11 },
  { month: 'Jul', critical: 7, high: 12, medium: 22, low: 9 },
  { month: 'Aug', critical: 8, high: 14, medium: 20, low: 12 },
  { month: 'Sep', critical: 6, high: 10, medium: 18, low: 8 },
  { month: 'Oct', critical: 9, high: 17, medium: 23, low: 10 },
  { month: 'Nov', critical: 11, high: 18, medium: 24, low: 13 },
  { month: 'Dec', critical: 8, high: 15, medium: 21, low: 11 },
];

const incidentBreakdown = [
  { name: 'Phishing', value: 35 },
  { name: 'Ransomware', value: 20 },
  { name: 'Insider', value: 15 },
  { name: 'API Breach', value: 18 },
  { name: 'DDoS', value: 12 },
];

const PIE_COLORS = ['#ef4444', '#f97316', '#8b5cf6', '#06b6d4', '#f59e0b'];

const complianceData = [
  { label: 'ISO 27001', score: 78, color: '#06b6d4' },
  { label: 'PCI-DSS', score: 85, color: '#8b5cf6' },
  { label: 'GDPR', score: 91, color: '#22c55e' },
];

const recentActivity = [
  {
    id: 1,
    icon: '🚨',
    text: 'Phishing attempt detected on corporate email gateway',
    time: '2 min ago',
    type: 'incident',
  },
  {
    id: 2,
    icon: '🔐',
    text: 'Admin login from new IP: 196.12.45.101 — Kigali, RW',
    time: '14 min ago',
    type: 'access',
  },
  {
    id: 3,
    icon: '📋',
    text: 'Data Retention Policy v3.1 updated and published',
    time: '1 hr ago',
    type: 'policy',
  },
  {
    id: 4,
    icon: '⚠️',
    text: 'High-risk vulnerability CVE-2025-3421 identified in prod',
    time: '3 hr ago',
    type: 'risk',
  },
  {
    id: 5,
    icon: '🎓',
    text: 'Security awareness training completed by 23 staff members',
    time: '5 hr ago',
    type: 'training',
  },
];

const chartAxisStyle = { fill: '#94a3b8', fontSize: 12 };
const chartGridStyle = { stroke: 'rgba(255,255,255,0.05)' };

export default function DashboardPage() {
  return (
    <>
      <Topbar
        title="Security Dashboard"
        subtitle="Equity Bank Rwanda PLC — ISMS Overview"
      />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-wrapper">
            <div className="page-breadcrumb">Home / Dashboard</div>
            <h1 className="page-title">
              Security <span>Dashboard</span>
            </h1>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-4">
          {kpiData.map((kpi) => (
            <div
              key={kpi.label}
              className="kpi-card"
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

        {/* Charts Row */}
        <div className="grid-cols-3-1">
          {/* Area Chart — Risk Trends */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h2 className="chart-card-title">Monthly Risk Trends</h2>
              <span className="chart-card-sub">Jan – Dec 2025</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="gCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" {...chartGridStyle} />
                <XAxis dataKey="month" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
                <Area type="monotone" dataKey="critical" stroke="#06b6d4" fill="url(#gCritical)" strokeWidth={2} />
                <Area type="monotone" dataKey="high" stroke="#f97316" fill="url(#gHigh)" strokeWidth={2} />
                <Area type="monotone" dataKey="medium" stroke="#eab308" fill="url(#gMedium)" strokeWidth={2} />
                <Area type="monotone" dataKey="low" stroke="#22c55e" fill="url(#gLow)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart — Incident Types */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h2 className="chart-card-title">Incident Types</h2>
              <span className="chart-card-sub">2025</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={incidentBreakdown}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {incidentBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
                <Legend
                  wrapperStyle={{ color: '#94a3b8', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid-2">
          {/* Compliance Status */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h2 className="chart-card-title">Compliance Status</h2>
              <span className="chart-card-sub">Framework scores</span>
            </div>
            <div className="compliance-list">
              {complianceData.map((item) => (
                <div key={item.label} className="compliance-item">
                  <div className="compliance-header">
                    <span className="compliance-label">{item.label}</span>
                    <span className="compliance-score" style={{ color: item.color }}>
                      {item.score}%
                    </span>
                  </div>
                  <div className="compliance-bar-bg">
                    <div
                      className="compliance-bar-fill"
                      style={{ width: `${item.score}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h2 className="chart-card-title">Recent Activity</h2>
              <span className="chart-card-sub">Live feed</span>
            </div>
            <div className="activity-list">
              {recentActivity.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className="activity-icon">{item.icon}</div>
                  <div className="activity-body">
                    <div className="activity-text">{item.text}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
