/*
  # Drop Unused Database Indexes
  
  1. Changes Made
    - Drop `soc_lab_plans_user_id_idx` index from `public.soc_lab_plans` table
    - Drop `soc_lab_progress_user_id_idx` index from `public.soc_lab_progress` table
  
  2. Rationale
    - These indexes have not been used by any queries
    - Removing unused indexes provides several benefits:
      - Reduces storage overhead
      - Improves write performance (INSERT, UPDATE, DELETE operations)
      - Simplifies database maintenance
      - Reduces backup/restore times
  
  3. Data Integrity
    - Foreign key constraints on user_id columns remain intact
    - Data integrity is maintained through the FK constraints
    - Indexes can be recreated in the future if query patterns change
  
  ## Important Notes
  - The foreign key `soc_lab_plans_user_id_fkey` and `soc_lab_progress_user_id_fkey` still exist
  - These FK constraints ensure referential integrity between tables
  - If future queries require filtering/joining on user_id frequently, indexes can be added back
*/

-- Drop unused index on soc_lab_plans table
DROP INDEX IF EXISTS soc_lab_plans_user_id_idx;

-- Drop unused index on soc_lab_progress table
DROP INDEX IF EXISTS soc_lab_progress_user_id_idx;