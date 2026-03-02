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

export type LearningMilestone = {
  id: string
  category: 'security_plus' | 'tryhackme' | 'python' | 'aws'
  title: string
  description: string
  progress_percentage: number
  status: 'in_progress' | 'completed'
  last_updated: string
  metadata: Record<string, any>
  created_at: string
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
