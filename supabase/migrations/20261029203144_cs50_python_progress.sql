/*
# CS50's Introduction to Programming with Python

1. Data
- Python milestone rewritten for HarvardX CS50P on edX: new title, learning path, Python-only
  description, course-topic skills, progress 15%, 1 of 10 weeks completed, item_label = 'weeks'.
- Old security-themed metadata (courses/projects) removed.
- Adds the 10 course weeks to `learning_courses` (Week 0 completed, Weeks 1-2 in progress, rest not started).

2. Security
- No schema or policy changes.

3. Notes
- Idempotent: weeks are only inserted if the Python milestone has none yet.
*/

UPDATE learning_milestones
SET title = 'CS50''s Introduction to Programming with Python',
    learning_path = 'HarvardX CS50P on edX',
    description = 'Building a strong foundation in Python through Harvard''s CS50P: fundamentals, conditionals, loops, exceptions, libraries, testing, file I/O, regular expressions and object-oriented programming',
    skills = ARRAY['Functions & variables', 'Conditionals', 'Loops', 'Exceptions', 'Libraries', 'Unit testing', 'File I/O', 'Regular expressions', 'Object-oriented programming'],
    goal_certification = NULL,
    progress_percentage = 15,
    modules_completed = 1,
    modules_total = 10,
    item_label = 'weeks',
    metadata = '{}'::jsonb,
    last_updated = now()
WHERE category = 'python';

INSERT INTO learning_courses (milestone_id, title, status, order_index)
SELECT m.id, c.title, c.status, c.order_index
FROM learning_milestones m
CROSS JOIN (VALUES
  ('Week 0 - Functions, Variables', 'completed', 0),
  ('Week 1 - Conditionals', 'in_progress', 1),
  ('Week 2 - Loops', 'in_progress', 2),
  ('Week 3 - Exceptions', 'not_started', 3),
  ('Week 4 - Libraries', 'not_started', 4),
  ('Week 5 - Unit Tests', 'not_started', 5),
  ('Week 6 - File I/O', 'not_started', 6),
  ('Week 7 - Regular Expressions', 'not_started', 7),
  ('Week 8 - Object-Oriented Programming', 'not_started', 8),
  ('Week 9 - Et Cetera and Final Project', 'not_started', 9)
) AS c(title, status, order_index)
WHERE m.category = 'python'
  AND NOT EXISTS (SELECT 1 FROM learning_courses lc WHERE lc.milestone_id = m.id);
