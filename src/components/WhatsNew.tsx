import { useEffect, useState } from 'react'
import { supabase, type WhatsNew } from '../lib/supabase'
import { ExternalLink } from 'lucide-react'

interface WhatsNewSectionProps {
  onShowCaseStudy?: (study: string) => void
}

export default function WhatsNewSection({ onShowCaseStudy }: WhatsNewSectionProps) {
  const [updates, setUpdates] = useState<WhatsNew[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpdates()
  }, [])

  async function fetchUpdates() {
    try {
      const { data, error } = await supabase
        .from('whats_new')
        .select('*')
        .order('date', { ascending: false })
        .order('order_index', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching updates:', error)
        throw error
      }
      setUpdates(data || [])
    } catch (error) {
      console.error('Error fetching updates:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'project':
        return 'category-project'
      case 'certification':
        return 'category-certification'
      case 'achievement':
        return 'category-achievement'
      case 'case study':
        return 'category-case-study'
      default:
        return 'category-update'
    }
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, update: WhatsNew) => {
    if (update.link_url === '#case-study-nmap' && onShowCaseStudy) {
      e.preventDefault()
      onShowCaseStudy('nmap')
    } else if (update.link_url === '#case-study-privilege-escalation' && onShowCaseStudy) {
      e.preventDefault()
      onShowCaseStudy('privilege-escalation')
    }
  }

  if (loading) {
    return (
      <section id="whats-new" className="section">
        <div className="container">
          <h2 className="section-title">What's New</h2>
          <div className="loading">Loading...</div>
        </div>
      </section>
    )
  }

  if (updates.length === 0) {
    return (
      <section id="whats-new" className="section">
        <div className="container">
          <h2 className="section-title">What's New</h2>
          <p className="text-center text-gray-400">No updates yet. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <section id="whats-new" className="section">
      <div className="container">
        <h2 className="section-title">What's New</h2>
        <div className="whats-new-list">
          {updates.map((update) => (
            <div key={update.id} className="whats-new-item">
              <div className="whats-new-header">
                <span className={`whats-new-category ${getCategoryColor(update.category)}`}>
                  {update.category}
                </span>
                <span className="whats-new-date">{update.date}</span>
              </div>
              <h3 className="whats-new-title">{update.title}</h3>
              <p className="whats-new-description">{update.description}</p>
              {update.link_url && (
                <a
                  href={update.link_url}
                  className="whats-new-link"
                  onClick={(e) => handleLinkClick(e, update)}
                  target={update.link_url.startsWith('http') ? '_blank' : undefined}
                  rel={update.link_url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {update.link_text || 'Learn More'}
                  {update.link_url.startsWith('http') && <ExternalLink size={16} />}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
