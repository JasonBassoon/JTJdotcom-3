/*
# Add Splunk course certificates to the proof gallery

1. Data
- Inserts three certificate proofs on the Splunk milestone (`learning_proofs`):
  - Intro to Splunk (October 6, 2026)
  - Using Fields (October 8, 2026)
  - Visualizations (October 13, 2026)
- Images live in the site's /certs/splunk/ folder.

2. Security
- No changes. Existing public read-only policies apply.

3. Notes
- Idempotent: skips any certificate already present for the same URL.
- Working with Time certificate will be added once its file is uploaded.
*/

INSERT INTO learning_proofs (milestone_id, type, title, url, achieved_date, order_index)
SELECT m.id, 'certificate', c.title, c.url, c.achieved_date, c.order_index
FROM learning_milestones m
CROSS JOIN (VALUES
  ('Intro to Splunk', '/certs/splunk/Certificate_of_Completion_Intro_To_Splunk.jpg', 'October 6, 2026', 1),
  ('Using Fields', '/certs/splunk/Certificate_of_Completion_Using_Fields.jpg', 'October 8, 2026', 2),
  ('Visualizations', '/certs/splunk/Certificate_of_Completion_Visualizations.jpg', 'October 13, 2026', 3)
) AS c(title, url, achieved_date, order_index)
WHERE m.category = 'splunk'
  AND NOT EXISTS (SELECT 1 FROM learning_proofs p WHERE p.milestone_id = m.id AND p.url = c.url);
