/*
  # Add Indexes for Foreign Keys
  
  1. New Indexes
    - Add index on `soc_lab_plans(user_id)` to cover foreign key `soc_lab_plans_user_id_fkey`
    - Add index on `soc_lab_progress(user_id)` to cover foreign key `soc_lab_progress_user_id_fkey`
  
  2. Purpose
    - Foreign key columns should be indexed to improve query performance
    - These indexes will optimize:
      - JOIN operations between tables
      - CASCADE operations (if configured)
      - Queries filtering by user_id
      - Foreign key constraint validation
  
  3. Performance Benefits
    - Faster lookups when joining with auth.users table
    - Improved performance for user-specific queries
    - Better DELETE performance on parent table (auth.users)
    - Reduced locking during foreign key checks
  
  ## Notes
  - Using IF NOT EXISTS to make migration idempotent
  - Indexes are created on the referencing side (child tables)
  - These are standard B-tree indexes optimized for equality and range queries
*/

-- Create index on soc_lab_plans.user_id to cover the foreign key
CREATE INDEX IF NOT EXISTS soc_lab_plans_user_id_idx 
ON public.soc_lab_plans(user_id);

-- Create index on soc_lab_progress.user_id to cover the foreign key
CREATE INDEX IF NOT EXISTS soc_lab_progress_user_id_idx 
ON public.soc_lab_progress(user_id);