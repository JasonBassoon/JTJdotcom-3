import { useEffect, useState } from 'react'
import { supabase, type CaseStudy, type ContentBlock } from '../lib/supabase'
import PDFPreviewTile from './PDFPreviewTile'

interface CaseStudyProps {
  slug: string
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
          {block.text}
        </p>
      )
    case 'code':
      return (
        <p
          className="mt-6 font-mono p-4 rounded"
          style={{
            background: 'var(--surface)',
            color: 'var(--secondary)',
            fontFamily: "'Courier New', monospace",
            fontSize: '0.875rem',
            border: '1px solid var(--surface-light)',
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          {block.text}
        </p>
      )
    case 'list':
      return (
        <ul
          className="list-disc pl-6 mb-5"
          style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.25rem', paddingLeft: '1.5rem' }}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function CaseStudyPage({ slug }: CaseStudyProps) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCaseStudy() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('case_studies')
        .select('*, case_study_sections(*)')
        .eq('slug', slug)
        .maybeSingle()

      if (fetchError) {
        console.error('Error fetching case study:', fetchError)
        setError('Unable to load this case study.')
        setLoading(false)
        return
      }

      if (!data) {
        setError('Case study not found.')
        setLoading(false)
        return
      }

      data.case_study_sections.sort(
        (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
      )
      setCaseStudy(data)
      setLoading(false)
    }

    fetchCaseStudy()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div className="loading">Loading case study...</div>
        </div>
      </div>
    )
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>{error || 'Case study not found.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--background)', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="max-w-4xl mx-auto" style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <h1
          className="text-3xl font-bold mb-12"
          style={{ color: 'var(--text)', fontSize: '2.5rem', fontWeight: '700', marginBottom: '3rem' }}
        >
          {caseStudy.title}
        </h1>

        {caseStudy.pdf_url && caseStudy.pdf_title && (
          <div className="mb-16" style={{ marginBottom: '4rem' }}>
            <PDFPreviewTile
              pdfUrl={caseStudy.pdf_url}
              title={caseStudy.pdf_title}
              subtitle={caseStudy.pdf_subtitle || ''}
            />
          </div>
        )}

        {caseStudy.case_study_sections.map((section) => (
          <section key={section.id} className="mb-16" style={{ marginBottom: '4rem' }}>
            <h2
              className="text-2xl font-semibold mb-6 mt-12"
              style={{
                color: 'var(--text)',
                fontSize: '1.875rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                marginTop: '0',
              }}
            >
              {section.heading}
            </h2>
            {section.content.map((block, i) => (
              <ContentBlockRenderer key={i} block={block} />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
