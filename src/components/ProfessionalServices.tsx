
import { useState } from 'react';
import { Service } from '@/services/professionalService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';
import BookServiceForm from './BookServiceForm';

interface ProfessionalServicesProps {
  services: Service[];
  professionalId: string;
  isProfessionalView?: boolean;
  onAddService?: () => void;
}

const ProfessionalServices = ({ 
  services, 
  professionalId, 
  isProfessionalView = false,
  onAddService 
}: ProfessionalServicesProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingDialogOpen(true);
  };

  if (services.length === 0 && !isProfessionalView) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No services available from this professional.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {isProfessionalView && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Services</h3>
          <Button onClick={onAddService} size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <DollarSign className="mr-2 h-4 w-4 text-primary" />
                  <span>{formatCurrency(service.price)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!isProfessionalView && (
                <Button 
                  onClick={() => handleBookService(service)} 
                  className="w-full"
                  variant="default"
                >
                  Book This Service
                </Button>
              )}
              {isProfessionalView && (
                <div className="flex w-full gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}

        {services.length === 0 && isProfessionalView && (
          <Card className="w-full col-span-full flex items-center justify-center p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">You haven't added any services yet.</p>
              <Button onClick={onAddService}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Service
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              Complete the form below to book this service.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <BookServiceForm 
              service={selectedService}
              professionalId={professionalId}
              onSuccess={() => setBookingDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalServices;
