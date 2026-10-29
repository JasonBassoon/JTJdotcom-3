/*
# AWS Cloud Practitioner Essentials progress

1. Schema
- `learning_milestones.item_label` (text, nullable): optional word used for the items in a path
  (e.g. "modules"). When null the site falls back to its existing wording.

2. Data
- AWS milestone: learning path renamed to "AWS Cloud Practitioner Essentials", description mentions
  AWS Skill Builder, progress set to 8 of 13 modules (62%), skills refreshed, item_label = 'modules'.
- Adds the 13 course modules to `learning_courses` (1-8 completed, 9 in progress, 10-13 not started).

3. Security
- No policy changes; existing public read-only policies cover the new column and rows.

4. Notes
- Idempotent: modules are only inserted if the AWS milestone has none yet.
*/

ALTER TABLE learning_milestones ADD COLUMN IF NOT EXISTS item_label text;

UPDATE learning_milestones
SET learning_path = 'AWS Cloud Practitioner Essentials',
    description = 'Working through AWS Cloud Practitioner Essentials on AWS Skill Builder: cloud fundamentals, core AWS services, security, monitoring, pricing and well-architected design',
    modules_completed = 8,
    modules_total = 13,
    progress_percentage = 62,
    item_label = 'modules',
    skills = ARRAY['Cloud computing concepts', 'Compute & networking', 'Storage & databases', 'IAM & security controls', 'Shared responsibility model'],
    last_updated = now()
WHERE category = 'aws';

INSERT INTO learning_courses (milestone_id, title, status, order_index)
SELECT m.id, c.title, c.status, c.order_index
FROM learning_milestones m
CROSS JOIN (VALUES
  ('Module 1 - Introduction to the Cloud', 'completed', 1),
  ('Module 2 - Compute in the Cloud', 'completed', 2),
  ('Module 3 - Exploring Compute Services', 'completed', 3),
  ('Module 4 - Going Global', 'completed', 4),
  ('Module 5 - Networking', 'completed', 5),
  ('Module 6 - Storage', 'completed', 6),
  ('Module 7 - Databases', 'completed', 7),
  ('Module 8 - AI ML and Data Analytics', 'completed', 8),
  ('Module 9 - Security', 'in_progress', 9),
  ('Module 10 - Monitoring, Compliance and Governance in the AWS Cloud', 'not_started', 10),
  ('Module 11 - Pricing and Support', 'not_started', 11),
  ('Module 12 - Migrating to the AWS Cloud', 'not_started', 12),
  ('Module 13 - Well-Architected Solutions', 'not_started', 13)
) AS c(title, status, order_index)
WHERE m.category = 'aws'
  AND NOT EXISTS (SELECT 1 FROM learning_courses lc WHERE lc.milestone_id = m.id);
