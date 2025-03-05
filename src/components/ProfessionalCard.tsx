
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, BadgeCheck, ArrowRight } from 'lucide-react';
import { Professional } from '@/data/professionals';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfessionalCardProps {
  professional: Professional;
  featured?: boolean;
}

const ProfessionalCard = ({ professional, featured = false }: ProfessionalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        {featured && professional.featuredProject && (
          <div className="relative md:w-1/2 h-60 md:h-auto overflow-hidden">
            <img 
              src={professional.featuredProject.image} 
              alt={professional.featuredProject.title}
              className={cn(
                "object-cover w-full h-full",
                "transition-transform duration-500 ease-out",
                isHovered ? "scale-105" : "scale-100"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 text-white">
                <div className="text-xs uppercase tracking-wider mb-1 opacity-80">Featured Project</div>
                <div className="font-semibold">{professional.featuredProject.title}</div>
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
                  src={professional.profileImage} 
                  alt={professional.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                {professional.verificationBadge && (
                  <span className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                    <BadgeCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {professional.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">{professional.category}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="font-medium">{professional.rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm ml-1">({professional.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{professional.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {professional.specialties.map((specialty, index) => (
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
                {professional.location}
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-lg">${professional.hourlyRate}/hr</div>
                <div className="text-xs text-muted-foreground">{professional.availability}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                View Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfessionalCard;
