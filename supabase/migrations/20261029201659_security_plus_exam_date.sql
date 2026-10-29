/*
# Security+ scheduled exam date

1. Schema
- `learning_milestones.exam_date` (date, nullable): date of a booked certification exam. Shown on the
  card and in the details window when set.

2. Data
- Security+ milestone: exam_date = 2026-11-08, stale `metadata.exam_date` removed, last_updated refreshed.

3. Security
- No policy changes; existing public read-only policies cover the new column.
*/

ALTER TABLE learning_milestones ADD COLUMN IF NOT EXISTS exam_date date;

UPDATE learning_milestones
SET exam_date = '2026-11-08',
    metadata = metadata - 'exam_date',
    last_updated = now()
WHERE category = 'security_plus';
