
import { supabase } from '@/integrations/supabase/client';

export type ProfessionalWithProfile = {
  id: string;
  category: string;
  hourly_rate: number;
  years_experience: number | null;
  availability: string | null;
  verification_badge: boolean;
  specialties: string[];
  profile: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    location: string | null;
    bio: string | null;
    phone: string | null;
  };
  avg_rating: number | null;
  review_count: number;
  featured_project: {
    id: string;
    title: string;
    image_url: string | null;
    description: string | null;
  } | null;
  services?: Service[];
  bookings?: Booking[];
};

export type Service = {
  id: string;
  professional_id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  created_at: string;
};

export type Booking = {
  id: string;
  professional_id: string;
  client_id: string;
  service_id: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  client?: {
    first_name: string | null;
    last_name: string | null;
    location: string | null;
    phone: string | null;
  };
};

export async function getFeaturedProfessionals(limit = 3): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio, phone),
      avg_rating: reviews(rating)
    `)
    .order('years_experience', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured professionals:', error);
    return [];
  }

  // Calculate average rating and review count
  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null, // Will be populated later
    } as ProfessionalWithProfile;
  });
}

export async function getProfessionalsByCategory(
  category: string, 
  limit = 20,
  offset = 0
): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio, phone),
      avg_rating: reviews(rating)
    `)
    .eq('category', category)
    .order('years_experience', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(`Error fetching ${category} professionals:`, error);
    return [];
  }

  // Calculate average rating and review count
  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null, // Will be populated later
    } as ProfessionalWithProfile;
  });
}

export async function getTopProfessionals(limit = 20): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio, phone),
      avg_rating: reviews(rating)
    `)
    .order('years_experience', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top professionals:', error);
    return [];
  }

  // Calculate average rating and review count
  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null, // Will be populated later
    } as ProfessionalWithProfile;
  });
}

export async function getTotalProfessionalsCount(): Promise<number> {
  const { count, error } = await supabase
    .from('professionals')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting professionals:', error);
    return 0;
  }

  return count || 0;
}

export async function getProfessionalServices(professionalId: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('professional_id', professionalId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching professional services:', error);
    return [];
  }

  return data || [];
}

export async function addProfessionalService(service: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error('Error adding professional service:', error);
    return null;
  }

  return data;
}

export async function getProfessionalBookings(professionalId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      client:client_id(first_name, last_name, location, phone)
    `)
    .eq('professional_id', professionalId)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching professional bookings:', error);
    return [];
  }

  // Cast the status to the specific string literals expected by the Booking type
  return (data || []).map(booking => ({
    ...booking,
    status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
  }));
}

export async function getClientBookings(clientId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      client:client_id(first_name, last_name, location, phone)
    `)
    .eq('client_id', clientId)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching client bookings:', error);
    return [];
  }

  // Cast the status to the specific string literals expected by the Booking type
  return (data || []).map(booking => ({
    ...booking,
    status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
  }));
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'client'>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }

  // Cast the status to the specific string literals expected by the Booking type
  return {
    ...data,
    status: data.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
  };
}
