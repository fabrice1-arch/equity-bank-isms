# Information Security Management System (ISMS)
## Equity Bank Rwanda PLC — Internship Project Report

**Prepared By:** Fabrice  
**Institution:** African University of Central Africa (AUCA)  
**Host Organization:** Equity Bank Rwanda PLC  

---

### 1. Executive Summary

This report documents the design, development, and implementation of a centralized Information Security Management System (ISMS) tailored for Equity Bank Rwanda PLC, undertaken as an academic internship project at the African University of Central Africa (AUCA). In modern banking environments, managing digital risks, ensuring regulatory compliance, and maintaining data confidentiality are critical operational prerequisites. The developed ISMS provides a robust, scalable, and intuitive platform designed to streamline security operations, risk assessments, and incident responses while strongly aligning with the internationally recognized ISO/IEC 27001:2022 standards. 

The project successfully delivered a web-based management dashboard integrating advanced technologies, including Next.js 16, TypeScript, PostgreSQL via Supabase, and Prisma 7. Key achievements include the successful modeling of complex security data, real-time analytics for risk and incident management, and a robust role-based access control (RBAC) architecture to enforce the principle of least privilege. Ultimately, the deployed system serves as a powerful instrument for the host organization to elevate its security posture, streamline compliance workflows, and cultivate a proactive security culture.

---

### 2. Introduction

#### Background on Information Security in Banking
The banking sector is inherently data-intensive and operates in a highly regulated environment. With the rapid digitization of financial services across Africa, banks are increasingly exposed to sophisticated cyber threats, ranging from ransomware and phishing attacks to insider threats and data breaches. Effective information security management is no longer merely an IT concern but a fundamental business imperative necessary to maintain customer trust, ensure financial stability, and avoid severe regulatory penalties.

#### Problem Statement
Equity Bank Rwanda PLC, like many rapidly growing financial institutions, faces the challenge of managing a complex web of information security processes. Historically, security management often relies on fragmented tools, manual spreadsheets, and decentralized communication channels. This fragmentation leads to inefficiencies, delayed incident responses, difficulties in tracking risks over time, and challenges in demonstrating compliance with internal policies and external regulations. There is a pressing need for a centralized, automated, and unified Information Security Management System (ISMS) to consolidate these operations.

#### Project Objectives
The primary objectives of this internship project were to:
1. Design and develop a centralized ISMS web application tailored for the banking sector.
2. Automate the tracking, assessment, and mitigation of information security risks.
3. Streamline the incident reporting and response lifecycle to reduce mean time to resolution (MTTR).
4. Implement a comprehensive role-based access control (RBAC) mechanism to manage user permissions.
5. Provide real-time visibility into the organization’s security posture through interactive dashboards and audit logs.
6. Align system functionalities with the core requirements and Annex A controls of the ISO/IEC 27001:2022 framework.

#### Scope and Limitations
The scope of this project encompassed the full-stack development of the ISMS web application, including frontend UI/UX design, backend API development, database architecture, and integration of authentication mechanisms. The system includes modules for risk management, incident response, access control, policy management, and audit logging.
Limitations of the current project include the lack of direct integration with the bank's live core banking systems or Security Information and Event Management (SIEM) tools due to security and access constraints inherent in a short-term academic internship. The system operates in a standalone capacity with simulated data representing real-world banking scenarios.

---

### 3. Literature Review

#### ISO/IEC 27001:2022 Framework Overview
ISO/IEC 27001:2022 is the globally recognized standard for establishing, implementing, maintaining, and continually improving an ISMS. The 2022 revision emphasizes a more agile approach to risk management and updates Annex A controls to reflect modern cybersecurity realities, including cloud security, threat intelligence, and secure coding practices. The developed system aligns with these principles by operationalizing risk assessment workflows and control tracking.

#### NIST Cybersecurity Framework
The National Institute of Standards and Technology (NIST) Cybersecurity Framework provides a policy framework of computer security guidance for how private sector organizations in the United States and globally can assess and improve their ability to prevent, detect, and respond to cyber attacks. The framework's core functions—Identify, Protect, Detect, Respond, and Recover—heavily influenced the module design of the ISMS, particularly the Incident Response and Risk Assessment components.

