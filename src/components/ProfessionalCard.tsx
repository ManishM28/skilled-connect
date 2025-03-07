
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, BadgeCheck, ArrowRight, Briefcase, Phone } from 'lucide-react';
import { Professional } from '@/data/professionals';
import { ProfessionalWithProfile, Service } from '@/services/professionalService';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProfessionalServices from './ProfessionalServices';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalCardProps {
  professional: Professional | ProfessionalWithProfile;
  featured?: boolean;
}

const ProfessionalCard = ({ professional, featured = false }: ProfessionalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const { toast } = useToast();

  // Check if this is a ProfessionalWithProfile type
  const isWithProfile = 'profile' in professional;
  
  // Access the correct name field depending on the type
  const name = isWithProfile 
    ? `${professional.profile.first_name || ''} ${professional.profile.last_name || ''}`.trim()
    : professional.name;
  
  // Access the correct profile image
  const profileImage = isWithProfile
    ? professional.profile.avatar_url || '/placeholder.svg'
    : professional.profileImage;
    
  // Access the correct location
  const location = isWithProfile
    ? professional.profile.location || 'Unknown location'
    : professional.location;

  // Always use verificationBadge from professional
  const verificationBadge = isWithProfile
    ? professional.verification_badge
    : professional.verificationBadge;

  // Get the rating value
  const rating = isWithProfile
    ? professional.avg_rating || 0
    : professional.rating;

  // Get the review count
  const reviewCount = isWithProfile
    ? professional.review_count
    : professional.reviewCount;

  // Get the hourly rate
  const hourlyRate = isWithProfile
    ? professional.hourly_rate || 0
    : professional.hourlyRate;

  // Get the description
  const description = isWithProfile
    ? professional.profile.bio || 'No description available'
    : professional.description;

  // Get the availability
  const availability = isWithProfile
    ? professional.availability || 'Contact for availability'
    : professional.availability;

  // Get featured project
  const featuredProject = isWithProfile
    ? professional.featured_project ? {
        title: professional.featured_project.title,
        image: professional.featured_project.image_url || '/placeholder.svg',
        description: professional.featured_project.description || ''
      } : undefined
    : professional.featuredProject;

  // Get phone number
  const phoneNumber = isWithProfile
    ? professional.profile.phone || ''
    : '';

  // Determine if services are available
  const hasServices = isWithProfile && professional.services && professional.services.length > 0;

  // Handle phone call
  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
      toast({
        title: "Calling",
        description: `Calling ${name}...`,
      });
    } else {
      toast({
        title: "Phone Unavailable",
        description: "This professional hasn't provided a phone number.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div 
      className={cn(
        "group rounded-2xl overflow-hidden hover-lift bg-card border border-border/40",
        featured ? "col-span-full md:col-span-2" : "col-span-1"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "flex flex-col h-full",
        featured && "md:flex-row"
      )}>
        {featured && featuredProject && (
          <div className="relative md:w-1/2 h-60 md:h-auto overflow-hidden">
            <img 
              src={featuredProject.image} 
              alt={featuredProject.title}
              className={cn(
                "object-cover w-full h-full",
                "transition-transform duration-500 ease-out",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="text-xs uppercase tracking-wider mb-1 opacity-80">Featured Project</div>
                <div className="font-semibold">{featuredProject.title}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className={cn(
          "flex flex-col p-6",
          featured && "md:w-1/2"
        )}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="relative mr-4">
                <img 
                  src={profileImage} 
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                {verificationBadge && (
                  <span className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                    <BadgeCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">{professional.category}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm ml-1">({reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {(isWithProfile ? professional.specialties : professional.specialties).map((specialty, index) => (
              <span 
                key={index}
                className="px-2 py-1 rounded-full bg-secondary text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-border/60">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-lg">${hourlyRate}/hr</div>
                <div className="text-xs text-muted-foreground">{availability}</div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              {phoneNumber && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={handleCall}
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              )}
              
              {hasServices && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowServices(true)}
                >
                  <Briefcase className="mr-2 w-4 h-4" />
                  View Services
                </Button>
              )}
              
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                View Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Dialog */}
      {isWithProfile && professional.services && (
        <Dialog open={showServices} onOpenChange={setShowServices}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Services Offered by {name}</DialogTitle>
              <DialogDescription>
                Browse and book available services
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <ProfessionalServices 
                services={professional.services} 
                professionalId={professional.id}
              />
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowServices(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default ProfessionalCard;
