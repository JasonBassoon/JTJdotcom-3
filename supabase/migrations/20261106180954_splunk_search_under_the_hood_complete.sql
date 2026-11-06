/*
# Splunk progress: Search Under the Hood complete

1. Data
- learning_courses: "Search Under the Hood" -> completed (November 6, 2026); "Intro to Knowledge Objects" -> in_progress.
- learning_milestones (splunk): 4 of 8 modules, 50%.
- learning_proofs: adds the Search Under the Hood certificate after Working with Time.

2. Security
- No schema or policy changes.
*/

UPDATE learning_courses c
SET status = 'completed', completed_date = 'November 6, 2026'
FROM learning_milestones m
WHERE c.milestone_id = m.id AND m.category = 'splunk' AND c.title = 'Search Under the Hood';

UPDATE learning_courses c
SET status = 'in_progress'
FROM learning_milestones m
WHERE c.milestone_id = m.id AND m.category = 'splunk' AND c.title = 'Intro to Knowledge Objects';

UPDATE learning_milestones
SET modules_completed = 4, progress_percentage = 50, last_updated = now()
WHERE category = 'splunk';

INSERT INTO learning_proofs (milestone_id, type, title, url, achieved_date, order_index)
SELECT m.id, 'certificate', 'Search Under the Hood', '/certs/splunk/Certificate_of_Completion_Search_Under_Hood_.jpg', 'November 6, 2026', 5
FROM learning_milestones m
WHERE m.category = 'splunk'
  AND NOT EXISTS (
    SELECT 1 FROM learning_proofs p
    WHERE p.milestone_id = m.id AND p.url = '/certs/splunk/Certificate_of_Completion_Search_Under_Hood_.jpg'
  );