#### PCI-DSS v4.0 for Payment Security
The Payment Card Industry Data Security Standard (PCI-DSS) v4.0 mandates stringent security controls for organizations handling credit card information. For a financial institution like Equity Bank Rwanda, compliance is mandatory. The ISMS supports PCI-DSS requirements through robust access control, encryption policy tracking, and comprehensive audit logging to ensure traceability of all administrative actions.

#### Information Security Challenges in African Banking Sector
Research indicates that the African banking sector is experiencing a rapid digital transformation, accompanied by a disproportionate rise in cyber fraud and infrastructure vulnerabilities. Challenges include a shortage of skilled cybersecurity professionals, legacy system integration issues, and evolving regulatory landscapes. A centralized ISMS helps mitigate these challenges by automating routine compliance tasks and providing clear, actionable insights to limited security personnel.

#### Role of Technology in Security Management
Modern security management relies on advanced technologies to process vast amounts of data and enforce policies at scale. The transition from manual compliance tracking to automated, cloud-based applications enables real-time monitoring and data-driven decision-making, which are crucial for proactive defense mechanisms.

---

### 4. Methodology

#### System Development Life Cycle (SDLC) - Agile Approach
The project utilized an Agile software development methodology, specifically relying on iterative sprints. This approach facilitated continuous feedback, allowed for the flexible adaptation of requirements, and ensured steady progress. Sprints were divided into planning, design, development, testing, and review phases.

#### Requirements Gathering
Requirements were gathered through consultations with university supervisors and references to standard banking security protocols. The focus was on identifying the minimum viable product (MVP) features necessary to demonstrate a functional and compliant ISMS.

#### Technology Stack Selection Rationale
- **Next.js 16 (React framework):** Chosen for its hybrid static and server rendering capabilities, excellent performance, and built-in routing, enabling a seamless and responsive user experience.
- **TypeScript:** Provided static typing, significantly reducing runtime errors and improving code maintainability and developer experience during the complex data modeling phases.
- **PostgreSQL via Supabase:** A powerful, open-source relational database system provided as a managed service by Supabase, offering robust data integrity, scalability, and built-in features like Row Level Security (RLS).
- **Prisma 7 ORM:** Facilitated type-safe database access, simplified schema migrations, and streamlined complex relational queries.
- **NextAuth v5:** A comprehensive authentication solution for Next.js, utilized to implement secure, token-based (JWT) user authentication and session management.
- **Recharts:** A composable charting library built on React components, used for rendering dynamic and interactive data visualizations on the dashboard.

---

### 5. System Architecture

#### High-Level Architecture Diagram Description
The application follows a modern decoupled architecture. The **Client (Browser)** interacts with the **Next.js 16 Server** which handles both Server-Side Rendering (SSR) and API Routes. The Next.js API Routes utilize the **Prisma ORM** to execute queries against the **Supabase PostgreSQL Database**. Authentication is negotiated between the Client, NextAuth, and the database to securely issue and validate JSON Web Tokens (JWT).

#### Database Schema Overview
The relational schema comprises 12 primary tables designed to ensure referential integrity. Key tables include:
- `User`: Stores user credentials, roles, and profiles.
- `Risk`: Catalogs identified risks, their severity, likelihood, and mitigation status.
- `Incident`: Tracks security breaches or events, including timestamps, severity, and resolution details.
- `AuditLog`: An immutable ledger recording all critical system actions for non-repudiation.
- `Policy`: Manages corporate security policies and their enforcement status.

#### Authentication Flow
Authentication is managed via NextAuth v5 using credentials and JWT. Upon successful login, a JWT containing user identity and role claims is generated and stored in a secure, HTTP-only cookie. API routes middleware verifies this token to enforce access controls before fulfilling requests.

#### Security Measures Implemented
- Input validation and sanitization using Zod schemas.
- Protection against Cross-Site Request Forgery (CSRF) and Cross-Site Scripting (XSS) natively handled by Next.js.
- Secure, encrypted password storage using bcrypt.
- Strict Role-Based Access Control (RBAC) at both the UI and API levels.

---

### 6. System Modules

#### 6.1 Dashboard
- **Purpose:** To provide a centralized, at-a-glance overview of the organization's security posture.
- **Key Features:** Real-time metrics on open risks, recent incidents, compliance status, and interactive charts.
- **ISO 27001 Controls:** Supports Management Review and Information Security Monitoring.

