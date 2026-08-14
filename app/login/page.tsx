'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials. Please check your email and password.');
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  const demoAccounts = [
    { email: 'admin@equitybank.rw', role: 'ADMIN' },
    { email: 'security@equitybank.rw', role: 'SECURITY_OFFICER' },
    { email: 'auditor@equitybank.rw', role: 'AUDITOR' },
  ];

  return (
    <div className="login-page">
      <div className="login-bg-grid" />
      <div className="login-bg-glow" />

      <div className="login-card">
        <div className="login-logo-wrapper">
          <div className="login-logo">🏛️</div>
          <div className="login-bank-name">EQUITY BANK RWANDA PLC</div>
          <h1 className="login-title">Security Management Portal</h1>
          <p className="login-subtitle">ISO 27001:2022 Compliant System</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@equitybank.rw"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-divider" />

        <div className="login-demo-accounts">
          <div className="login-demo-title">Demo Accounts</div>
          {demoAccounts.map((account) => (
            <div
              key={account.email}
              className="login-demo-item"
              onClick={() => {
                setEmail(account.email);
                setPassword('Password123!');
              }}
            >
              <span className="login-demo-email">{account.email}</span>
              <span className="login-demo-role">{account.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
