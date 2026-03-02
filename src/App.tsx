import { useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Learning from './components/Learning'
import Experience from './components/Experience'
import Contact from './components/Contact'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = () => {
    setMenuOpen(false)
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
            <a href="#projects" onClick={handleNavClick}>Projects</a>
            <a href="#learning" onClick={handleNavClick}>Learning</a>
            <a href="#experience" onClick={handleNavClick}>Experience</a>
            <a href="#contact" onClick={handleNavClick}>Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <div id="hero">
          <Hero />
        </div>
        <Projects />
        <Learning />
        <Experience />
        <Contact />
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
