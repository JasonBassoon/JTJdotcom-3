import { useEffect, useState } from 'react'
import { Award, CalendarClock, CheckCircle2, ExternalLink, FileBadge, ImageIcon, Link2, Route, ShieldCheck, X } from 'lucide-react'
import type { LearningMilestone, LearningProof } from '../lib/supabase'
import ImageLightbox from './ImageLightbox'

interface LearningDetailsProps {
  milestone: LearningMilestone
  label: string
  onClose: () => void
}

function isSafeUrl(url: string) {
  return url.startsWith('/') || /^https?:\/\//i.test(url)
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function LearningDetails({ milestone, label, onClose }: LearningDetailsProps) {
  const [lightbox, setLightbox] = useState<LearningProof | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !lightbox) onClose()
    }
    document.addEventListener('keydown', handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, lightbox])

  const proofs = milestone.learning_proofs.filter((p) => isSafeUrl(p.url))
  const visualProofs = proofs.filter((p) => p.type !== 'link')
  const linkProofs = proofs.filter((p) => p.type === 'link')
  const hasModules = milestone.modules_total != null && milestone.modules_total > 0
  const profileUrl = milestone.profile_url && isSafeUrl(milestone.profile_url) ? milestone.profile_url : null

  return (
    <div className="modal-overlay learning-details-overlay" role="dialog" aria-modal="true" aria-label={milestone.title} onClick={onClose}>
      <div className="learning-details" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        <div className="learning-details-header">
          <span className="milestone-category">{label}</span>
          <h3 className="learning-details-title">{milestone.title}</h3>
          <p className="learning-details-description">{milestone.description}</p>
        </div>

        <div className="learning-facts">
          <div className="learning-fact">
            <Route size={18} />
            <div>
              <span className="learning-fact-label">Learning path</span>
              <span className="learning-fact-value">{milestone.learning_path || 'Not specified yet'}</span>
            </div>
          </div>
          <div className="learning-fact">
            <Award size={18} />
            <div>
              <span className="learning-fact-label">Goal certification</span>
              <span className="learning-fact-value">{milestone.goal_certification || 'Skill building, no exam planned'}</span>
            </div>
          </div>
          <div className="learning-fact">
            <CalendarClock size={18} />
            <div>
              <span className="learning-fact-label">Target</span>
              <span className="learning-fact-value">{milestone.target_date || 'Ongoing'}</span>
            </div>
          </div>
        </div>

        <div className="learning-progress-block">
          <div className="learning-progress-top">
            <span>Progress</span>
            <span className="learning-progress-value">
              {hasModules ? `${milestone.modules_completed ?? 0} of ${milestone.modules_total} modules · ` : ''}
              {milestone.progress_percentage}%
            </span>
          </div>
          <div className="progress-bar progress-bar-lg">
            <div className="progress-fill" style={{ width: `${milestone.progress_percentage}%` }} />
          </div>
        </div>

        {milestone.skills.length > 0 && (
          <div className="learning-block">
            <h4 className="learning-block-title">Skills I'm practicing</h4>
            <div className="learning-skills">
              {milestone.skills.map((skill) => (
                <span key={skill} className="learning-skill">
                  <CheckCircle2 size={14} /> {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="learning-block">
          <h4 className="learning-block-title">
            <ShieldCheck size={18} /> Proof of progress
          </h4>

          {proofs.length === 0 && !profileUrl && (
            <p className="learning-empty">Screenshots and certificates for this item are coming soon.</p>
          )}

          {visualProofs.length > 0 && (
            <div className="proof-gallery">
              {visualProofs.map((proof) => (
                <button key={proof.id} type="button" className="proof-tile" onClick={() => setLightbox(proof)}>
                  <div className="proof-thumb">
                    <img src={proof.url} alt={proof.title} loading="lazy" />
                    <span className="proof-type">
                      {proof.type === 'certificate' ? <FileBadge size={12} /> : <ImageIcon size={12} />}
                      {proof.type === 'certificate' ? 'Certificate' : 'Screenshot'}
                    </span>
                  </div>
                  <div className="proof-meta">
                    <span className="proof-title">{proof.title}</span>
                    {proof.caption && <span className="proof-caption">{proof.caption}</span>}
                    {proof.achieved_date && <span className="proof-date">{proof.achieved_date}</span>}
                  </div>
                </button>
              ))}
            </div>
          )}

          {(linkProofs.length > 0 || profileUrl) && (
            <div className="proof-links">
              {profileUrl && (
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="proof-link proof-link-primary">
                  <ExternalLink size={16} />
                  <span>{milestone.profile_label || 'View public profile'}</span>
                </a>
              )}
              {linkProofs.map((proof) => (
                <a key={proof.id} href={proof.url} target="_blank" rel="noopener noreferrer" className="proof-link">
                  <Link2 size={16} />
                  <span>{proof.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <p className="learning-updated">Last updated {formatDate(milestone.last_updated)}</p>
      </div>

      {lightbox && (
        <div onClick={(e) => e.stopPropagation()}>
          <ImageLightbox src={lightbox.url} alt={lightbox.title} onClose={() => setLightbox(null)} />
        </div>
      )}
    </div>
  )
}
