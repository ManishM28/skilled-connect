
import React, { useEffect, useRef, useState } from 'react';
import { Locate, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  // Mock locations for demonstration (in real app, we would geocode the text addresses)
  const mockLocations = [
    { id: '1', name: 'John Plumber', location: 'Downtown', lat: 40.712776, lng: -74.005974 },
    { id: '2', name: 'Mary Electrician', location: 'Brooklyn', lat: 40.650002, lng: -73.949997 },
    { id: '3', name: 'Kevin Carpenter', location: 'Queens', lat: 40.742054, lng: -73.769417 },
  ];

  const locations = professionalLocations.length > 0 ? professionalLocations : mockLocations;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
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
              <div class="bg-secondary/50 p-3 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${loc.name}</span>
                <span class="text-xs ml-2 text-muted-foreground">(${loc.location})</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }, [locations, userLocation]);

  return (
    <div className={cn("relative w-full h-[400px] bg-background border rounded-lg overflow-hidden", className)}>
      <div className="absolute top-2 right-2 z-10">
        <Button variant="secondary" size="sm" onClick={getUserLocation} className="flex items-center gap-2">
          <Locate className="h-4 w-4" />
          <span>Locate Me</span>
        </Button>
      </div>
      
      <div ref={mapRef} className="w-full h-full"></div>
      
      {/* Map overlay with gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 to-transparent"></div>
    </div>
  );
};

export default Map;
