import { useEffect, useState } from 'react'
import { Award, ChevronRight, Route } from 'lucide-react'
import { supabase, type LearningMilestone } from '../lib/supabase'
import LearningDetails from './LearningDetails'

const categoryLabels: Record<string, string> = {
  security_plus: 'CompTIA Security+',
  tryhackme: 'TryHackMe',
  splunk: 'Splunk',
  python: 'Python Programming',
  aws: 'AWS Cloud'
}

export default function Learning() {
  const [milestones, setMilestones] = useState<LearningMilestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState<LearningMilestone | null>(null)

  useEffect(() => {
    fetchMilestones()
  }, [])

  async function fetchMilestones() {
    const { data, error } = await supabase
      .from('learning_milestones')
      .select('*, learning_proofs(*)')
      .order('order_index', { ascending: true })
      .order('order_index', { ascending: true, referencedTable: 'learning_proofs' })

    if (error) {
      console.error('Error fetching learning milestones:', error)
      setError(true)
    } else {
      setMilestones(
        (data || []).map((m) => ({ ...m, skills: m.skills ?? [], learning_proofs: m.learning_proofs ?? [] }))
      )
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section id="learning" className="section section-alt">
        <div className="container">
          <h2 className="section-title">Learning Journey</h2>
          <div className="loading">Loading progress...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="learning" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Continuous Learning</h2>
        <p className="section-subtitle">
          Actively building cybersecurity expertise through certifications and hands-on practice
        </p>

        {error && <p className="learning-empty">Learning progress couldn't be loaded right now. Please try again later.</p>}

        <div className="learning-grid">
          {milestones.map((milestone) => {
            const label = categoryLabels[milestone.category] || milestone.category
            const proofCount = milestone.learning_proofs.length
            return (
              <div key={milestone.id} className="milestone-card">
                <div className="milestone-header">
                  <span className="milestone-category">{label}</span>
                  <span className={`milestone-status status-${milestone.status}`}>
                    {milestone.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <h3 className="milestone-title">{milestone.title}</h3>
                {milestone.learning_path && (
                  <p className="milestone-path">
                    <Route size={14} /> {milestone.learning_path}
                  </p>
                )}
                <p className="milestone-description">{milestone.description}</p>

                {milestone.goal_certification && (
                  <div className="milestone-goal">
                    <Award size={14} />
                    <span>Goal: {milestone.goal_certification}</span>
                  </div>
                )}

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${milestone.progress_percentage}%` }} />
                </div>
                <div className="progress-label">{milestone.progress_percentage}% Complete</div>

                <button type="button" className="milestone-details-btn" onClick={() => setSelected(milestone)}>
                  <span>View details{proofCount > 0 ? ` · ${proofCount} proof${proofCount === 1 ? '' : 's'}` : ''}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {selected && (
        <LearningDetails
          milestone={selected}
          label={categoryLabels[selected.category] || selected.category}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
