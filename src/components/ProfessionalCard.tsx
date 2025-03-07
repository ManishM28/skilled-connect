
import { Link } from 'react-router-dom';
import { ProfessionalWithProfile } from '@/services/professionalService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { 
  Star, 
  MapPin, 
  Phone, 
  Check, 
  Clock, 
  DollarSign, 
  AlertCircle 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfessionalCardProps {
  professional: ProfessionalWithProfile;
}

const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const { 
    id, 
    profile, 
    hourly_rate, 
    category,
    specialties, 
    verification_badge, 
    availability, 
    avg_rating, 
    review_count,
    emergency_available,
    daily_pay_available
  } = professional;

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // Handle phone call
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (profile.phone) {
      window.location.href = `tel:${profile.phone}`;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatar_url || ''} alt={fullName} />
              <AvatarFallback>{initials || '?'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-1">
                {fullName}
                {verification_badge && (
                  <Check className="h-4 w-4 text-primary rounded-full bg-primary/10 p-0.5" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="font-medium">
                {avg_rating ? avg_rating.toFixed(1) : 'New'}
              </span>
              <span className="text-xs text-muted-foreground">
                ({review_count})
              </span>
            </div>
            <p className="font-semibold text-lg">${hourly_rate}/hr</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        {profile.location && (
          <p className="text-sm flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </p>
        )}

        {availability && (
          <p className="text-sm flex items-center gap-1 text-muted-foreground mb-2">
            <Clock className="h-3.5 w-3.5" />
            {availability}
          </p>
        )}

        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {specialties.slice(0, 3).map((specialty, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="outline" className="font-normal">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Emergency and Daily Pay indicators */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {emergency_available && (
            <Badge variant="destructive" className="font-normal flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Emergency Service
            </Badge>
          )}
          
          {daily_pay_available && (
            <Badge variant="secondary" className="font-normal flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Daily Pay
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex flex-col sm:flex-row items-stretch gap-2">
        <Button 
          asChild 
          variant="default" 
          className="w-full sm:flex-1"
        >
          <Link to={`/professional/${id}`}>
            View Profile
          </Link>
        </Button>
        
        {profile.phone && (
          <Button 
            onClick={handleCall} 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-1"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfessionalCard;
