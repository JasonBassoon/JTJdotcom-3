/*
# Create case studies tables

Move case study content from hardcoded JSX into the database so case studies
can be added and edited without redeploying.

1. New Tables
   - `case_studies`
     - `id` (uuid, primary key)
     - `slug` (text, unique) — URL-friendly identifier, e.g. 'nmap'
     - `title` (text) — main heading shown on the page
     - `pdf_url` (text, nullable) — path to the PDF report tile
     - `pdf_title` (text, nullable) — title shown on the PDF tile
     - `pdf_subtitle` (text, nullable) — subtitle shown on the PDF tile
     - `project_id` (uuid, nullable, FK → projects) — which project this study belongs to
     - `order_index` (integer) — display ordering within a project
     - `created_at` / `updated_at` (timestamptz)

   - `case_study_sections`
     - `id` (uuid, primary key)
     - `case_study_id` (uuid, FK → case_studies)
     - `heading` (text) — section heading, e.g. 'Overview'
     - `content` (jsonb) — ordered array of content blocks:
         { "type": "paragraph", "text": "..." }
         { "type": "code", "text": "..." }
         { "type": "list", "items": ["...","..."] }
     - `sort_order` (integer)
     - `created_at` (timestamptz)

2. Security
   - RLS enabled on both tables.
   - Public read (anon + authenticated) since this is a portfolio — no auth needed.
   - No write policies: content is managed via migrations / admin only.

3. Indexes
   - Unique index on case_studies.slug
   - Index on case_study_sections.case_study_id + sort_order
*/

-- case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  pdf_url text,
  pdf_title text,
  pdf_subtitle text,
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_case_studies" ON case_studies;
CREATE POLICY "anon_select_case_studies" ON case_studies FOR SELECT
  TO anon, authenticated USING (true);

-- case_study_sections table
CREATE TABLE IF NOT EXISTS case_study_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id uuid NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  heading text NOT NULL,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE case_study_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_case_study_sections" ON case_study_sections;
CREATE POLICY "anon_select_case_study_sections" ON case_study_sections FOR SELECT
  TO anon, authenticated USING (true);

-- Index for efficient section ordering
CREATE INDEX IF NOT EXISTS idx_case_study_sections_study_order
  ON case_study_sections (case_study_id, sort_order);
