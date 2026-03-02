/*
  # Drop Unused Indexes

  1. Changes
    - Drop index `soc_lab_plans_user_id_idx` on soc_lab_plans(user_id)
    - Drop index `soc_lab_progress_user_id_idx` on soc_lab_progress(user_id)
  
  2. Rationale
    - Security audit identified these indexes as unused
    - Removing them improves write performance on these tables
    - Reduces storage overhead
    - Foreign key constraints remain intact and functional
  
  3. Impact
    - Slightly faster INSERT/UPDATE/DELETE operations on affected tables
    - Foreign key constraints still work correctly without indexes
    - If query patterns change and these indexes become needed, they can be re-added
  
  ## Notes
  - Using IF EXISTS to prevent errors if indexes were already dropped
  - This does not affect data integrity or foreign key constraints
  - The tables still maintain proper referential integrity
*/

-- Drop unused index on soc_lab_plans.user_id
DROP INDEX IF EXISTS public.soc_lab_plans_user_id_idx;

-- Drop unused index on soc_lab_progress.user_id
DROP INDEX IF EXISTS public.soc_lab_progress_user_id_idx;
