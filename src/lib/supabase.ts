import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

export type Project = {
  id: string
  title: string
  description: string
  long_description: string | null
  tech_stack: string[]
  live_url: string | null
  github_url: string | null
  image_url: string | null
  security_features: string[]
  completed_date: string
  status: string
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export type LearningProof = {
  id: string
  milestone_id: string
  type: 'image' | 'certificate' | 'link'
  title: string
  caption: string | null
  url: string
  achieved_date: string | null
  order_index: number
  created_at: string
}

export type LearningCourse = {
  id: string
  milestone_id: string
  title: string
  status: 'completed' | 'in_progress' | 'not_started'
  completed_date: string | null
  certificate_url: string | null
  order_index: number
  created_at: string
}

export type LearningMilestone = {
  id: string
  category: string
  title: string
  description: string
  progress_percentage: number
  status: 'in_progress' | 'completed'
  last_updated: string
  metadata: Record<string, any>
  created_at: string
  learning_path: string | null
  modules_completed: number | null
  modules_total: number | null
  goal_certification: string | null
  target_date: string | null
  profile_url: string | null
  profile_label: string | null
  skills: string[]
  order_index: number
  next_path: string | null
  courses_carry_over: boolean
  completed_path: string | null
  item_label: string | null
  exam_date: string | null
  learning_proofs: LearningProof[]
  learning_courses: LearningCourse[]
}

export function formatExamDate(value: string, month: 'short' | 'long' = 'long') {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' })
}

export type ContactSubmission = {
  name: string
  email: string
  subject: string
  message: string
}

export type DocumentationStep = {
  id: string
  project_id: string
  step_number: number
  title: string
  commands: string[]
  rationale: string
  evidence_notes: string | null
  created_at: string
}

export type Experience = {
  id: string
  company: string
  position: string
  description: string
  start_date: string
  end_date: string | null
  location: string
  highlights: string[]
  order_index: number
  created_at: string
}

export type HeroStat = {
  icon: string
  number: string
  label: string
}

export type AboutInfo = {
  id: string
  name: string
  title: string
  subtitle: string
  bio: string
  hero_bio: string
  hero_greeting: string | null
  email: string | null
  github_url: string | null
  linkedin_url: string | null
  hero_stats: HeroStat[]
  hero_cta_primary_text: string
  hero_cta_primary_link: string
  hero_cta_secondary_text: string
  hero_cta_secondary_link: string
  created_at: string
  updated_at: string
}

export type WhatsNew = {
  id: string
  title: string
  description: string
  date: string
  category: string
  link_url: string | null
  link_text: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'code'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type CaseStudySection = {
  id: string
  case_study_id: string
  heading: string
  content: ContentBlock[]
  sort_order: number
  created_at: string
}

export type CaseStudy = {
  id: string
  slug: string
  title: string
  pdf_url: string | null
  pdf_title: string | null
  pdf_subtitle: string | null
  header_image_url: string | null
  project_id: string | null
  order_index: number
  created_at: string
  updated_at: string
  case_study_sections: CaseStudySection[]
}
