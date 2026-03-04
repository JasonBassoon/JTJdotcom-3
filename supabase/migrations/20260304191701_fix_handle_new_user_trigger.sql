/*
  # Fix handle_new_user trigger function
  
  1. Changes
    - Update handle_new_user() function to only insert id and email
    - Remove reference to non-existent full_name column
    - This allows new users to be created via Supabase Auth
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (
    new.id,
    new.email
  );
  RETURN new;
END;
$$;
