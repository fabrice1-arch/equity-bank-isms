'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

const recentNotifications = [
  { id: 1, text: 'P1 Critical — Unauthorized access detected on CBS', time: '2 min ago', type: 'danger' },
  { id: 2, text: 'Phishing simulation Q3 completed — 12% click rate', time: '1 hour ago', type: 'success' },
  { id: 3, text: 'Encryption key rotation due for ATM Network', time: '3 hours ago', type: 'warning' },
  { id: 4, text: 'Policy review deadline: Remote Work Security Policy', time: '5 hours ago', type: 'info' },
  { id: 5, text: 'New audit log export requested by Emmanuel Niyonzima', time: '1 day ago', type: 'info' },
];

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [time, setTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-wrapper')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const dotColor: Record<string, string> = {
    danger: 'var(--danger)',
    warning: 'var(--warning)',
    success: 'var(--success)',
    info: 'var(--accent-cyan)',
  };

  return (
    <div className="topbar">
      <div className="topbar-title">
        {title}
        {subtitle && <small className="topbar-subtitle"> — {subtitle}</small>}
      </div>
      <div className="topbar-actions">
        <div className="topbar-time">{time}</div>

        {/* Notification Bell */}
        <div className="notification-wrapper" style={{ position: 'relative' }}>
          <button
            className="topbar-btn"
            title="Notifications"
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
          >
            🔔
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '380px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 200,
                overflow: 'hidden',
                animation: 'fadeIn 0.2s ease',
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                  Notifications
                </span>
                <span
                  style={{
                    background: 'var(--danger)',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '99px',
                  }}
                >
                  {recentNotifications.length}
                </span>
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {recentNotifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '14px 20px',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--bg-card-hover)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: dotColor[n.type] || 'var(--accent-cyan)',
                        marginTop: '6px',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {n.text}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          marginTop: '4px',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--accent-cyan)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setShowNotifications(false);
                    router.push('/dashboard/audit-logs');
                  }}
                >
                  View All Activity →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          className="topbar-btn"
          title="Settings"
          onClick={() => router.push('/dashboard/settings')}
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}
