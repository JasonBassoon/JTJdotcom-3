/*
# Expand learning milestones with details and proof

Lets each learning card show richer detail: the learning path, module progress,
goal certification, target date and a public profile link, plus a list of proof
items (screenshots, certificates, links).

1. Modified Tables
- `learning_milestones`
  - `learning_path` (text) - course or path currently being followed
  - `modules_completed` (integer) - modules/rooms finished
  - `modules_total` (integer) - total modules/rooms in the path
  - `goal_certification` (text) - certification this work leads toward
  - `target_date` (text) - free-form target, e.g. "Q1 2027"
  - `profile_url` (text) - public profile for verification
  - `profile_label` (text) - button label for the profile link
  - `skills` (text[]) - key skills being practiced
  - `order_index` (integer) - display order

2. New Tables
- `learning_proofs`
  - `id` (uuid, primary key)
  - `milestone_id` (uuid, references learning_milestones, cascade)
  - `type` (text: 'image' | 'certificate' | 'link')
  - `title` (text)
  - `caption` (text)
  - `url` (text) - image path or external link
  - `achieved_date` (text)
  - `order_index` (integer)
  - `created_at` (timestamptz)

3. Security
- RLS enabled on `learning_proofs`.
- Public read-only (SELECT for anon + authenticated). No write policies,
  so visitors cannot add, change or delete proof; content is managed by the owner
  through the database.

4. Notes
- Existing rows are preserved; new columns are nullable or defaulted.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='learning_path') THEN
    ALTER TABLE learning_milestones ADD COLUMN learning_path text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='modules_completed') THEN
    ALTER TABLE learning_milestones ADD COLUMN modules_completed integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='modules_total') THEN
    ALTER TABLE learning_milestones ADD COLUMN modules_total integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='goal_certification') THEN
    ALTER TABLE learning_milestones ADD COLUMN goal_certification text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='target_date') THEN
    ALTER TABLE learning_milestones ADD COLUMN target_date text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='profile_url') THEN
    ALTER TABLE learning_milestones ADD COLUMN profile_url text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='profile_label') THEN
    ALTER TABLE learning_milestones ADD COLUMN profile_label text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='skills') THEN
    ALTER TABLE learning_milestones ADD COLUMN skills text[] NOT NULL DEFAULT '{}';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='order_index') THEN
    ALTER TABLE learning_milestones ADD COLUMN order_index integer NOT NULL DEFAULT 0;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS learning_proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id uuid NOT NULL REFERENCES learning_milestones(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'image' CHECK (type IN ('image', 'certificate', 'link')),
  title text NOT NULL,
  caption text,
  url text NOT NULL,
  achieved_date text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS learning_proofs_milestone_id_idx ON learning_proofs(milestone_id);

ALTER TABLE learning_proofs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_learning_proofs" ON learning_proofs;
CREATE POLICY "anon_select_learning_proofs" ON learning_proofs FOR SELECT
  TO anon, authenticated USING (true);
