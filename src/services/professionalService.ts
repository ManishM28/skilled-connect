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
  emergency_available?: boolean;
  daily_pay_available?: boolean;
};

export type Service = {
  id: string;
  professional_id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  created_at: string;
  is_emergency?: boolean;
  is_daily_pay?: boolean;
};

export type Booking = {
  id: string;
  professional_id: string;
  client_id: string;
  service_id: string;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  is_emergency?: boolean;
  is_daily_pay?: boolean;
  client?: {
    first_name: string | null;
    last_name: string | null;
    location: string | null;
    phone: string | null;
  };
};

export type EmergencySOS = {
  id: string;
  client_id: string;
  professional_id: string | null;
  location: string;
  description: string;
  status: 'active' | 'resolved' | 'cancelled';
  created_at: string;
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

  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null,
      emergency_available: pro.emergency_available || false,
      daily_pay_available: pro.daily_pay_available || false
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

  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null,
      emergency_available: pro.emergency_available || false,
      daily_pay_available: pro.daily_pay_available || false
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

  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null,
      emergency_available: pro.emergency_available || false,
      daily_pay_available: pro.daily_pay_available || false
    } as ProfessionalWithProfile;
  });
}

export async function getEmergencyProfessionals(limit = 10): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio, phone),
      avg_rating: reviews(rating)
    `)
    .eq('emergency_available', true)
    .order('years_experience', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching emergency professionals:', error);
    return [];
  }

  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null,
      emergency_available: true,
      daily_pay_available: pro.daily_pay_available || false
    } as ProfessionalWithProfile;
  });
}

export async function getDailyPayProfessionals(limit = 10): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio, phone),
      avg_rating: reviews(rating)
    `)
    .eq('daily_pay_available', true)
    .order('years_experience', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching daily pay professionals:', error);
    return [];
  }

  return data.map(pro => {
    const ratings = pro.avg_rating as { rating: number }[] || [];
    const avg = ratings.length 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : null;
    
    return {
      ...pro,
      avg_rating: avg,
      review_count: ratings.length,
      featured_project: null,
      emergency_available: pro.emergency_available || false,
      daily_pay_available: true
    } as ProfessionalWithProfile;
  });
}

export async function createEmergencySOS(
  emergencySOS: Omit<EmergencySOS, 'id' | 'created_at' | 'status'>
): Promise<EmergencySOS | null> {
  const { data, error } = await supabase
    .from('emergency_sos')
    .insert([{ ...emergencySOS, status: 'active' }])
    .select()
    .single();

  if (error) {
    console.error('Error creating emergency SOS:', error);
    return null;
  }

  return data;
}

export async function getClientEmergencySOS(clientId: string): Promise<EmergencySOS[]> {
  const { data, error } = await supabase
    .from('emergency_sos')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching client emergency SOS:', error);
    return [];
  }

  return data;
}

export async function updateEmergencySOSStatus(
  id: string, 
  status: 'active' | 'resolved' | 'cancelled'
): Promise<boolean> {
  const { error } = await supabase
    .from('emergency_sos')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating emergency SOS status:', error);
    return false;
  }

  return true;
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

  return {
    ...data,
    status: data.status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
  };
}
