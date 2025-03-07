
import React, { useEffect, useRef, useState } from 'react';
import { Locate, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  className?: string;
  professionalLocations?: Array<{
    id: string;
    name: string;
    location: string;
    lat?: number;
    lng?: number;
  }>;
}

const Map = ({ className, professionalLocations = [] }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Mock locations for demonstration (in real app, we would geocode the text addresses)
  const mockLocations = [
    { id: '1', name: 'John Plumber', location: 'Downtown', lat: 40.712776, lng: -74.005974 },
    { id: '2', name: 'Mary Electrician', location: 'Brooklyn', lat: 40.650002, lng: -73.949997 },
    { id: '3', name: 'Kevin Carpenter', location: 'Queens', lat: 40.742054, lng: -73.769417 },
  ];

  const locations = professionalLocations.length > 0 ? professionalLocations : mockLocations;

  const getUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location found",
            description: "We've found your current location.",
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting user location:', error);
          toast({
            title: "Location error",
            description: "Could not access your location. Please check your browser permissions.",
            variant: "destructive"
          });
          setIsLocating(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      });
      setIsLocating(false);
    }
  };

  const getDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    // In a real implementation, we would integrate with a maps API like Google Maps or Mapbox
    // This is a placeholder for a real map implementation
    
    // Initialize map
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="p-4 text-center">
          <p class="text-lg font-medium mb-4">Interactive Map</p>
          <p class="text-sm text-muted-foreground mb-2">User Location: ${userLocation ? `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}` : 'Not set'}</p>
          <div class="mt-4 space-y-2">
            ${locations.map(loc => `
              <div class="bg-secondary/50 p-3 rounded-md flex items-center justify-between">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>${loc.name}</span>
                  <span class="text-xs ml-2 text-muted-foreground">(${loc.location})</span>
                </div>
                <div class="flex gap-1">
                  <button class="p-1 bg-primary/10 rounded-full hover:bg-primary/20" onclick="window.open('tel:123456789')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </button>
                  <button class="p-1 bg-primary/10 rounded-full hover:bg-primary/20" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}', '_blank')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }, [locations, userLocation]);

  return (
    <div className={cn("relative w-full h-[400px] bg-background border rounded-lg overflow-hidden", className)}>
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={getUserLocation} 
                className="flex items-center gap-2"
                disabled={isLocating}
              >
                <Locate className="h-4 w-4" />
                <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find professionals near your location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {userLocation && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => getDirections(40.712776, -74.005974)} 
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Directions</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get directions to this professional</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div ref={mapRef} className="w-full h-full"></div>
      
      {/* Map overlay with gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 to-transparent"></div>
      
      {/* Overlay when locating */}
      {isLocating && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <Locate className="h-8 w-8 mx-auto mb-2" />
            <p>Finding your location...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
