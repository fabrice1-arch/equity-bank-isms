'use client'

import { useState } from 'react'

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(245,158,11,0.12), rgba(245,158,11,0.06))',
        borderBottom: '1px solid rgba(245,158,11,0.35)',
        padding: '10px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        position: 'sticky',
        top: '64px',
        zIndex: 49,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ fontSize: '18px', flexShrink: 0 }}>🎓</span>

      <div style={{ flex: 1, minWidth: '260px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginRight: '8px' }}>
          Academic Demonstration System
        </span>
        <span style={{ fontSize: '12px', color: 'rgba(245,158,11,0.8)', lineHeight: 1.5 }}>
          This is a prototype ISMS built for an <strong>AUCA internship project</strong> at Equity Bank Rwanda PLC.
          All data is simulated. This system is <strong>NOT</strong> connected to real banking operations
          and is <strong>NOT</strong> approved for production use.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '99px', padding: '4px 12px', flexShrink: 0 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', animation: 'pulse 2s ease infinite', display: 'inline-block' }} />
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', fontFamily: "'JetBrains Mono', monospace" }}>
          DEMO MODE
        </span>
      </div>

      <div style={{ fontSize: '11px', color: 'rgba(245,158,11,0.6)', flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>
        ISO 27001:2022 Prototype · AUCA 2026
      </div>

      <button
        onClick={() => setDismissed(true)}
        style={{ background: 'transparent', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '6px', color: 'rgba(245,158,11,0.7)', cursor: 'pointer', fontSize: '16px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        title="Dismiss"
      >
        ×
      </button>
    </div>
  )
}