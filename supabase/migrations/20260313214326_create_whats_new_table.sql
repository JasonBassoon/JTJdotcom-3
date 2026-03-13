/*
  # Create What's New table for portfolio updates

  1. New Tables
    - `whats_new`
      - `id` (uuid, primary key) - Unique identifier for each update
      - `title` (text, required) - Title of the update/announcement
      - `description` (text, required) - Description of the update
      - `date` (text, required) - Date of the update (formatted string)
      - `category` (text, default 'update') - Category type (project, certification, achievement, update)
      - `link_url` (text, nullable) - Optional URL to related content
      - `link_text` (text, nullable) - Optional custom text for the link button
      - `order_index` (integer, default 0) - Manual ordering for updates
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `whats_new` table
    - Add policy for public read access (SELECT)
    - Add policy for authenticated users to insert/update/delete (for admin purposes)

  3. Indexes
    - Add index on date for efficient ordering
    - Add index on order_index for manual sorting
*/

CREATE TABLE IF NOT EXISTS whats_new (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date text NOT NULL,
  category text DEFAULT 'update',
  link_url text,
  link_text text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE whats_new ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access to whats_new"
  ON whats_new
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert whats_new"
  ON whats_new
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update whats_new"
  ON whats_new
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete
CREATE POLICY "Allow authenticated users to delete whats_new"
  ON whats_new
  FOR DELETE
  TO authenticated
  USING (true);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_whats_new_date ON whats_new(date DESC);
CREATE INDEX IF NOT EXISTS idx_whats_new_order_index ON whats_new(order_index DESC);