'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Jean-Pierre Habimana',
    email: 'admin@equitybank.rw',
    department: 'Information Security',
    phone: '+250 788 123 456',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFAEnabled, setTwoFAEnabled] = useState(true);

  const [notifications, setNotifications] = useState({
    incidents: true,
    riskUpdates: true,
    policyChanges: false,
    trainingReminders: true,
  });

  return (
    <>
      <Topbar
        title="Settings"
        subtitle="System Configuration"
      />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-wrapper">
            <div className="page-breadcrumb">Home / Dashboard / Settings</div>
            <h1 className="page-title">
              System <span>Settings</span>
            </h1>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid-2">
          {/* Card 1 — Profile Settings */}
          <div className="card fade-in stagger-1">
            <div className="card-header">
              <h2 className="card-title">👤 Profile Settings</h2>
            </div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-input"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" style={{ marginTop: 4 }}>
              Update Profile
            </button>
          </div>

          {/* Card 2 — Security Settings */}
          <div className="card fade-in stagger-2">
            <div className="card-header">
              <h2 className="card-title">🔐 Security Settings</h2>
            </div>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter current password"
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter new password"
                value={security.newPassword}
                onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm new password"
                value={security.confirmPassword}
                onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
              />
            </div>

            {/* 2FA Toggle */}
            <div className="form-group">
              <label className="form-label">Two-Factor Authentication</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Toggle Switch */}
                <div
                  onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: twoFAEnabled
                      ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))'
                      : 'var(--bg-surface)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease',
                    border: `1px solid ${twoFAEnabled ? 'var(--accent-cyan)' : 'var(--border)'}`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: 2,
                      left: twoFAEnabled ? 25 : 2,
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {twoFAEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {twoFAEnabled
                      ? 'Your account is protected with 2FA via authenticator app'
                      : 'Enable 2FA for enhanced account security'}
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: 4 }}>
              Update Security
            </button>
          </div>

          {/* Card 3 — Notification Preferences */}
          <div className="card fade-in stagger-3">
            <div className="card-header">
              <h2 className="card-title">🔔 Notification Preferences</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              Choose which email notifications you would like to receive.
            </p>

            {[
              { key: 'incidents' as const, label: 'Incident Alerts', desc: 'Receive alerts when new security incidents are created or escalated' },
              { key: 'riskUpdates' as const, label: 'Risk Updates', desc: 'Get notified when risk assessments are updated or new risks are identified' },
              { key: 'policyChanges' as const, label: 'Policy Changes', desc: 'Notifications when policies are published, updated, or require review' },
              { key: 'trainingReminders' as const, label: 'Training Reminders', desc: 'Reminders for upcoming training deadlines and new course assignments' },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  marginBottom: 10,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
                onClick={() =>
                  setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                }
              >
                {/* Checkbox */}
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 'var(--radius-sm)',
                    border: `2px solid ${notifications[item.key] ? 'var(--accent-cyan)' : 'var(--border-hover)'}`,
                    background: notifications[item.key] ? 'var(--accent-cyan)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {notifications[item.key] && (
                    <span style={{ color: 'white', fontSize: 12, fontWeight: 800 }}>✓</span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card 4 — System Information */}
          <div className="card fade-in stagger-4">
            <div className="card-header">
              <h2 className="card-title">ℹ️ System Information</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'App Version', value: '1.0.0' },
                { label: 'Database', value: 'Supabase PostgreSQL' },
                { label: 'Framework', value: 'Next.js 16' },
                { label: 'Auth', value: 'NextAuth v5' },
                { label: 'Last Backup', value: '2026-08-13 02:00 UTC' },
                { label: 'Uptime', value: '99.97%' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '13px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontFamily: item.label === 'Last Backup' || item.label === 'App Version'
                        ? "'JetBrains Mono', monospace"
                        : 'inherit',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                padding: '12px 16px',
                background: 'var(--success-dim)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>🟢</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)' }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
