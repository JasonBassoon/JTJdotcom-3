/*
  # Add Taste of SOAR images and case study header_image_url

  1. Schema Changes
    - Add `header_image_url` (text, nullable) column to `case_studies` table
    - This allows any case study to optionally display a banner image at the top of its page

  2. Data Changes
    - Set the `image_url` on the "Taste of SOAR" project to `/Taste_of_SOAR.png`
    - Set the `header_image_url` on the "Taste of SOAR Layer 1" case study to `/Taste_of_SOAR.png`

  3. Notes
    - The new column is optional (nullable) so existing case studies are unaffected
    - No security changes needed; existing RLS policies cover the new column
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'case_studies'
      AND column_name = 'header_image_url'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN header_image_url text;
  END IF;
END $$;

UPDATE projects
SET image_url = '/Taste_of_SOAR.png'
WHERE id = '00000000-0000-0000-0000-000000000005';

UPDATE case_studies
SET header_image_url = '/Taste_of_SOAR.png'
WHERE slug = 'taste-of-soar-layer-1';
