
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Generate 100 sample labor providers
    const categories = [
      'plumbing', 'electrical', 'carpentry', 'painting', 
      'hvac', 'landscaping', 'cleaning', 'roofing', 
      'tiling', 'concrete', 'masonry', 'drywall',
      'flooring', 'pool', 'pest control', 'security',
      'solar', 'moving', 'appliance repair', 'cabinetry'
    ]

    const firstNames = [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 
      'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 
      'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 
      'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley', 
      'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna'
    ]

    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 
      'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 
      'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 
      'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
    ]

    const locations = [
      'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
      'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
      'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
      'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA'
    ]

    for (let i = 0; i < 100; i++) {
      // Generate random data for this professional
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`
      const phone = `+1${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 9000 + 1000)}`
      const category = categories[Math.floor(Math.random() * categories.length)]
      const hourlyRate = Math.floor(Math.random() * 100) + 20
      const yearsExperience = Math.floor(Math.random() * 20) + 1
      const location = locations[Math.floor(Math.random() * locations.length)]
      const specialties = []
      
      // Add 2-4 specialties
      const numSpecialties = Math.floor(Math.random() * 3) + 2
      const specialtyOptions = [
        'Emergency Repairs', 'Installation', 'Maintenance', 'Residential', 
        'Commercial', 'Industrial', 'Green Solutions', 'Custom Work',
        'Renovations', 'New Construction', 'Troubleshooting', 'Inspections',
        'Consultations', 'Upgrades', 'Repairs', 'Smart Home'
      ]
      
      for (let j = 0; j < numSpecialties; j++) {
        const specialty = specialtyOptions[Math.floor(Math.random() * specialtyOptions.length)]
        if (!specialties.includes(specialty)) {
          specialties.push(specialty)
        }
      }
      
      // Create the user with auth
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: 'password123',
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          is_professional: true,
          phone: phone
        }
      })
      
      if (authError) {
        console.error(`Error creating user ${i}:`, authError)
        continue
      }
      
      const userId = authUser.user.id
      
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          location,
          bio: `Professional ${category} specialist with ${yearsExperience} years of experience.`,
          avatar_url: `https://i.pravatar.cc/300?u=${userId}`,
        })
        .eq('id', userId)
      
      if (profileError) {
        console.error(`Error updating profile for user ${i}:`, profileError)
      }
      
      // Insert professional data
      const { error: proError } = await supabase
        .from('professionals')
        .insert({
          id: userId,
          category,
          hourly_rate: hourlyRate,
          years_experience: yearsExperience,
          specialties,
          verification_badge: Math.random() > 0.3, // 70% have verification
          availability: ['Available now', 'Available next week', 'Limited availability'][Math.floor(Math.random() * 3)]
        })
      
      if (proError) {
        console.error(`Error creating professional record for user ${i}:`, proError)
      }
      
      // Generate 3-5 reviews
      const numReviews = Math.floor(Math.random() * 3) + 3
      for (let j = 0; j < numReviews; j++) {
        // Generate a unique ID for each reviewer
        const reviewerId = crypto.randomUUID()
        
        // Assume the reviewer is a real user with a profile
        const reviewerFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const reviewerLastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        
        // Create a profile for the reviewer
        const { error: reviewerProfileError } = await supabase
          .from('profiles')
          .insert({
            id: reviewerId,
            first_name: reviewerFirstName,
            last_name: reviewerLastName,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        
        if (reviewerProfileError) {
          console.error(`Error creating reviewer profile:`, reviewerProfileError)
          continue
        }
        
        // Generate a rating between 3 and 5
        const rating = Math.floor(Math.random() * 3) + 3
        
        // Generate a random comment based on rating
        let comment
        if (rating === 5) {
          comment = [
            'Excellent service! Very professional and completed the job quickly.',
            'Couldn\'t be happier with the quality of work. Highly recommend!',
            'Arrived on time, worked efficiently, and left the area clean. Perfect!',
            'Outstanding professional. Will definitely hire again for future projects.',
            'Top-notch service and expertise. Worth every penny!'
          ][Math.floor(Math.random() * 5)]
        } else if (rating === 4) {
          comment = [
            'Good work overall. Minor issues but addressed them promptly.',
            'Reliable and knowledgeable. Slightly over the estimated time but good results.',
            'Professional service with good attention to detail. Would use again.',
            'Very satisfied with the work. Good communication throughout the project.',
            'Quality service and fair pricing. Some delays but worth the wait.'
          ][Math.floor(Math.random() * 5)]
        } else {
          comment = [
            'Decent work but took longer than expected.',
            'Acceptable service but communication could be improved.',
            'Got the job done but had to clarify several requirements multiple times.',
            'Service was okay. Some room for improvement but got the basics right.',
            'Average service. Met expectations but nothing exceptional.'
          ][Math.floor(Math.random() * 5)]
        }
        
        // Create the review
        const { error: reviewError } = await supabase
          .from('reviews')
          .insert({
            professional_id: userId,
            client_id: reviewerId,
            rating,
            comment,
            created_at: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString() // Random date in the last 90 days
          })
        
        if (reviewError) {
          console.error(`Error creating review:`, reviewError)
        }
      }
      
      // Generate a featured project for some professionals
      if (Math.random() > 0.5) { // 50% have a featured project
        const projectTitles = {
          plumbing: ['Complete Bathroom Remodel', 'Kitchen Sink Installation', 'Water Heater Replacement'],
          electrical: ['Home Rewiring', 'Smart Home Installation', 'Lighting System Upgrade'],
          carpentry: ['Custom Kitchen Cabinets', 'Deck Construction', 'Built-in Bookshelves'],
          painting: ['Exterior Home Painting', 'Interior Color Transformation', 'Cabinet Refinishing'],
          hvac: ['Central AC Installation', 'Heating System Upgrade', 'Ductwork Replacement'],
          landscaping: ['Garden Design & Implementation', 'Backyard Transformation', 'Water Feature Installation'],
          cleaning: ['Deep Home Cleaning', 'Post-Construction Cleanup', 'Move-out Cleaning'],
          roofing: ['Complete Roof Replacement', 'Roof Leak Repair', 'Gutter System Installation']
        }
        
        const defaultTitles = ['Professional Service Project', 'Client Renovation', 'Custom Installation']
        
        const titles = projectTitles[category as keyof typeof projectTitles] || defaultTitles
        const title = titles[Math.floor(Math.random() * titles.length)]
        
        const { error: projectError } = await supabase
          .from('projects')
          .insert({
            professional_id: userId,
            title,
            description: `A showcase of my best work in ${category}. This project demonstrates my attention to detail and commitment to quality.`,
            image_url: `https://source.unsplash.com/random/600x400?${category}`,
            completion_date: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random date in the last 180 days
            is_featured: true
          })
        
        if (projectError) {
          console.error(`Error creating project:`, projectError)
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Generated 100 sample labor providers with reviews' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
