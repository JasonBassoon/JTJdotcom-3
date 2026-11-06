/*
# Security+ exam rescheduled

1. Data
- Security+ milestone: exam_date = 2026-11-23, last_updated refreshed.

2. Security
- No schema or policy changes.
*/

UPDATE learning_milestones
SET exam_date = '2026-11-23', last_updated = now()
WHERE category = 'security_plus';
