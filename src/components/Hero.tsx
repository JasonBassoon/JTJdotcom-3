import { useEffect, useState } from 'react'
import { supabase, type AboutInfo } from '../lib/supabase'

export default function Hero() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutInfo()
  }, [])

  async function fetchAboutInfo() {
    try {
      const { data, error } = await supabase
        .from('about_info')
        .select('*')
        .maybeSingle()

      if (error) {
        console.error('Error fetching about info:', error)
        throw error
      }
      setAboutInfo(data)
    } catch (error) {
      console.error('Error fetching about info:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="hero">
        <div className="hero-background">
          <div className="animated-gradient"></div>
        </div>
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (!aboutInfo) {
    return (
      <section className="hero">
        <div className="hero-background">
          <div className="animated-gradient"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I am <span className="gradient-text">Jason</span>
            </h1>
            <h2 className="hero-subtitle-large">
              Aspiring Cybersecurity Professional
            </h2>
            <p className="hero-subtitle">
              Career-changer committed to continuous learning and building real-world security skills.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="animated-gradient"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I am <span className="gradient-text">{aboutInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle-large">
            {aboutInfo.subtitle}
          </h2>
          <p className="hero-subtitle">
            {aboutInfo.hero_bio}
          </p>
          <div className="hero-cta">
            <a href={aboutInfo.hero_cta_primary_link} className="btn btn-primary">
              {aboutInfo.hero_cta_primary_text}
            </a>
            <a href={aboutInfo.hero_cta_secondary_link} className="btn btn-secondary">
              {aboutInfo.hero_cta_secondary_text}
            </a>
          </div>
        </div>
        {aboutInfo.hero_stats && aboutInfo.hero_stats.length > 0 && (
          <div className="hero-stats">
            {aboutInfo.hero_stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}