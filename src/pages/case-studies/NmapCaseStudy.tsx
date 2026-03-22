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
          <p>Attack simulation content goes here.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Detection</h2>
          <p>Detection content goes here.</p>
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