#### 6.2 Risk Assessment
- **Purpose:** To identify, evaluate, and track risks to information assets.
- **Key Features:** Risk matrix calculation (Likelihood × Impact), mitigation tracking, and risk ownership assignment.
- **ISO 27001 Controls:** Clause 6.1 (Actions to address risks and opportunities).

#### 6.3 Incident Response
- **Purpose:** To manage the lifecycle of security incidents from detection to recovery.
- **Key Features:** Incident logging, severity categorization, status tracking, and post-incident analysis reporting.
- **ISO 27001 Controls:** Annex A.16 (Information security incident management).

#### 6.4 Access Control
- **Purpose:** To govern user identities and their permissions within the ISMS.
- **Key Features:** Role creation, user assignment (e.g., Admin, Analyst, Auditor), and privilege modification.
- **ISO 27001 Controls:** Annex A.9 (Access control).

#### 6.5 Encryption & Policies
- **Purpose:** To manage cryptographic controls and organizational security policies.
- **Key Features:** Document repository for policies, version control, and tracking of encryption standards implementation.
- **ISO 27001 Controls:** Annex A.10 (Cryptography) and Annex A.5 (Information security policies).

#### 6.6 Audit Logs
- **Purpose:** To maintain a verifiable trail of all system activities.
- **Key Features:** Immutable logging of logins, data modifications, and system errors with advanced filtering.
- **ISO 27001 Controls:** Annex A.12.4 (Logging and monitoring).

#### 6.7 Security Training
- **Purpose:** To ensure staff awareness and track training compliance.
- **Key Features:** Campaign management, employee completion tracking, and phishing simulation metrics.
- **ISO 27001 Controls:** Annex A.7.2.2 (Information security awareness, education, and training).

#### 6.8 Settings
- **Purpose:** To configure system-wide parameters and preferences.
- **Key Features:** Profile management, UI theme selection, and system notification configurations.

---

### 7. Database Design

#### Entity-Relationship Description
The ER model is centered around the `User` entity, which holds one-to-many relationships with `Risks` (as owners), `Incidents` (as reporters or handlers), and `AuditLogs` (as actors). `Risks` and `Incidents` may have associated `Comments` or `Attachments` (one-to-many).

#### Key Tables and Relationships

| Table Name | Description | Key Relationships |
|------------|-------------|-------------------|
| `User` | Stores account details | 1:M with Risk, Incident, AuditLog |
| `Risk` | Details vulnerability/threats | M:1 with User (Owner) |
| `Incident` | Records security events | M:1 with User (Handler) |
| `AuditLog` | System activity ledger | M:1 with User (Actor) |

#### Data Integrity Constraints
- Foreign keys enforced strictly via Prisma.
- `ON DELETE CASCADE` or `RESTRICT` rules applied logically (e.g., deleting a user reassigns or restricts depending on owned risks).
- Unique constraints on usernames and email addresses.

---

### 8. Testing & Validation

#### Functional Testing Results
Unit and integration testing were conducted to verify API endpoint correctness and UI component state management. The system successfully passed all core workflow tests, including CRUD operations on risks and incidents, and correct visualization of data on the dashboard.

#### Security Testing Considerations
Basic security testing included vulnerability scanning of npm dependencies, testing against SQL injection via Prisma's parameterized queries, and verifying that API endpoints properly reject unauthorized or unauthenticated requests.

#### User Acceptance Testing
Simulated user acceptance testing involved walking through the application as different user roles (Admin vs. Auditor) to ensure that the UI conditionally rendered the correct actionable items and that the user experience was intuitive.

---

### 9. Results & Discussion

#### Achievements vs Objectives
The project successfully met all initial objectives. The ISMS web application was fully developed and deployed locally, demonstrating a comprehensive suite of security management tools. The integration of modern web technologies proved highly effective in creating a responsive and scalable application.

#### System Capabilities Demonstrated
The system demonstrated the capability to aggregate dispersed security data into a unified, visually comprehensible format. The automated calculation of risk scores and real-time dashboard updates highlighted the efficiency gains over manual processes.

#### Alignment with ISO 27001:2022
The system's modular architecture naturally mapped to key ISO 27001:2022 clauses, particularly concerning risk assessment, incident management, and continuous monitoring, thereby providing a foundational tool for organizational compliance.

---

### 10. Challenges & Solutions

