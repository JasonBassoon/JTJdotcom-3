import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqcdrwxyfqwtoaklreap.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY2Ryd3h5ZnF3dG9ha2xyZWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDg2NzcsImV4cCI6MjA4NTI4NDY3N30.9iNBfskAhOo2VXzQsa0hTDlcauxb9xSFX0acbkkfh9E'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Current experiences:')
  data.forEach(exp => {
    console.log(`${exp.order_index}: ${exp.company} - ${exp.position}`)
  })
}

checkExperiences()
