/*
# Add course checklists to learning milestones

Lets a learning card list the individual courses in its path, each with a status,
and note when those courses carry over to the next path.

1. New Tables
- `learning_courses`
  - `id` (uuid, primary key)
  - `milestone_id` (uuid, references learning_milestones, cascade)
  - `title` (text)
  - `status` (text: 'completed' | 'in_progress' | 'not_started')
  - `completed_date` (text, optional)
  - `certificate_url` (text, optional) - image path of the completion certificate
  - `order_index` (integer)
  - `created_at` (timestamptz)

2. Modified Tables
- `learning_milestones`
  - `next_path` (text, optional) - the path that builds on this one
  - `courses_carry_over` (boolean, default false) - whether finished courses count toward the next path

3. Security
- RLS enabled on `learning_courses`.
- Public read-only (SELECT for anon + authenticated); this is public portfolio content.
  No write policies, so visitors cannot change it.

4. Data
- Splunk milestone: path renamed to "Splunk Search Beginner Learning Path",
  3 of 4 courses, 75%, courses carry over. Four courses added.
*/

CREATE TABLE IF NOT EXISTS learning_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid NOT NULL REFERENCES learning_milestones(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('completed', 'in_progress', 'not_started')),
  completed_date text,
  certificate_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS learning_courses_milestone_id_idx ON learning_courses(milestone_id);

ALTER TABLE learning_courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_learning_courses" ON learning_courses;
CREATE POLICY "anon_select_learning_courses" ON learning_courses FOR SELECT
  TO anon, authenticated USING (true);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='next_path') THEN
    ALTER TABLE learning_milestones ADD COLUMN next_path text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='courses_carry_over') THEN
    ALTER TABLE learning_milestones ADD COLUMN courses_carry_over boolean NOT NULL DEFAULT false;
  END IF;
END $$;

UPDATE learning_milestones
SET learning_path = 'Splunk Search Beginner Learning Path',
    progress_percentage = 75,
    modules_completed = 3,
    modules_total = 4,
    courses_carry_over = true,
    last_updated = now()
WHERE category = 'splunk';

INSERT INTO learning_courses (milestone_id, title, status, completed_date, order_index)
SELECT m.id, c.title, c.status, c.completed_date, c.order_index
FROM learning_milestones m
CROSS JOIN (VALUES
  ('Intro to Splunk', 'completed', NULL, 1),
  ('Fields', 'completed', NULL, 2),
  ('Visualizations', 'completed', 'October 13, 2026', 3),
  ('Time', 'in_progress', NULL, 4)
) AS c(title, status, completed_date, order_index)
WHERE m.category = 'splunk'
  AND NOT EXISTS (SELECT 1 FROM learning_courses lc WHERE lc.milestone_id = m.id AND lc.title = c.title);
