export default function NmapCaseStudy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nmap Port Scan Case Study</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>This case study documents a detected Nmap port scan within my internal SOC lab. A Kali Linuix attacker system initiated reconnaissance against an Ubuntu target with the 10.10.10.0/24 network. The activity was successfully detected and correlated using Wazuh SIEM and supporting telemetry, providing visibility into pre-exploitation behavior.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Attack Simulation</h2>
          <p>Attack simulation was performed from a Kali Linux system using Nmap to enumerate open ports and services on the target Ubuntu machine. The scan targeted common ports (22, 80, 443) and was executed to simulate reconnaissance activity within an internal network.</p>
          <p className="mt-4 font-mono bg-gray-100 p-4 rounded">Command used: sudo nmap -sS --script vuln 10.10.10.115</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detection</h2>
          <p>The reconnaissance activity was detected by Wazuh SIEM through correlated alerts generated from web server logs and network behavior. A spike in alerts was observed in the dashboard during the time of the scan, indicating abnormal activity on the target system.</p>
          <p className="mt-4">Wazuh identified multipe HTTP 400 error responses and grouped them as potential web attack activity. These alerts, combined with timeline correlation, confirmed the presence of automated scanning behavior originating from the Kali attacker system.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Analysis</h2>
          <p>Analysis content goes here.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Outcome</h2>
          <p>Outcome content goes here.</p>
        </section>
      </div>
    </div>
  );
}
