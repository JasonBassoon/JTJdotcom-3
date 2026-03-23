import { FileText } from 'lucide-react';

export default function NmapCaseStudy() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700' }}>Nmap Port Scan Case Study</h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          marginBottom: '24px'
        }}>
          <a
            href="/reports/nmap-port-scan-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '18px 20px',
              maxWidth: '420px',
              width: '100%',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              flexShrink: 0
            }}>
              <FileText size={32} style={{ color: '#6b7280' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                fontWeight: '500',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>
                PDF REPORT
              </div>
              <h3 style={{
                color: '#111827',
                fontSize: '1.125rem',
                fontWeight: '700',
                margin: '0 0 2px 0'
              }}>
                SOC Incident Report
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Nmap Port Scan Detection
              </p>
            </div>
          </a>
        </div>

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
