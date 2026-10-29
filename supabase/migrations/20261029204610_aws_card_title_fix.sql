/*
# AWS card title fix

1. Data
- AWS milestone title corrected to "AWS Cloud Practitioner Essentials".
- Learning path set to "AWS Skill Builder" (the platform) so it does not repeat the title.
- Stale metadata (target_cert "AWS Security - Specialty", services_learned) removed.

2. Security
- No schema or policy changes.
*/

UPDATE learning_milestones
SET title = 'AWS Cloud Practitioner Essentials',
    learning_path = 'AWS Skill Builder',
    metadata = '{}'::jsonb,
    last_updated = now()
WHERE category = 'aws';
