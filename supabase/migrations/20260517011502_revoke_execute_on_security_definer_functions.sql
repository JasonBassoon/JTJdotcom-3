/*
  # Revoke EXECUTE on SECURITY DEFINER functions from public roles

  ## Summary
  Three SECURITY DEFINER functions in the public schema are exposed via
  PostgREST's `/rpc/` endpoint to both `anon` and `authenticated` roles.
  None of these functions are intended to be called directly by API clients:

  - `check_contact_submission_rate_limit()` — used internally by RLS policies
  - `handle_new_user()` — invoked only by the auth trigger on user creation
  - `update_updated_at_column()` — invoked only by table triggers

  Revoking EXECUTE from `anon`, `authenticated`, and `public` removes the
  attack surface while preserving trigger/policy functionality (triggers run
  as the function owner, not the calling role).

  ## Security Changes
  1. REVOKE EXECUTE on `public.check_contact_submission_rate_limit` from anon, authenticated, public
  2. REVOKE EXECUTE on `public.handle_new_user` from anon, authenticated, public
  3. REVOKE EXECUTE on `public.update_updated_at_column` from anon, authenticated, public
*/

REVOKE EXECUTE ON FUNCTION public.check_contact_submission_rate_limit() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
