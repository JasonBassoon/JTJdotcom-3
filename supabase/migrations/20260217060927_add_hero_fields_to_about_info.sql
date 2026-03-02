/*
  # Add Hero Section Fields to About Info

  ## Changes Made
  
  1. New Columns Added to `about_info` table:
    - `subtitle` (text) - The hero subtitle/title (e.g., "Aspiring Cybersecurity Professional")
    - `hero_bio` (text) - The main hero paragraph text describing the person
    - `hero_stats` (jsonb) - Array of stat cards with icon, number, and label
    - `hero_cta_primary_text` (text) - Primary CTA button text
    - `hero_cta_primary_link` (text) - Primary CTA button link
    - `hero_cta_secondary_text` (text) - Secondary CTA button text
    - `hero_cta_secondary_link` (text) - Secondary CTA button link
  
  2. Purpose:
    - Makes the Hero section database-driven instead of hardcoded
    - Allows content updates without code deployment
    - Consistent with existing database-driven sections (Projects, Learning)
  
  ## Notes
  - All new fields have sensible defaults
  - hero_stats uses JSONB for flexible stat card storage
  - Existing about_info data remains unchanged
*/

-- Add hero-specific fields to about_info table
DO $$
BEGIN
  -- Add subtitle field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'subtitle'
  ) THEN
    ALTER TABLE about_info ADD COLUMN subtitle text DEFAULT 'Aspiring Cybersecurity Professional';
  END IF;

  -- Add hero bio field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_bio'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_bio text DEFAULT '';
  END IF;

  -- Add hero stats field (JSONB array)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_stats'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_stats jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add primary CTA text
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_cta_primary_text'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_cta_primary_text text DEFAULT 'View Projects';
  END IF;

  -- Add primary CTA link
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_cta_primary_link'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_cta_primary_link text DEFAULT '#projects';
  END IF;

  -- Add secondary CTA text
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_cta_secondary_text'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_cta_secondary_text text DEFAULT 'Get In Touch';
  END IF;

  -- Add secondary CTA link
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'about_info' AND column_name = 'hero_cta_secondary_link'
  ) THEN
    ALTER TABLE about_info ADD COLUMN hero_cta_secondary_link text DEFAULT '#contact';
  END IF;
END $$;