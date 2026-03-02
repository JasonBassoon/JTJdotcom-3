/*
  # Fix Documentation and Learning Milestones RLS Policies

  ## Problem
  The `project_documentation_steps` and `learning_milestones` tables had RLS policies
  using `anon, authenticated` roles instead of `public` role. This prevented 
  unauthenticated/preview users from accessing the data.

  ## Changes
  1. Update project_documentation_steps RLS policy
     - Drop existing policy with `anon, authenticated` roles
     - Create new policy with `public` role
     - Matches the pattern used for projects, about_info, and experiences tables

  2. Update learning_milestones RLS policy
     - Drop existing policy with `anon, authenticated` roles
     - Create new policy with `public` role
     - Ensures consistency across all public-facing tables

  ## Security Notes
  - Using `public` role allows unauthenticated read access
  - This is intentional for portfolio content that should be publicly visible
  - Write operations still require authentication (separate policies)
*/

-- Fix project_documentation_steps RLS policy
DROP POLICY IF EXISTS "Public can view documentation steps" ON project_documentation_steps;

CREATE POLICY "Anyone can view documentation steps"
  ON project_documentation_steps
  FOR SELECT
  TO public
  USING (true);

-- Fix learning_milestones RLS policy
DROP POLICY IF EXISTS "Anyone can view learning milestones" ON learning_milestones;

CREATE POLICY "Public can view learning milestones"
  ON learning_milestones
  FOR SELECT
  TO public
  USING (true);

-- Add documentation comments
COMMENT ON POLICY "Anyone can view documentation steps" ON project_documentation_steps IS 'Allows public read access to project documentation steps for portfolio display';
COMMENT ON POLICY "Public can view learning milestones" ON learning_milestones IS 'Allows public read access to learning milestones for portfolio display';