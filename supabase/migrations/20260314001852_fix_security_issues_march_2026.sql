/*
  # Fix Security Issues - March 2026

  ## Changes Made

  1. **Add Missing Foreign Key Indexes**
     - Add index on `soc_lab_plans.user_id` for foreign key `soc_lab_plans_user_id_fkey`
     - Add index on `soc_lab_progress.user_id` for foreign key `soc_lab_progress_user_id_fkey`
     - These indexes improve query performance for foreign key lookups

  2. **Remove Unused Index**
     - Drop `idx_whats_new_order_index` on `whats_new` table (not being used)

  3. **Fix RLS Policies on whats_new Table**
     - Drop existing overly permissive policies that use `USING (true)` or `WITH CHECK (true)`
     - Replace with read-only access for all authenticated users
     - Only allow admin operations (the whats_new table doesn't track ownership, so write operations
       should be restricted to admin users or handled through a secure admin interface)
     - For now, we remove write access via RLS to prevent unrestricted modifications

  4. **Security Notes**
     - Foreign key indexes improve join performance and prevent table scans
     - RLS policies now properly restrict the whats_new table to read-only for standard users
     - Write operations should be handled through a secure admin interface or edge function
     - Leaked password protection must be enabled through Supabase Dashboard (cannot be set via SQL)
*/

-- Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_soc_lab_plans_user_id ON soc_lab_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_soc_lab_progress_user_id ON soc_lab_progress(user_id);

-- Drop unused index
DROP INDEX IF EXISTS idx_whats_new_order_index;

-- Fix RLS policies on whats_new table
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow authenticated users to insert whats_new" ON whats_new;
DROP POLICY IF EXISTS "Allow authenticated users to update whats_new" ON whats_new;
DROP POLICY IF EXISTS "Allow authenticated users to delete whats_new" ON whats_new;
DROP POLICY IF EXISTS "Allow anyone to view whats_new" ON whats_new;

-- Create new restrictive read-only policy
-- Allow all authenticated users to view all whats_new entries
CREATE POLICY "Authenticated users can view whats_new"
  ON whats_new
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow public (unauthenticated) users to view whats_new entries
CREATE POLICY "Public users can view whats_new"
  ON whats_new
  FOR SELECT
  TO anon
  USING (true);