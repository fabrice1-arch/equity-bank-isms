import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding Equity Bank Rwanda PLC ISMS database...')

  // ─── USERS ───
  const hashedPassword = await bcrypt.hash('Password123!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@equitybank.rw' },
    update: {},
    create: {
      name: 'Jean Pierre Habimana',
      email: 'admin@equitybank.rw',
      password: hashedPassword,
      role: 'ADMIN',
      department: 'IT Security',
      jobTitle: 'Chief Information Security Officer',
      phone: '+250 788 100 001',
      status: 'ACTIVE',
    },
  })

  const securityOfficer = await prisma.user.upsert({
    where: { email: 'security@equitybank.rw' },
    update: {},
    create: {
      name: 'Aline Mukamana',
      email: 'security@equitybank.rw',
      password: hashedPassword,
      role: 'SECURITY_OFFICER',
      department: 'IT Security',
      jobTitle: 'Information Security Officer',
      phone: '+250 788 100 002',
      status: 'ACTIVE',
    },
  })

  const auditor = await prisma.user.upsert({
    where: { email: 'auditor@equitybank.rw' },
    update: {},
    create: {
      name: 'Emmanuel Niyonzima',
      email: 'auditor@equitybank.rw',
      password: hashedPassword,
      role: 'AUDITOR',
      department: 'Internal Audit',
      jobTitle: 'IT Auditor',
      phone: '+250 788 100 003',
      status: 'ACTIVE',
    },
  })

  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@equitybank.rw' },
    update: {},
    create: {
      name: 'Diane Uwimana',
      email: 'analyst@equitybank.rw',
      password: hashedPassword,
      role: 'ANALYST',
      department: 'IT Operations',
      jobTitle: 'Security Analyst',
      phone: '+250 788 100 004',
      status: 'ACTIVE',
    },
  })

  const user5 = await prisma.user.upsert({
    where: { email: 'ops@equitybank.rw' },
    update: {},
    create: {
      name: 'Patrick Nkurunziza',
      email: 'ops@equitybank.rw',
      password: hashedPassword,
      role: 'ANALYST',
      department: 'Operations',
      jobTitle: 'IT Operations Manager',
      status: 'ACTIVE',
    },
  })

  console.log('✅ Users seeded')

  // ─── RISKS ───
  const risks = [
    {
      title: 'SQL Injection Attack on Core Banking System',
      description: 'Unpatched web application vulnerability allowing SQL injection attacks targeting the core banking database.',
      asset: 'Core Banking System (CBS)',
      threat: 'Cybercriminal SQL Injection',
      vulnerability: 'Unpatched web application',
      likelihood: 4, impact: 5, riskScore: 20,
      level: 'CRITICAL' as const, treatment: 'MITIGATE' as const,
      status: 'OPEN' as const, category: 'Application Security',
      ownerId: securityOfficer.id,
      reviewDate: new Date('2027-01-15'),
    },
    {
      title: 'Insider Fraud via SWIFT Payment System',
      description: 'Insufficient separation of duties in SWIFT payment processing creates insider fraud risk.',
      asset: 'SWIFT Payment Infrastructure',
      threat: 'Insider Fraud / Malicious Employee',
      vulnerability: 'Insufficient separation of duties',
      likelihood: 3, impact: 5, riskScore: 15,
      level: 'HIGH' as const, treatment: 'MITIGATE' as const,
      status: 'IN_TREATMENT' as const, category: 'Fraud & Financial Crime',
      ownerId: admin.id,
      reviewDate: new Date('2027-01-20'),
    },
    {
      title: 'Phishing Campaign Targeting Staff',
      description: 'Staff awareness gaps leave the bank vulnerable to sophisticated phishing campaigns targeting credentials.',
      asset: 'Email System / Staff Credentials',
      threat: 'Phishing / Social Engineering',
      vulnerability: 'Insufficient staff security awareness',
      likelihood: 5, impact: 3, riskScore: 15,
      level: 'HIGH' as const, treatment: 'MITIGATE' as const,
      status: 'OPEN' as const, category: 'Human Factor',
      ownerId: securityOfficer.id,
      reviewDate: new Date('2026-12-01'),
    },
    {
      title: 'ATM Network Jackpotting Attack',
      description: 'Legacy ATM software vulnerable to jackpotting malware allowing unauthorized cash dispensing.',
      asset: 'ATM Network (47 ATMs)',
      threat: 'Physical Malware / Jackpotting',
      vulnerability: 'Legacy ATM software (EOL)',
      likelihood: 3, impact: 4, riskScore: 12,
      level: 'HIGH' as const, treatment: 'MITIGATE' as const,
      status: 'IN_TREATMENT' as const, category: 'Infrastructure Security',
      ownerId: user5.id,
      reviewDate: new Date('2027-02-01'),
    },
    {
      title: 'Ransomware Attack on Data Center',
      description: 'Insufficient endpoint protection and backup procedures leave data center vulnerable to ransomware.',
      asset: 'Primary Data Center',
      threat: 'Ransomware Group Attack',
      vulnerability: 'Outdated EDR, infrequent backups',
      likelihood: 3, impact: 5, riskScore: 15,
      level: 'CRITICAL' as const, treatment: 'MITIGATE' as const,
      status: 'OPEN' as const, category: 'Infrastructure Security',
      ownerId: admin.id,
      reviewDate: new Date('2026-11-30'),
    },
    {
      title: 'Open Banking API Vulnerability',
      description: 'Third-party fintech partner APIs lack proper authentication and rate limiting controls.',
      asset: 'Open Banking API Gateway',
      threat: 'API Exploitation / Data Exfiltration',
      vulnerability: 'Insufficient API authentication, no rate limiting',
      likelihood: 4, impact: 4, riskScore: 16,
      level: 'CRITICAL' as const, treatment: 'MITIGATE' as const,
      status: 'OPEN' as const, category: 'Application Security',
      ownerId: securityOfficer.id,
      reviewDate: new Date('2026-12-15'),
    },
    {
      title: 'Third-Party Vendor Data Breach',
      description: 'Core banking system vendor lacks adequate security controls posing supply chain risk.',
      asset: 'Third-Party Vendor Systems',
      threat: 'Supply Chain / Vendor Breach',
      vulnerability: 'Insufficient vendor security assessment',
      likelihood: 2, impact: 4, riskScore: 8,
      level: 'MEDIUM' as const, treatment: 'TRANSFER' as const,
      status: 'IN_TREATMENT' as const, category: 'Third-Party Risk',
      ownerId: auditor.id,
      reviewDate: new Date('2027-03-01'),
    },
    {
      title: 'Mobile Banking App Data Leakage',
      description: 'Mobile banking application stores sensitive data in insecure local storage.',
      asset: 'Mobile Banking Application',
      threat: 'Data Exfiltration / App Exploitation',
      vulnerability: 'Insecure local data storage',
      likelihood: 3, impact: 3, riskScore: 9,
      level: 'MEDIUM' as const, treatment: 'MITIGATE' as const,
      status: 'IN_TREATMENT' as const, category: 'Application Security',
      ownerId: analyst.id,
      reviewDate: new Date('2027-01-10'),
    },
  ]

  for (const risk of risks) {
    await prisma.risk.create({ data: risk })
  }
  console.log('✅ Risks seeded')

  // ─── INCIDENTS ───
  const incidents = [
    {
      title: 'Phishing Attack — Finance Department',
      description: 'Multiple finance department employees received targeted spear-phishing emails impersonating the CFO requesting wire transfer approval.',
      severity: 'P2_HIGH' as const,
      status: 'IN_PROGRESS' as const,
      category: 'Phishing',
      affectedSystems: ['Email System', 'Active Directory'],
      reporterId: analyst.id,
      assigneeId: securityOfficer.id,
      detectedAt: new Date('2026-08-10T09:23:00'),
      regulatoryNotificationRequired: true,
    },
    {
      title: 'Unauthorized Access — Core Banking Admin Panel',
      description: 'Anomalous login detected from unrecognized IP address (Eastern Europe) to core banking administrative panel using valid credentials.',
      severity: 'P1_CRITICAL' as const,
      status: 'CONTAINED' as const,
      category: 'Unauthorized Access',
      affectedSystems: ['Core Banking System', 'Active Directory', 'VPN Gateway'],
      reporterId: admin.id,
      assigneeId: admin.id,
      detectedAt: new Date('2026-08-08T02:47:00'),
      containedAt: new Date('2026-08-08T04:15:00'),
      regulatoryNotificationRequired: true,
    },
    {
      title: 'DDoS Attack on Online Banking Portal',
      description: 'Distributed Denial of Service attack causing intermittent outages to the online banking portal affecting approximately 8,000 customers.',
      severity: 'P2_HIGH' as const,
      status: 'RESOLVED' as const,
      category: 'DDoS',
      affectedSystems: ['Online Banking Portal', 'Web Application Firewall'],
      reporterId: user5.id,
      assigneeId: user5.id,
      detectedAt: new Date('2026-08-05T14:30:00'),
      resolvedAt: new Date('2026-08-05T18:45:00'),
      rootCause: 'Botnet targeting financial institutions in the region. WAF rules updated.',
      regulatoryNotificationRequired: false,
    },
    {
      title: 'Malware Detected on Branch Workstation',
      description: 'Endpoint detection system flagged suspicious process execution on a Kigali branch workstation. Initial analysis suggests info-stealer malware.',
      severity: 'P3_MEDIUM' as const,
      status: 'ERADICATED' as const,
      category: 'Malware',
      affectedSystems: ['Branch Workstation KB-047', 'Network Segment B'],
      reporterId: analyst.id,
      assigneeId: analyst.id,
      detectedAt: new Date('2026-08-07T11:15:00'),
    },
    {
      title: 'Failed Brute Force — ATM Management System',
      description: 'Automated brute force attempts detected against ATM management system login portal. 2,847 failed attempts over 4 hours from a single IP.',
      severity: 'P3_MEDIUM' as const,
      status: 'CLOSED' as const,
      category: 'Brute Force',
      affectedSystems: ['ATM Management System'],
      reporterId: analyst.id,
      assigneeId: analyst.id,
      detectedAt: new Date('2026-08-01T00:00:00'),
      resolvedAt: new Date('2026-08-01T06:30:00'),
      closedAt: new Date('2026-08-02T09:00:00'),
      rootCause: 'IP blocked at firewall level. Geo-restriction implemented for ATM management portal.',
      lessonsLearned: 'Implement CAPTCHA and account lockout after 5 failed attempts.',
    },
  ]

  for (const incident of incidents) {
    await prisma.incident.create({ data: incident })
  }
  console.log('✅ Incidents seeded')

  // ─── POLICIES ───
  const policies = [
    {
      title: 'Information Security Policy',
      category: 'ACCESS_CONTROL' as const,
      content: 'This policy establishes the information security framework for Equity Bank Rwanda PLC aligned with ISO 27001:2022...',
      version: '3.1',
      status: 'ACTIVE' as const,
      owner: 'CISO — Jean Pierre Habimana',
      reviewDate: new Date('2027-06-01'),
      approvedBy: 'Board of Directors',
      approvedAt: new Date('2026-06-01'),
    },
    {
      title: 'Cryptographic Controls Policy',
      category: 'CRYPTOGRAPHIC' as const,
      content: 'This policy defines the use of cryptographic controls to protect the confidentiality, integrity, and authenticity of information...',
      version: '2.0',
      status: 'ACTIVE' as const,
      owner: 'Head of IT Security',
      reviewDate: new Date('2027-01-15'),
      approvedBy: 'CISO',
      approvedAt: new Date('2026-01-15'),
    },
    {
      title: 'Incident Response Policy',
      category: 'INCIDENT_RESPONSE' as const,
      content: 'This policy establishes the framework for detecting, reporting, and responding to information security incidents...',
      version: '1.5',
      status: 'ACTIVE' as const,
      owner: 'Security Operations Manager',
      reviewDate: new Date('2027-03-01'),
      approvedBy: 'CISO',
      approvedAt: new Date('2026-03-01'),
    },
    {
      title: 'Data Classification Policy',
      category: 'DATA_CLASSIFICATION' as const,
      content: 'This policy defines how information assets are classified and the controls applicable to each classification level...',
      version: '2.2',
      status: 'ACTIVE' as const,
      owner: 'Data Protection Officer',
      reviewDate: new Date('2027-04-01'),
    },
    {
      title: 'Remote Work Security Policy',
      category: 'REMOTE_WORK' as const,
      content: 'This policy establishes security requirements for employees working remotely or accessing bank systems from non-office locations...',
      version: '1.0',
      status: 'UNDER_REVIEW' as const,
      owner: 'IT Security Officer',
      reviewDate: new Date('2026-09-01'),
    },
    {
      title: 'Third-Party Security Policy',
      category: 'THIRD_PARTY' as const,
      content: 'This policy defines security requirements for third-party vendors and partners who access Equity Bank systems or data...',
      version: '1.3',
      status: 'ACTIVE' as const,
      owner: 'Vendor Management',
      reviewDate: new Date('2027-02-01'),
      approvedBy: 'CISO',
      approvedAt: new Date('2026-02-01'),
    },
  ]

  for (const policy of policies) {
    await prisma.policy.create({ data: policy })
  }
  console.log('✅ Policies seeded')

  // ─── ENCRYPTION ASSETS ───
  const encryptionAssets = [
    {
      system: 'Core Banking Database',
      description: 'Primary customer financial records database',
      algorithm: 'AES-256-GCM',
      keyLength: 256,
      dataState: 'AT_REST',
      status: 'COMPLIANT' as const,
      lastRotated: new Date('2026-06-01'),
      nextRotation: new Date('2026-12-01'),
      managedBy: 'DBA Team',
    },
    {
      system: 'Online Banking Portal',
      description: 'HTTPS/TLS for all web traffic',
      algorithm: 'TLS 1.3',
      keyLength: 256,
      dataState: 'IN_TRANSIT',
      status: 'COMPLIANT' as const,
      lastRotated: new Date('2026-07-01'),
      nextRotation: new Date('2027-07-01'),
      managedBy: 'Network Security Team',
    },
    {
      system: 'SWIFT Payment System',
      description: 'Interbank messaging encryption',
      algorithm: 'RSA-2048 + AES-256',
      keyLength: 2048,
      dataState: 'IN_TRANSIT',
      status: 'COMPLIANT' as const,
      lastRotated: new Date('2026-01-01'),
      nextRotation: new Date('2027-01-01'),
      managedBy: 'Treasury IT',
    },
    {
      system: 'ATM Network',
      description: 'ATM-to-processor communication encryption',
      algorithm: 'AES-128',
      keyLength: 128,
      dataState: 'IN_TRANSIT',
      status: 'NEEDS_ROTATION' as const,
      lastRotated: new Date('2025-01-01'),
      nextRotation: new Date('2026-01-01'),
      managedBy: 'ATM Operations',
    },
    {
      system: 'Backup Storage',
      description: 'Offsite and cloud backup encryption',
      algorithm: 'AES-256-CBC',
      keyLength: 256,
      dataState: 'AT_REST',
      status: 'COMPLIANT' as const,
      lastRotated: new Date('2026-04-01'),
      nextRotation: new Date('2026-10-01'),
      managedBy: 'IT Operations',
    },
    {
      system: 'Mobile Banking App',
      description: 'Mobile application data encryption',
      algorithm: 'AES-256 + ECC P-256',
      keyLength: 256,
      dataState: 'IN_TRANSIT',
      status: 'COMPLIANT' as const,
      lastRotated: new Date('2026-05-01'),
      nextRotation: new Date('2027-05-01'),
      managedBy: 'Mobile Dev Team',
    },
    {
      system: 'Email Gateway',
      description: 'Email encryption at rest and in transit',
      algorithm: 'TLS 1.2',
      keyLength: 128,
      dataState: 'IN_TRANSIT',
      status: 'NEEDS_ROTATION' as const,
      lastRotated: new Date('2024-12-01'),
      nextRotation: new Date('2025-12-01'),
      managedBy: 'IT Infrastructure',
    },
  ]

  for (const asset of encryptionAssets) {
    await prisma.encryptionAsset.create({ data: asset })
  }
  console.log('✅ Encryption assets seeded')

  // ─── AUDIT LOGS ───
  const auditLogs = [
    { userId: admin.id, action: 'USER_LOGIN', resource: 'Authentication', details: 'Successful login from 196.20.88.1', ipAddress: '196.20.88.1', severity: 'INFO' as const, success: true },
    { userId: securityOfficer.id, action: 'RISK_CREATED', resource: 'Risk Register', resourceId: 'R-001', details: 'New critical risk added: SQL Injection on CBS', ipAddress: '196.20.88.5', severity: 'WARNING' as const, success: true },
    { userId: analyst.id, action: 'INCIDENT_REPORTED', resource: 'Incident Management', details: 'P2 incident reported: Phishing attack on Finance dept', ipAddress: '196.20.88.12', severity: 'WARNING' as const, success: true },
    { userId: admin.id, action: 'POLICY_UPDATED', resource: 'Policy Library', details: 'Cryptographic Controls Policy updated to v2.0', ipAddress: '196.20.88.1', severity: 'INFO' as const, success: true },
    { userId: null, action: 'LOGIN_FAILED', resource: 'Authentication', details: 'Failed login attempt for admin@equitybank.rw from 185.220.101.45', ipAddress: '185.220.101.45', severity: 'ERROR' as const, success: false },
    { userId: auditor.id, action: 'AUDIT_LOG_EXPORTED', resource: 'Audit Logs', details: 'Audit log export requested for Q3 2026 compliance review', ipAddress: '196.20.88.20', severity: 'INFO' as const, success: true },
    { userId: admin.id, action: 'USER_CREATED', resource: 'User Management', details: 'New user account created: ops@equitybank.rw', ipAddress: '196.20.88.1', severity: 'INFO' as const, success: true },
    { userId: null, action: 'BRUTE_FORCE_DETECTED', resource: 'ATM Management System', details: '2847 failed login attempts detected from IP 45.155.205.100', ipAddress: '45.155.205.100', severity: 'CRITICAL' as const, success: false },
    { userId: securityOfficer.id, action: 'ENCRYPTION_KEY_ROTATED', resource: 'Encryption Management', details: 'AES-256 key rotated for Core Banking Database', ipAddress: '196.20.88.5', severity: 'INFO' as const, success: true },
    { userId: analyst.id, action: 'TRAINING_COMPLETED', resource: 'Security Training', details: 'Phishing Awareness Training completed — Score: 92%', ipAddress: '196.20.88.12', severity: 'INFO' as const, success: true },
  ]

  for (const log of auditLogs) {
    await prisma.auditLog.create({ data: log })
  }
  console.log('✅ Audit logs seeded')

  // ─── TRAINING COURSES ───
  const courses = [
    {
      title: 'Phishing Awareness & Email Security',
      description: 'Learn to identify phishing emails, spear-phishing, and business email compromise (BEC) attacks targeting bank employees.',
      targetRole: 'ALL',
      duration: 45,
      passingScore: 80,
      dueDate: new Date('2026-09-30'),
      mandatory: true,
    },
    {
      title: 'ISO 27001:2022 Fundamentals',
      description: 'Comprehensive training on the ISO 27001:2022 Information Security Management System framework and its application in banking.',
      targetRole: 'IT_STAFF',
      duration: 120,
      passingScore: 75,
      dueDate: new Date('2026-10-31'),
      mandatory: true,
    },
    {
      title: 'Secure Banking Operations',
      description: 'Best practices for secure banking operations including clean desk policy, password management, and physical security.',
      targetRole: 'ALL',
      duration: 30,
      passingScore: 80,
      dueDate: new Date('2026-09-15'),
      mandatory: true,
    },
    {
      title: 'Cybersecurity for Executives',
      description: 'Board-level cybersecurity awareness: understanding cyber risk, regulatory obligations, and crisis communication.',
      targetRole: 'MANAGEMENT',
      duration: 60,
      passingScore: 70,
      dueDate: new Date('2026-11-30'),
      mandatory: false,
    },
    {
      title: 'Wire Transfer Fraud Prevention',
      description: 'Identifying Business Email Compromise, verifying wire transfer requests, and fraud indicators in financial operations.',
      targetRole: 'FINANCE',
      duration: 45,
      passingScore: 85,
      dueDate: new Date('2026-09-01'),
      mandatory: true,
    },
  ]

  for (const course of courses) {
    await prisma.trainingCourse.create({ data: course })
  }
  console.log('✅ Training courses seeded')

  // ─── PHISHING SIMULATIONS ───
  const simulations = [
    { campaignName: 'Q1 2026 — CEO Fraud Simulation', sentCount: 156, clickedCount: 47, reportedCount: 23, department: 'All Departments', conductedAt: new Date('2026-03-15') },
    { campaignName: 'Q2 2026 — IT Help Desk Phishing', sentCount: 156, clickedCount: 31, reportedCount: 45, department: 'All Departments', conductedAt: new Date('2026-06-10') },
    { campaignName: 'Finance BEC Simulation', sentCount: 28, clickedCount: 6, reportedCount: 14, department: 'Finance & Treasury', conductedAt: new Date('2026-07-20') },
    { campaignName: 'Q3 2026 — Credential Harvesting', sentCount: 156, clickedCount: 19, reportedCount: 67, department: 'All Departments', conductedAt: new Date('2026-08-05') },
  ]

  for (const sim of simulations) {
    await prisma.phishingSimulation.create({ data: sim })
  }
  console.log('✅ Phishing simulations seeded')

  // ─── ACCESS REVIEWS ───
  const accessReviews = [
    { userId: admin.id, system: 'Core Banking System', accessLevel: 'ADMIN' as const, status: 'APPROVED' as const, lastReviewed: new Date('2026-07-01'), nextReview: new Date('2027-01-01') },
    { userId: securityOfficer.id, system: 'SIEM Platform', accessLevel: 'ADMIN' as const, status: 'APPROVED' as const, lastReviewed: new Date('2026-07-01'), nextReview: new Date('2027-01-01') },
    { userId: analyst.id, system: 'Core Banking System', accessLevel: 'READ' as const, status: 'PENDING' as const, nextReview: new Date('2026-09-01') },
    { userId: user5.id, system: 'ATM Management System', accessLevel: 'WRITE' as const, status: 'OVERDUE' as const, lastReviewed: new Date('2026-01-01'), nextReview: new Date('2026-07-01') },
    { userId: auditor.id, system: 'Audit Log System', accessLevel: 'READ' as const, status: 'APPROVED' as const, lastReviewed: new Date('2026-06-01'), nextReview: new Date('2026-12-01') },
    { userId: admin.id, system: 'SWIFT Payment System', accessLevel: 'PRIVILEGED' as const, status: 'APPROVED' as const, lastReviewed: new Date('2026-07-15'), nextReview: new Date('2027-01-15') },
  ]

  for (const review of accessReviews) {
    await prisma.accessReview.create({ data: review })
  }
  console.log('✅ Access reviews seeded')

  console.log('\n🎉 Database seeding complete!')
  console.log('\n📧 Demo Login Credentials:')
  console.log('   Admin:    admin@equitybank.rw    / Password123!')
  console.log('   Security: security@equitybank.rw / Password123!')
  console.log('   Auditor:  auditor@equitybank.rw  / Password123!')
  console.log('   Analyst:  analyst@equitybank.rw  / Password123!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
