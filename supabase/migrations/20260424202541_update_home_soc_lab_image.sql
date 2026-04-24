/*
  # Update Home SOC Lab Project Image

  1. Changes
    - Update the `image_url` field for the "Home SOC Lab" project
    - Replace the Pexels stock image with the new SOC Lab architecture diagram
    - The new image is stored locally at `/Home_SOC_Lab_Diagram.png`

  2. Notes
    - This is a data-only update; no schema changes
    - Only affects the single row identified by the Home SOC Lab project id
*/

UPDATE projects
SET image_url = '/Home_SOC_Lab_Diagram.png'
WHERE id = '00000000-0000-0000-0000-000000000002';
