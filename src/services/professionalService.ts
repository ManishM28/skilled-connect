
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
  };
  avg_rating: number | null;
  review_count: number;
  featured_project: {
    id: string;
    title: string;
    image_url: string | null;
    description: string | null;
  } | null;
};

export async function getFeaturedProfessionals(limit = 3): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio),
      avg_rating: reviews(rating)
    `)
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
  limit = 10
): Promise<ProfessionalWithProfile[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select(`
      *,
      profile: profiles(first_name, last_name, avatar_url, location, bio),
      avg_rating: reviews(rating)
    `)
    .eq('category', category)
    .limit(limit);

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
