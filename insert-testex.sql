-- Restore Testex Inc. experience entry
-- This script should be run with proper database permissions

INSERT INTO experiences (
  company,
  position,
  start_date,
  end_date,
  location,
  description,
  highlights,
  order_index
)
SELECT
  'Testex Inc.',
  'Industrial Technology / Technical Role',
  'Post-Anadrill',
  NULL,
  '',
  'After my time at Anadrill Schlumberger, I later joined Testex Inc., a company known for corrosion monitoring and materials testing equipment used in industrial and energy sectors. In this role I worked with technical equipment and supported industrial clients requiring precise testing and inspection tools.',
  ARRAY[
    'Worked with industrial inspection and corrosion monitoring equipment',
    'Supported technical operations involving materials testing tools',
    'Assisted clients and technicians using specialized inspection instruments',
    'Maintained strong attention to accuracy and procedural compliance',
    'Operated within industrial environments requiring safety and precision'
  ],
  80
WHERE NOT EXISTS (
  SELECT 1 FROM experiences WHERE company ILIKE '%Testex%'
);
