
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categories } from '@/data/categories';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ProfessionalCard from '@/components/ProfessionalCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { getProfessionalsByCategory } from '@/services/professionalService';
import type { ProfessionalWithProfile } from '@/services/professionalService';

const CategoriesPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [professionals, setProfessionals] = useState<ProfessionalWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const category = categories.find(c => c.id === categoryId);
  
  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      if (categoryId) {
        const data = await getProfessionalsByCategory(categoryId);
        setProfessionals(data);
      }
      setLoading(false);
    };
    
    fetchProfessionals();
  }, [categoryId]);
  
  // If category doesn't exist, show not found
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container px-6 md:px-10 max-w-7xl mx-auto pt-24 pb-16">
          <div className="text-center py-20">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Category Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The category you're looking for doesn't seem to exist.
            </p>
            <Link to="/">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-accent/30 pt-32 pb-16">
          <div className="container px-6 md:px-10 max-w-7xl mx-auto">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to all categories
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">
                  {category.name} Professionals
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            </div>
            
            <SearchBar showLocation={true} />
          </div>
        </div>
        
        <div className="py-16">
          <div className="container px-6 md:px-10 max-w-7xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6">
              Top {category.name} Professionals
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="rounded-2xl h-80 bg-accent/50 animate-pulse"></div>
                ))}
              </div>
            ) : professionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map(pro => {
                  // Convert from database model to UI model
                  const uiProfessional = {
                    id: pro.id,
                    name: `${pro.profile.first_name || ''} ${pro.profile.last_name || ''}`.trim(),
                    profileImage: pro.profile.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
                    category: pro.category,
                    rating: pro.avg_rating || 0,
                    reviewCount: pro.review_count || 0,
                    hourlyRate: Number(pro.hourly_rate) || 0,
                    description: pro.profile.bio || '',
                    location: pro.profile.location || 'Location not specified',
                    verificationBadge: pro.verification_badge,
                    specialties: pro.specialties || [],
                    availability: pro.availability || 'Availability not specified',
                  };
                  
                  return (
                    <ProfessionalCard 
                      key={pro.id} 
                      professional={uiProfessional} 
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No professionals found in this category yet.
                </p>
                <p className="mt-2">
                  <Link to="/">
                    <Button variant="link">
                      Browse other categories
                    </Button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
