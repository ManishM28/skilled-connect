
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfessionalWithProfile, getTopProfessionals } from '@/services/professionalService';
import ProfessionalCard from '@/components/ProfessionalCard';
import { categories } from '@/data/categories';
import { Loader2, Filter, Phone, AlertCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmergencySOS from '@/components/EmergencySOS';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ProfessionalsList = () => {
  const [professionals, setProfessionals] = useState<ProfessionalWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [showOnlyWithPhone, setShowOnlyWithPhone] = useState(false);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [showDailyPayOnly, setShowDailyPayOnly] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        // Use the query parameter if available
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        
        if (category) {
          setSelectedCategory(category);
        }
        
        const data = await getTopProfessionals(100);
        setProfessionals(data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [location]);

  // Filter professionals based on search, category, price range, phone availability, emergency, and daily pay
  const filteredProfessionals = professionals.filter(pro => {
    const nameMatch = 
      `${pro.profile.first_name} ${pro.profile.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    
    const categoryMatch = selectedCategory ? pro.category === selectedCategory : true;
    
    let priceMatch = true;
    if (priceRange) {
      const rate = pro.hourly_rate || 0;
      switch (priceRange) {
        case 'low':
          priceMatch = rate <= 50;
          break;
        case 'medium':
          priceMatch = rate > 50 && rate <= 100;
          break;
        case 'high':
          priceMatch = rate > 100;
          break;
      }
    }
    
    const phoneMatch = showOnlyWithPhone ? !!pro.profile.phone : true;
    const emergencyMatch = showEmergencyOnly ? !!pro.emergency_available : true;
    const dailyPayMatch = showDailyPayOnly ? !!pro.daily_pay_available : true;
    
    return nameMatch && categoryMatch && priceMatch && phoneMatch && emergencyMatch && dailyPayMatch;
  });

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Service Providers</h1>
        <EmergencySOS />
      </div>
      
      <div className="mb-8 space-y-4 bg-card p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-xs"
          />
          
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              navigate(`/professionals${value ? `?category=${value}` : ''}`, { replace: true });
            }}
          >
            <SelectTrigger className="sm:max-w-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={priceRange}
            onValueChange={setPriceRange}
          >
            <SelectTrigger className="sm:max-w-xs">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Price</SelectItem>
              <SelectItem value="low">Budget ($0-$50/hr)</SelectItem>
              <SelectItem value="medium">Standard ($51-$100/hr)</SelectItem>
              <SelectItem value="high">Premium ($100+/hr)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant={showOnlyWithPhone ? "default" : "outline"}
            size="sm"
            onClick={() => setShowOnlyWithPhone(!showOnlyWithPhone)}
            className="flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            {showOnlyWithPhone ? "Showing call-enabled" : "Show call-enabled only"}
          </Button>
          
          <Button 
            variant={showEmergencyOnly ? "destructive" : "outline"}
            size="sm"
            onClick={() => setShowEmergencyOnly(!showEmergencyOnly)}
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4" />
            {showEmergencyOnly ? "Showing emergency services" : "Show emergency services only"}
          </Button>
          
          <Button 
            variant={showDailyPayOnly ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowDailyPayOnly(!showDailyPayOnly)}
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" />
            {showDailyPayOnly ? "Showing daily pay" : "Show daily pay only"}
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Filter className="w-4 h-4 mr-1" />
            <span>
              Showing {filteredProfessionals.length} of {professionals.length} professionals
            </span>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : filteredProfessionals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No professionals found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalsList;
