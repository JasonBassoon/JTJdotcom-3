import PDFPreviewTile from '../../components/PDFPreviewTile';

export default function PrivilegeEscalationCaseStudy() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <h1 className="text-3xl font-bold mb-12" style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem' }}>SOC Investigation: Unauthorized Account Creation & Privilege Escalation</h1>

        <div className="mb-16" style={{ marginBottom: '4rem' }}>
          <PDFPreviewTile
            pdfUrl="/reports/privilege-escalation-report.pdf"
            title="SOC Incident Report"
            subtitle="Unauthorized Account Creation & Privilege Escalation"
          />
        </div>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Overview</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>This case study documents a simulated post-compromise attack involving unauthorized domain account creation and privilege escalation within my SOC lab environment. Using Wazuh SIEM, I detected and analyzed account creation, privilege escalation, and authentication activity across multiple systems.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Attack Simulation</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>An attacker created two domain user accounts (backdoor1 and a secondary account) to establish persistence. The accounts were enabled, added to the Domain Admins group, and used to log into the environment.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Detection</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>Wazuh SIEM detected correlated Windows Security Event IDs:</p>
          <ul className="list-disc list-inside mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem', marginLeft: '1.5rem' }}>
            <li>4720 (User account created)</li>
            <li>4722 (User account enabled)</li>
            <li>4738 (Account modified)</li>
            <li>4624 (Successful logon)</li>
          </ul>
          <p className="mt-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1.25rem' }}>These events were visualized and correlated across systems, confirming attacker activity.</p>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Analysis</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>The activity indicates post-compromise behavior involving persistence and privilege escalation. Multiple accounts were created to ensure continued access. The rapid sequence of account creation, privilege modification, and logon confirms malicious intent.</p>
          <p className="mt-5 mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1.25rem', marginBottom: '1.25rem' }}>This behavior maps to MITRE ATT&CK techniques:</p>
          <ul className="list-disc list-inside mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem', marginLeft: '1.5rem' }}>
            <li>T1136 – Create Account</li>
            <li>T1098 – Account Manipulation</li>
            <li>T1078 – Valid Accounts</li>
            <li>T1059 – Command and Scripting Interpreter</li>
          </ul>
        </section>

        <section className="mb-16" style={{ marginBottom: '4rem' }}>
          <h2 className="text-2xl font-semibold mb-6 mt-12" style={{ color: 'var(--text)', fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem', marginTop: '0' }}>Outcome</h2>
          <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>The simulated attack was successfully detected and analyzed using Wazuh SIEM. This case study demonstrates the ability to identify privilege escalation and persistence techniques in a Windows domain environment using centralized logging and visualization.</p>
        </section>
      </div>
    </div>
  );
}
