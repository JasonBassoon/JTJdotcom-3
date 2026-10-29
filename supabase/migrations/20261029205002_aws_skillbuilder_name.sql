/*
# AWS platform name

1. Data
- AWS milestone learning_path and description now refer to the platform as "skillbuilder.aws".

2. Security
- No schema or policy changes.
*/

UPDATE learning_milestones
SET learning_path = 'skillbuilder.aws',
    description = 'Working through AWS Cloud Practitioner Essentials on skillbuilder.aws: cloud fundamentals, core AWS services, security, monitoring, pricing and well-architected design',
    last_updated = now()
WHERE category = 'aws';
