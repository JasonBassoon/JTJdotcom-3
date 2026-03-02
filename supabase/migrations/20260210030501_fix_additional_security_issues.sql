/*
  # Fix Additional Security Issues
  
  ## 1. Optimize Unused Indexes
    - The indexes on soc_lab_plans.user_id and soc_lab_progress.user_id are marked as unused
    - These tables have no data yet, causing the "unused" detection
    - Keep the indexes as they will be needed when data exists
    - Verify they're properly set up for RLS policy usage
  
  ## 2. Fix Contact Submissions RLS Policy
    - Replace the overly permissive "always true" policy
    - Add rate limiting constraints to prevent abuse
    - Add validation requirements for submissions
    - Create new restrictive policies
  
  ## 3. Leaked Password Protection
    - This must be enabled via Supabase Dashboard
    - Navigate to: Authentication > Settings > Enable "Check for compromised passwords"
    - This enables HaveIBeenPwned integration for password breach detection
  
  ## Important Security Notes
    - Contact form now has validation requirements (non-empty fields, valid email format, length limits)
    - Rate limiting added (max 3 submissions per IP per hour)
    - Anonymous submissions still allowed but with strict validation
    - SOC lab table indexes maintained for future use
*/

-- 1. Verify and optimize indexes for SOC lab tables
-- These indexes exist and are needed for RLS policies
-- They appear "unused" because tables are empty
-- Re-analyze statistics to ensure proper query planning
ANALYZE soc_lab_plans;
ANALYZE soc_lab_progress;

-- 2. Fix contact_submissions RLS policy to add validation
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;

-- Create a more restrictive policy with validation
CREATE POLICY "Validated contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Require all fields to be non-empty
    length(trim(name)) > 0 
    AND length(trim(email)) > 0 
    AND length(trim(subject)) > 0 
    AND length(trim(message)) > 0
    -- Basic email validation
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    -- Limit message length to prevent abuse
    AND length(message) <= 5000
    AND length(name) <= 200
    AND length(email) <= 200
    AND length(subject) <= 300
  );

-- Add a check constraint for additional validation at database level
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'contact_submissions_validation'
  ) THEN
    ALTER TABLE contact_submissions 
    ADD CONSTRAINT contact_submissions_validation 
    CHECK (
      length(trim(name)) > 0 
      AND length(trim(email)) > 0 
      AND length(trim(subject)) > 0 
      AND length(trim(message)) > 0
      AND length(message) <= 5000
    );
  END IF;
END $$;

-- 3. Add rate limiting function to prevent spam
CREATE OR REPLACE FUNCTION check_contact_submission_rate_limit()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Check submissions from same IP in last hour
  IF NEW.ip_hash IS NOT NULL AND NEW.ip_hash != '' THEN
    SELECT COUNT(*) INTO recent_count
    FROM contact_submissions
    WHERE ip_hash = NEW.ip_hash
      AND created_at > NOW() - INTERVAL '1 hour';
    
    -- Allow max 3 submissions per IP per hour
    IF recent_count >= 3 THEN
      RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for rate limiting
DROP TRIGGER IF EXISTS contact_submission_rate_limit_trigger ON contact_submissions;
CREATE TRIGGER contact_submission_rate_limit_trigger
  BEFORE INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION check_contact_submission_rate_limit();

-- 4. Add comment documentation for security measures
COMMENT ON TABLE contact_submissions IS 'Contact form submissions with rate limiting (3 per hour per IP) and validation requirements';
COMMENT ON POLICY "Validated contact form submissions" ON contact_submissions IS 'Allows anonymous submissions with required field validation, email format check, and length limits';
COMMENT ON FUNCTION check_contact_submission_rate_limit() IS 'Rate limiting function to prevent contact form spam - max 3 submissions per IP per hour';
