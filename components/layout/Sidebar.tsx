'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    section: 'OVERVIEW',
    items: [{ label: 'Dashboard', path: '/dashboard', icon: '🏠' }],
  },
  {
    section: 'SECURITY MODULES',
    items: [
      { label: 'Risk Assessment', path: '/dashboard/risk-assessment', icon: '⚠️' },
      { label: 'Incident Response', path: '/dashboard/incidents', icon: '🚨', badge: 3 },
      { label: 'Access Control', path: '/dashboard/access-control', icon: '🔐' },
      { label: 'Encryption & Policies', path: '/dashboard/encryption-policies', icon: '🔒' },
      { label: 'Audit Logs', path: '/dashboard/audit-logs', icon: '📋' },
      { label: 'Security Training', path: '/dashboard/training', icon: '🎓' },
    ],
  },
  {
    section: 'SYSTEM',
    items: [{ label: 'Settings', path: '/dashboard/settings', icon: '⚙️' }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name ?? 'User';
  const userRole = (session?.user as { role?: string })?.role ?? 'USER';
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          {/* Equity Bank Rwanda Official Logo Mark */}
          <div className="sidebar-logo">
            {/* House/Home SVG — Equity Bank's signature icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.15)"/>
              <path d="M12 3L21 12V21H15V15H9V21H3V12L12 3Z" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <div className="sidebar-brand-text">
            {/* "Equity" wordmark in brand red */}
            <span className="sidebar-brand-name">
              <span style={{ color: 'var(--equity-red)', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em' }}>Equity</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '13px' }}> Bank Rwanda</span>
            </span>
            <span className="sidebar-brand-sub">ISMS · ISO 27001:2022</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.section} className="sidebar-section">
            <div className="sidebar-section-label">{section.section}</div>
            {section.items.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`sidebar-item${isActive ? ' active' : ''}`}
                >
                  <span className="sidebar-item-icon">{item.icon}</span>
                  <span className="sidebar-item-label">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{avatarLetter}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-role">{userRole}</div>
          </div>
          <button
            className="sidebar-signout"
            onClick={() => signOut({ callbackUrl: '/login' })}
            title="Sign out"
          >
            ⏻
          </button>
        </div>
      </div>
    </aside>
  );
}
