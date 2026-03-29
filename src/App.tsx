import { useState } from 'react'
import Hero from './components/Hero'
import WhatsNew from './components/WhatsNew'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Experience from './components/Experience'
import Contact from './components/Contact'
import NmapCaseStudy from './pages/case-studies/NmapCaseStudy'
import PrivilegeEscalationCaseStudy from './pages/case-studies/PrivilegeEscalationCaseStudy'
import UnauthorizedAccountCreationCaseStudy from './pages/case-studies/UnauthorizedAccountCreationCaseStudy'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCaseStudy, setShowCaseStudy] = useState<string | null>(null)

  const handleNavClick = () => {
    setMenuOpen(false)
    setShowCaseStudy(null)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <a href="#hero" className="nav-brand" onClick={handleNavClick}>Jason's Tech Journey</a>
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="#hero" onClick={handleNavClick}>Home</a>
            <a href="#whats-new" onClick={handleNavClick}>What's New</a>
            <a href="#projects" onClick={handleNavClick}>Projects</a>
            <a href="#learning" onClick={handleNavClick}>Learning</a>
            <a href="#experience" onClick={handleNavClick}>Experience</a>
            <a href="#contact" onClick={handleNavClick}>Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {showCaseStudy ? (
          <div>
            <div className="container" style={{ paddingTop: '2rem' }}>
              <button
                onClick={() => setShowCaseStudy(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                ← Back
              </button>
            </div>
            {showCaseStudy === 'nmap' && <NmapCaseStudy />}
            {showCaseStudy === 'privilege-escalation' && <PrivilegeEscalationCaseStudy />}
            {showCaseStudy === 'unauthorized-account' && <UnauthorizedAccountCreationCaseStudy />}
          </div>
        ) : (
          <>
            <div id="hero">
              <Hero />
            </div>
            <WhatsNew onShowCaseStudy={(study) => setShowCaseStudy(study)} />
            <Projects onShowCaseStudy={(study) => setShowCaseStudy(study)} />
            <Learning />
            <Experience />
            <Contact />
          </>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} JasonsTechJourney.com</p>
        </div>
      </footer>
    </div>
  )
}

export default App
