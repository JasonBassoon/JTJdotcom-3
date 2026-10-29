/*
# Add Working with Time certificate to the Splunk proof gallery

1. Data
- Inserts one certificate proof on the Splunk milestone (`learning_proofs`):
  - Working with Time (October 21, 2026), shown after Visualizations.

2. Security
- No changes. Existing public read-only policies apply.

3. Notes
- Idempotent: skipped if a proof with the same URL already exists.
*/

INSERT INTO learning_proofs (milestone_id, type, title, url, achieved_date, order_index)
SELECT m.id, 'certificate', 'Working with Time', '/certs/splunk/Certificate_of_Completion_Working_With_Time.jpg', 'October 21, 2026', 4
FROM learning_milestones m
WHERE m.category = 'splunk'
  AND NOT EXISTS (
    SELECT 1 FROM learning_proofs p
    WHERE p.milestone_id = m.id AND p.url = '/certs/splunk/Certificate_of_Completion_Working_With_Time.jpg'
  );
