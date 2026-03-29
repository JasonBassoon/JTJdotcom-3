import PDFPreviewTile from '../../components/PDFPreviewTile';

export default function NmapCaseStudy() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-12" style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700' }}>Nmap Port Scan Case Study</h1>

        <div className="mb-16">
          <PDFPreviewTile
            pdfUrl="/reports/nmap-port-scan-report.pdf"
            title="SOC Incident Report"
            subtitle="Nmap Port Scan Detection"
          />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Overview</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>This case study documents a detected Nmap port scan within my internal SOC lab. A Kali Linuix attacker system initiated reconnaissance against an Ubuntu target with the 10.10.10.0/24 network. The activity was successfully detected and correlated using Wazuh SIEM and supporting telemetry, providing visibility into pre-exploitation behavior.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Attack Simulation</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Attack simulation was performed from a Kali Linux system using Nmap to enumerate open ports and services on the target Ubuntu machine. The scan targeted common ports (22, 80, 443) and was executed to simulate reconnaissance activity within an internal network.</p>
          <p className="mt-6 font-mono p-4 rounded" style={{ background: 'var(--surface)', color: 'var(--secondary)', fontFamily: "'Courier New', monospace", fontSize: '0.875rem', border: '1px solid var(--surface-light)' }}>Command used: sudo nmap -sS --script vuln 10.10.10.115</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Detection</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>The reconnaissance activity was detected by Wazuh SIEM through correlated alerts generated from web server logs and network behavior. A spike in alerts was observed in the dashboard during the time of the scan, indicating abnormal activity on the target system.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Wazuh identified multipe HTTP 400 error responses and grouped them as potential web attack activity. These alerts, combined with timeline correlation, confirmed the presence of automated scanning behavior originating from the Kali attacker system.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Analysis</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Analysis of the alert data indicates that the activity was consistent with reconnaissance behavior, specifically network service discovery. The use of Nmap to probe multiple ports and services generated identifiable patterns within the SIEM, including repeated HTTP error responses and clustered alert timing.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>The concentration of alerts within a short time window, combined with a single source system, supports the conclusion that the activity was automated rather than user driven. This behavior aligns with MITRE ATT&CK technique T1046 (Network Service Discovery), which is commonly observed during the initial stages of an attack lifecycle.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: '700' }}>Outcome</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>The simulated attack was successfully detected and analyzed without any impact to the target system. No exploitation activity was observed following the scan, confirming that the behavior was limited to reconnaissance.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>This case study demonstrates the effectiveness of SIEM-based monitoring in identifying early-stage attack activity. Detecting reconnaissance at this stage provides defenders with an opportunity to respond before further escalation occurs.</p>
        </section>
      </div>
    </div>
  );
}
