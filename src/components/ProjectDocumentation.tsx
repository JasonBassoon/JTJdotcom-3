import { useEffect, useState } from 'react'
import { supabase, type DocumentationStep } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './LoginModal'

interface ProjectDocumentationProps {
  projectId: string
  projectTitle: string
}

export default function ProjectDocumentation({ projectId, projectTitle }: ProjectDocumentationProps) {
  const { user } = useAuth()
  const [steps, setSteps] = useState<DocumentationStep[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    setSteps([])
    setExpanded(false)
    fetchDocumentation()
  }, [projectId])

  async function fetchDocumentation() {
    try {
      const { data } = await supabase
        .from('project_documentation_steps')
        .select('*')
        .eq('project_id', projectId)
        .order('step_number', { ascending: true })
        .throwOnError()

      setSteps(data || [])
    } catch (error) {
      console.error('Error fetching documentation:', error)
    } finally {
      setLoading(false)
    }
  }

  const overviewSections = steps.filter(step => step.step_number <= 0).sort((a, b) => a.step_number - b.step_number)
  const implementationSteps = steps.filter(step => step.step_number > 0)

  function formatDocumentationText() {
    let text = ''

    overviewSections.forEach(section => {
      text += `${section.title}\n\n`
      text += `${section.commands.map(cmd => `${cmd}`).join('\n')}\n\n`
      text += `Rationale:\n${section.rationale}\n\n`
      if (section.evidence_notes) {
        text += `Evidence & Verification:\n${section.evidence_notes}\n`
      }
      text += '\n---\n\n'
    })

    implementationSteps.forEach(step => {
      text += `Step ${step.step_number}: ${step.title}\n\n`
      text += `Commands:\n${step.commands.map(cmd => `- ${cmd}`).join('\n')}\n\n`
      text += `Rationale:\n${step.rationale}\n\n`
      if (step.evidence_notes) {
        text += `Evidence & Verification:\n${step.evidence_notes}\n`
      }
      text += '\n---\n\n'
    })

    return text
  }

  async function handleCopyClick() {
    if (!user) {
      setShowLoginModal(true)
      return
    }
    await copyToClipboard()
  }

  async function copyToClipboard() {
    const text = formatDocumentationText()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  function handleLoginSuccess() {
    setShowLoginModal(false)
    copyToClipboard()
  }

  if (loading) {
    return <div className="documentation-loading">Loading documentation...</div>
  }

  if (steps.length === 0) {
    return null
  }

  return (
    <div className="project-documentation">
      <button
        className="documentation-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '▼' : '▶'} View Detailed Documentation ({implementationSteps.length} Steps)
      </button>

      {expanded && (
        <div className="documentation-steps">
          {overviewSections.map((section) => (
            <div key={section.id} className="documentation-step">
              <div className="step-header">
                <h4 className="step-title">{section.title}</h4>
              </div>

              <div className="step-content">
                <div className="content-text">
                  {section.commands.map((cmd, idx) => (
                    <p key={idx} className="overview-text">{cmd}</p>
                  ))}
                </div>
              </div>

              <div className="step-rationale">
                <strong>Rationale:</strong>
                <p>{section.rationale}</p>
              </div>

              {section.evidence_notes && (
                <div className="step-evidence">
                  <strong>Evidence & Verification:</strong>
                  <p>{section.evidence_notes}</p>
                </div>
              )}
            </div>
          ))}

          {implementationSteps.map((step) => (
            <div key={step.id} className="documentation-step">
              <div className="step-header">
                <span className="step-number">Step {step.step_number}</span>
                <h4 className="step-title">{step.title}</h4>
              </div>

              <div className="step-commands">
                <strong>Commands:</strong>
                <div className="command-list">
                  {step.commands.map((cmd, idx) => (
                    <code key={idx} className="command">{cmd}</code>
                  ))}
                </div>
              </div>

              <div className="step-rationale">
                <strong>Rationale:</strong>
                <p>{step.rationale}</p>
              </div>

              {step.evidence_notes && (
                <div className="step-evidence">
                  <strong>Evidence & Verification:</strong>
                  <p>{step.evidence_notes}</p>
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              className="btn btn-small"
              onClick={handleCopyClick}
              style={{ fontSize: '14px' }}
              title={`Copy ${projectTitle} documentation`}
            >
              {copied ? '✓ Copied!' : `📋 cp ${projectTitle} details`}
            </button>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}