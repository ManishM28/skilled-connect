
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createEmergencySOS } from '@/services/professionalService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const EmergencySOS = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [location, setLocation] = useState(profile?.location || '');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSOSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to use this feature",
        variant: "destructive",
      });
      return;
    }
    
    if (!location || !description) {
      toast({
        title: "Missing information",
        description: "Please provide your location and describe the emergency",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const emergencySOS = await createEmergencySOS({
        client_id: user.id,
        location,
        description,
        professional_id: null,
      });
      
      if (emergencySOS) {
        toast({
          title: "Emergency SOS Sent",
          description: "Your emergency request has been submitted. Available professionals will be notified.",
        });
        setIsOpen(false);
        setDescription('');
      } else {
        throw new Error("Failed to create emergency SOS");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error sending your emergency request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          className="flex items-center gap-2"
          size="lg"
        >
          <AlertCircle className="h-5 w-5" />
          Emergency SOS
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Emergency Service Request
          </DialogTitle>
          <DialogDescription>
            Submit your emergency request and available professionals will be contacted immediately.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSOSSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium">
                Your Location
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your current location"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Emergency Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your emergency situation"
                className="min-h-[100px]"
                required
              />
            </div>
          </div>
          
          {profile?.phone ? (
            <div className="bg-muted p-3 rounded-md mb-4">
              <p className="text-sm flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Professionals will be able to contact you at: <span className="font-medium ml-1">{profile.phone}</span>
              </p>
            </div>
          ) : (
            <div className="bg-destructive/10 p-3 rounded-md mb-4 text-destructive text-sm">
              <p className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Please add a phone number to your profile for emergency contact.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive" 
              disabled={isSubmitting || !profile?.phone}
            >
              {isSubmitting ? 'Submitting...' : 'Send Emergency SOS'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencySOS;
