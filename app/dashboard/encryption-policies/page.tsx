'use client';

import { useState } from 'react';
import Topbar from '@/components/layout/Topbar';

const encryptionAssets = [
  {
    system: 'Core Banking DB',
    algorithm: 'AES-256-GCM',
    keyLength: '256-bit',
    dataState: 'AT_REST',
    status: 'COMPLIANT',
    lastRotated: '2026-07-15',
    nextRotation: '2026-10-15',
    managedBy: 'AWS KMS',
  },
  {
    system: 'Mobile Banking API',
    algorithm: 'TLS 1.3',
    keyLength: '256-bit',
    dataState: 'IN_TRANSIT',
    status: 'COMPLIANT',
    lastRotated: '2026-08-01',
    nextRotation: '2026-11-01',
    managedBy: 'DigiCert',
  },
  {
    system: 'Card Processing HSM',
    algorithm: 'RSA-4096',
    keyLength: '4096-bit',
    dataState: 'AT_REST',
    status: 'COMPLIANT',
    lastRotated: '2026-06-20',
    nextRotation: '2026-12-20',
    managedBy: 'Thales Luna',
  },
  {
    system: 'SWIFT Messaging',
    algorithm: 'AES-256-CBC',
    keyLength: '256-bit',
    dataState: 'IN_TRANSIT',
    status: 'NEEDS_ROTATION',
    lastRotated: '2025-12-10',
    nextRotation: '2026-06-10',
    managedBy: 'SWIFT Alliance',
  },
  {
    system: 'Customer Data Lake',
    algorithm: 'AES-256-GCM',
    keyLength: '256-bit',
    dataState: 'AT_REST',
    status: 'COMPLIANT',
    lastRotated: '2026-07-28',
    nextRotation: '2026-10-28',
    managedBy: 'Azure Key Vault',
  },
  {
    system: 'Email Gateway',
    algorithm: 'TLS 1.2',
    keyLength: '128-bit',
    dataState: 'IN_TRANSIT',
    status: 'NEEDS_ROTATION',
    lastRotated: '2025-11-05',
    nextRotation: '2026-05-05',
    managedBy: 'Let\'s Encrypt',
  },
  {
    system: 'ATM Network',
    algorithm: 'Triple DES',
    keyLength: '168-bit',
    dataState: 'AT_REST',
    status: 'NEEDS_ROTATION',
    lastRotated: '2025-09-18',
    nextRotation: '2026-03-18',
    managedBy: 'NCR Secure',
  },
];

const policyLibrary = [
  {
    title: 'Information Security Policy',
    category: 'Governance',
    version: 'v4.2',
    status: 'ACTIVE',
    owner: 'Jean-Pierre Habimana',
    reviewDate: '2027-01-15',
  },
  {
    title: 'Data Encryption Standard',
    category: 'Cryptography',
    version: 'v3.0',
    status: 'ACTIVE',
    owner: 'Solange Uwimana',
    reviewDate: '2026-12-01',
  },
  {
    title: 'Acceptable Use Policy',
    category: 'HR Security',
    version: 'v2.5',
    status: 'UNDER_REVIEW',
    owner: 'Eric Mugabo',
    reviewDate: '2026-09-30',
  },
  {
    title: 'Incident Response Plan',
    category: 'Incident Mgmt',
    version: 'v5.1',
    status: 'ACTIVE',
    owner: 'Diane Mukamana',
    reviewDate: '2026-11-20',
  },
  {
    title: 'Cloud Security Policy',
    category: 'Infrastructure',
    version: 'v1.3',
    status: 'DRAFT',
    owner: 'Patrick Niyonzima',
    reviewDate: '2026-10-15',
  },
  {
    title: 'Access Control Policy',
    category: 'Access Mgmt',
    version: 'v3.8',
    status: 'UNDER_REVIEW',
    owner: 'Alice Iradukunda',
    reviewDate: '2026-09-01',
  },
];

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'ACTIVE': return 'badge badge-low';
    case 'DRAFT': return 'badge badge-medium';
    case 'UNDER_REVIEW': return 'badge badge-purple';
    default: return 'badge badge-ghost';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'ACTIVE': return 'Active';
    case 'DRAFT': return 'Draft';
    case 'UNDER_REVIEW': return 'Under Review';
    default: return status;
  }
}

export default function EncryptionPoliciesPage() {
  const [activeTab, setActiveTab] = useState<'encryption' | 'policies'>('encryption');

  return (
    <>
      <Topbar
        title="Encryption & Policies"
        subtitle="Cryptographic Controls & Policy Management"
      />

      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-wrapper">
            <div className="page-breadcrumb">Home / Dashboard / Encryption & Policies</div>
            <h1 className="page-title">
              Encryption & <span>Policies</span>
            </h1>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="search-bar" style={{ marginBottom: 24 }}>
          <button
            className={`btn ${activeTab === 'encryption' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('encryption')}
          >
            🔐 Encryption Assets
          </button>
          <button
            className={`btn ${activeTab === 'policies' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('policies')}
          >
            📋 Policy Library
          </button>
        </div>

        {/* Encryption Assets Tab */}
        {activeTab === 'encryption' && (
          <div className="card fade-in">
            <div className="card-header">
              <h2 className="card-title">Encryption Assets</h2>
              <span className="badge badge-info">{encryptionAssets.length} Systems</span>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>System</th>
                    <th>Algorithm</th>
                    <th>Key Length</th>
                    <th>Data State</th>
                    <th>Status</th>
                    <th>Last Rotated</th>
                    <th>Next Rotation</th>
                    <th>Managed By</th>
                  </tr>
                </thead>
                <tbody>
                  {encryptionAssets.map((asset, i) => (
                    <tr key={i} className={`fade-in stagger-${i + 1}`}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{asset.system}</td>
                      <td>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                          {asset.algorithm}
                        </code>
                      </td>
                      <td>{asset.keyLength}</td>
                      <td>
                        <span className={`badge ${asset.dataState === 'AT_REST' ? 'badge-info' : 'badge-purple'}`}>
                          {asset.dataState === 'AT_REST' ? '💾 At Rest' : '🔄 In Transit'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${asset.status === 'COMPLIANT' ? 'badge-low' : 'badge-high'}`}>
                          {asset.status === 'COMPLIANT' ? '✅ Compliant' : '⚠️ Needs Rotation'}
                        </span>
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        {asset.lastRotated}
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        {asset.nextRotation}
                      </td>
                      <td>{asset.managedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Policy Library Tab */}
        {activeTab === 'policies' && (
          <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                Policy Library
              </h2>
              <span className="badge badge-info">{policyLibrary.length} Policies</span>
            </div>
            <div className="grid-3">
              {policyLibrary.map((policy, i) => (
                <div key={i} className={`card fade-in stagger-${i + 1}`}>
                  <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span className="badge badge-ghost">{policy.category}</span>
                      <span className={getStatusBadgeClass(policy.status)}>
                        {getStatusLabel(policy.status)}
                      </span>
                    </div>
                    <h3 className="card-title" style={{ fontSize: 15 }}>{policy.title}</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Version</span>
                      <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        {policy.version}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Owner</span>
                      <span>{policy.owner}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Review Date</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                        {policy.reviewDate}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      📄 View Policy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
