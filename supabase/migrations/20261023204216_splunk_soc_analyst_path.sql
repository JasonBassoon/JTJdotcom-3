/*
# Move Splunk card to the SOC Analyst path

The Splunk Search Beginner Learning Path is finished (100%). The Splunk card now tracks the
Splunk SOC Analyst Path (3 of 8 courses) and credits the finished Beginner path.

1. Modified Tables
- `learning_milestones`
  - `completed_path` (text, optional) - name of an earlier path finished on the way to this one
  - Splunk row: learning path, progress (3 of 8, 38%), description, skills, completed_path updated

2. Data
- `learning_courses` for Splunk now mirrors the SOC Analyst path's 8 required courses:
  - Intro to Splunk (completed Oct 6, 2026), Using Fields (completed Oct 8, 2026),
    Visualizations (completed Oct 13, 2026), Search Under the Hood (in progress),
    Intro to Knowledge Objects, Introduction to Dashboards, Using Splunk Enterprise Security,
    ES 8.0 Updates for the Splunk SOC (not started)
  - "Time" is removed because it belonged only to the finished Beginner path.

3. Security
- No changes. Existing public read-only policies still apply.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='learning_milestones' AND column_name='completed_path') THEN
    ALTER TABLE learning_milestones ADD COLUMN completed_path text;
  END IF;
END $$;

UPDATE learning_milestones
SET learning_path = 'Splunk SOC Analyst Path',
    completed_path = 'Splunk Search Beginner Learning Path',
    modules_completed = 3,
    modules_total = 8,
    progress_percentage = 38,
    next_path = NULL,
    courses_carry_over = true,
    description = 'Building on the finished Beginner path to monitor, investigate and respond to security threats with Splunk and Splunk Enterprise Security',
    skills = ARRAY['SPL searches', 'Log investigation', 'Knowledge objects', 'Dashboards', 'Splunk Enterprise Security', 'Alerting'],
    last_updated = now()
WHERE category = 'splunk';

DELETE FROM learning_courses lc
USING learning_milestones m
WHERE lc.milestone_id = m.id AND m.category = 'splunk' AND lc.title = 'Time';

UPDATE learning_courses lc
SET title = 'Using Fields', completed_date = 'October 8, 2026', order_index = 2
FROM learning_milestones m
WHERE lc.milestone_id = m.id AND m.category = 'splunk' AND lc.title = 'Fields';

UPDATE learning_courses lc
SET completed_date = 'October 6, 2026', order_index = 1
FROM learning_milestones m
WHERE lc.milestone_id = m.id AND m.category = 'splunk' AND lc.title = 'Intro to Splunk';

INSERT INTO learning_courses (milestone_id, title, status, completed_date, order_index)
SELECT m.id, c.title, c.status, c.completed_date, c.order_index
FROM learning_milestones m
CROSS JOIN (VALUES
  ('Search Under the Hood', 'in_progress', NULL, 4),
  ('Intro to Knowledge Objects', 'not_started', NULL, 5),
  ('Introduction to Dashboards', 'not_started', NULL, 6),
  ('Using Splunk Enterprise Security', 'not_started', NULL, 7),
  ('ES 8.0 Updates for the Splunk SOC', 'not_started', NULL, 8)
) AS c(title, status, completed_date, order_index)
WHERE m.category = 'splunk'
  AND NOT EXISTS (SELECT 1 FROM learning_courses lc WHERE lc.milestone_id = m.id AND lc.title = c.title);
