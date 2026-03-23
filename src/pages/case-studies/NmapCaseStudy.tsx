import { FileText } from 'lucide-react';

export default function NmapCaseStudy() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700' }}>Nmap Port Scan Case Study</h1>

        <a
          href="/reports/nmap-port-scan-report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="report-preview-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            background: 'var(--surface)',
            border: '1px solid var(--surface-light)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)';
            e.currentTarget.style.borderColor = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--surface-light)';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            flexShrink: 0
          }}>
            <FileText size={48} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h3 style={{
                color: 'var(--text)',
                fontSize: '1.125rem',
                fontWeight: '600',
                margin: 0
              }}>
                SOC Incident Report
              </h3>
              <span style={{
                fontSize: '0.625rem',
                padding: '0.25rem 0.5rem',
                background: 'rgba(6, 182, 212, 0.1)',
                color: 'var(--primary)',
                borderRadius: '9999px',
                fontWeight: '600',
                letterSpacing: '0.05em'
              }}>
                REPORT
              </span>
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              PDF • March 2026
            </p>
          </div>
        </a>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Overview</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>This case study documents a detected Nmap port scan within my internal SOC lab. A Kali Linuix attacker system initiated reconnaissance against an Ubuntu target with the 10.10.10.0/24 network. The activity was successfully detected and correlated using Wazuh SIEM and supporting telemetry, providing visibility into pre-exploitation behavior.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Attack Simulation</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Attack simulation was performed from a Kali Linux system using Nmap to enumerate open ports and services on the target Ubuntu machine. The scan targeted common ports (22, 80, 443) and was executed to simulate reconnaissance activity within an internal network.</p>
          <p className="mt-4 font-mono p-4 rounded" style={{ background: 'var(--surface)', color: 'var(--secondary)', fontFamily: "'Courier New', monospace", fontSize: '0.875rem', border: '1px solid var(--surface-light)' }}>Command used: sudo nmap -sS --script vuln 10.10.10.115</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Detection</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>The reconnaissance activity was detected by Wazuh SIEM through correlated alerts generated from web server logs and network behavior. A spike in alerts was observed in the dashboard during the time of the scan, indicating abnormal activity on the target system.</p>
          <p className="mt-4" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Wazuh identified multipe HTTP 400 error responses and grouped them as potential web attack activity. These alerts, combined with timeline correlation, confirmed the presence of automated scanning behavior originating from the Kali attacker system.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Analysis</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Analysis of the alert data indicates that the activity was consistent with reconnaissance behavior, specifically network service discovery. The use of Nmap to probe multiple ports and services generated identifiable patterns within the SIEM, including repeated HTTP error responses and clustered alert timing.</p>
          <p className="mt-4" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>The concentration of alerts within a short time window, combined with a single source system, supports the conclusion that the activity was automated rather than user driven. This behavior aligns with MITRE ATT&CK technique T1046 (Network Service Discovery), which is commonly observed during the initial stages of an attack lifecycle.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Outcome</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>The simulated attack was successfully detected and analyzed without any impact to the target system. No exploitation activity was observed following the scan, confirming that the behavior was limited to reconnaissance.</p>
          <p className="mt-4" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>This case study demonstrates the effectiveness of SIEM-based monitoring in identifying early-stage attack activity. Detecting reconnaissance at this stage provides defenders with an opportunity to respond before further escalation occurs.</p>
        </section>
      </div>
    </div>
  );
}
