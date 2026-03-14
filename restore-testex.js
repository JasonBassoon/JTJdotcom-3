import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqcdrwxyfqwtoaklreap.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY2Ryd3h5ZnF3dG9ha2xyZWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDg2NzcsImV4cCI6MjA4NTI4NDY3N30.9iNBfskAhOo2VXzQsa0hTDlcauxb9xSFX0acbkkfh9E'

const supabase = createClient(supabaseUrl, supabaseKey)

async function restoreTestex() {
  // First check if Testex already exists
  const { data: existing } = await supabase
    .from('experiences')
    .select('id, company')
    .ilike('company', '%Testex%')

  if (existing && existing.length > 0) {
    console.log('Testex entry already exists:', existing)
    return
  }

  // Insert the Testex entry
  const { data, error } = await supabase
    .from('experiences')
    .insert({
      company: 'Testex Inc.',
      position: 'Industrial Technology / Technical Role',
      start_date: 'Post-Anadrill',
      end_date: null,
      location: '',
      description: 'After my time at Anadrill Schlumberger, I later joined Testex Inc., a company known for corrosion monitoring and materials testing equipment used in industrial and energy sectors. In this role I worked with technical equipment and supported industrial clients requiring precise testing and inspection tools.',
      highlights: [
        'Worked with industrial inspection and corrosion monitoring equipment',
        'Supported technical operations involving materials testing tools',
        'Assisted clients and technicians using specialized inspection instruments',
        'Maintained strong attention to accuracy and procedural compliance',
        'Operated within industrial environments requiring safety and precision'
      ],
      order_index: 80
    })
    .select()

  if (error) {
    console.error('Error inserting Testex entry:', error)
    return
  }

  console.log('Successfully restored Testex Inc. entry:', data)
}

restoreTestex()
