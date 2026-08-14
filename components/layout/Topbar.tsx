'use client';

import { useEffect, useState } from 'react';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [time, setTime] = useState('');

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

  return (
    <div className="topbar">
      <div className="topbar-title">
        {title}
        {subtitle && <small>{subtitle}</small>}
      </div>
      <div className="topbar-actions">
        <div className="topbar-time">{time}</div>
        <button className="topbar-btn" title="Notifications">
          🔔
          <span className="notification-dot" />
        </button>
        <button className="topbar-btn" title="Settings">
          ⚙️
        </button>
      </div>
    </div>
  );
}