#### Technical Challenges Faced
1. **Prisma 7 Migration:** Adapting to breaking changes and updated syntax in the newer Prisma version.
2. **Supabase Connection:** Managing connection pooling limits in serverless environments.
3. **Next.js 16 Proxies:** Handling Next.js App Router caching mechanisms which sometimes served stale data on the dashboard.

#### Solutions Implemented
1. **Prisma 7:** Thorough review of the migration documentation and refactoring schema definitions to align with the new standards.
2. **Supabase:** Implemented connection pooling using Supabase's IPv4 connection string and Prisma's data proxy features.
3. **Caching:** Utilized Next.js specific revalidation tags and `revalidate = 0` route segment configs to ensure real-time data fetching for dynamic dashboards.

---

### 11. Recommendations & Future Work

#### Integration with Bank's Existing Systems
Future iterations should aim to integrate the ISMS via RESTful APIs with the bank's core banking platform and Active Directory for centralized identity management.

#### Mobile Application Development
Developing a companion mobile application would allow on-call security personnel to receive real-time push notifications regarding critical incidents.

#### AI-Powered Threat Detection
Implementing machine learning algorithms to analyze audit logs and incident trends could provide predictive threat intelligence and automated risk categorization.

#### Automated Compliance Reporting
Developing a module that automatically generates PDF reports formatted specifically for regulatory bodies (e.g., National Bank of Rwanda) would significantly reduce compliance overhead.

#### Real-time SIEM Integration
Direct ingestion of logs from firewalls, endpoints, and servers via SIEM APIs would transform the ISMS from a management tool into a comprehensive security operations center (SOC) dashboard.

---

### 12. Conclusion

The development of the Information Security Management System (ISMS) for Equity Bank Rwanda PLC represents a significant step towards modernizing and centralizing security operations. By leveraging advanced web technologies like Next.js and PostgreSQL, the project successfully delivered a robust, scalable, and user-friendly platform. The system not only fulfills the academic requirements of the AUCA internship but also provides a tangible, high-value framework that aligns with international standards such as ISO 27001:2022. The implementation of this system has the potential to profoundly enhance the bank's security posture, operational efficiency, and regulatory compliance capabilities.

---

### 13. References

1. International Organization for Standardization. (2022). *ISO/IEC 27001:2022 Information security, cybersecurity and privacy protection — Information security management systems — Requirements*.
2. National Institute of Standards and Technology. (2018). *Framework for Improving Critical Infrastructure Cybersecurity*.
3. Payment Card Industry Security Standards Council. (2022). *PCI-DSS v4.0*.
4. Vercel. (2024). *Next.js Documentation*. Retrieved from https://nextjs.org/docs
5. Prisma. (2024). *Prisma Data Platform Documentation*. Retrieved from https://www.prisma.io/docs
6. Academic papers on banking security within the East African context.

---

### Appendices

#### Appendix A: Technology Stack Details
- **Frontend:** React 18, Next.js 16 (App Router), Tailwind CSS (for custom styling integration where needed), Radix UI (accessible components), Recharts.
- **Backend:** Node.js, Next.js API Routes, NextAuth v5.
- **Database:** Supabase (PostgreSQL 15), Prisma ORM 7.
- **Language:** TypeScript 5.x.

#### Appendix B: Database Schema
```prisma
// Example Schema Excerpt
model User {
  id        String     @id @default(uuid())
  email     String     @unique
  name      String?
  role      Role       @default(USER)
  risks     Risk[]
  incidents Incident[]
}

model Risk {
  id          String   @id @default(uuid())
  title       String
  severity    String
  status      String
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])
  createdAt   DateTime @default(now())
}
```

#### Appendix C: API Endpoints
- `GET /api/risks` - Retrieve all risks
- `POST /api/risks` - Create a new risk entry
- `GET /api/incidents/:id` - Fetch specific incident details
- `PUT /api/incidents/:id` - Update incident status
- `GET /api/audit-logs` - Retrieve paginated audit logs

#### Appendix D: User Roles & Permissions
- **Admin:** Full access to all modules, system settings, and user management.
- **Security Analyst:** Can create/edit risks and incidents, view logs, but cannot alter system configurations or user roles.
- **Auditor:** Read-only access to all modules, specifically focused on reports, policies, and audit logs.
- **Standard User:** Can report incidents and view assigned training modules.
