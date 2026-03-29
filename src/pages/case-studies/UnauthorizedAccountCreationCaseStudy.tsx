import PDFPreviewTile from '../../components/PDFPreviewTile';

export default function UnauthorizedAccountCreationCaseStudy() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <h1 className="text-3xl font-bold mb-12" style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem' }}>Unauthorized Account Creation Case Study</h1>

        <div className="mb-16" style={{ marginBottom: '4rem' }}>
          <PDFPreviewTile
            pdfUrl="/reports/unauthorized-account-creation-report.pdf"
            title="SOC Incident Report"
            subtitle="Unauthorized Account Creation Detection"
          />
        </div>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Overview</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>This case study documents the detection and investigation of unauthorized account creation activity within my SOC lab environment. An attacker gained initial access to a Linux system and attempted to establish persistence by creating a new user account with elevated privileges. The activity was detected through SIEM correlation and system audit logs.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Attack Simulation</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>The attack was simulated on an Ubuntu target system where an attacker with initial access created a new user account and added it to the sudo group to maintain persistent elevated access. This technique is commonly used by threat actors to establish backdoor access after initial compromise.</p>
          <p className="mt-6 font-mono p-4 rounded" style={{ background: 'var(--surface)', color: 'var(--secondary)', fontFamily: "'Courier New', monospace", fontSize: '0.875rem', border: '1px solid var(--surface-light)', marginTop: '1.5rem', padding: '1rem', borderRadius: '0.5rem' }}>Commands used:<br/>sudo useradd -m backdoor<br/>sudo usermod -aG sudo backdoor</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Detection</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>The unauthorized account creation was detected by Wazuh SIEM through monitoring of system audit logs and user account management events. Alerts were generated when the useradd and usermod commands were executed, indicating the creation of a new user and privilege escalation attempt.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1.25rem' }}>Wazuh correlated multiple events including the account creation, group modification, and the timing of these actions to identify this as suspicious activity. The SIEM dashboard showed a clear timeline of the persistence establishment attempt, triggering high-severity alerts for investigation.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Analysis</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>Analysis of the alert data confirmed that a new user account was created outside of normal provisioning processes. The account was immediately granted sudo privileges, which is inconsistent with standard user onboarding procedures and indicative of malicious intent.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1.25rem' }}>This activity aligns with MITRE ATT&CK technique T1136.001 (Create Account: Local Account) and T1548.003 (Abuse Elevation Control Mechanism: Sudo and Sudo Caching). The rapid succession of account creation and privilege elevation suggests automated tooling or a skilled attacker attempting to establish persistent access before detection.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Outcome</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>The unauthorized account was successfully detected and documented in this controlled lab environment. The simulated attack demonstrated the importance of monitoring user account management activities and maintaining robust audit logging capabilities.</p>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1.25rem' }}>This case study highlights the effectiveness of SIEM correlation in detecting persistence mechanisms. By monitoring account creation and privilege escalation events, defenders can identify and respond to backdoor establishment attempts before attackers can leverage their access for further malicious activity.</p>
        </section>
      </div>
    </div>
  );
}
