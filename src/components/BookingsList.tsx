
import { useState } from 'react';
import { format } from 'date-fns';
import { MapPin, Phone, User, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Booking } from '@/services/professionalService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BookingsListProps {
  bookings: Booking[];
  isProfessionalView?: boolean;
}

const BookingsList = ({ bookings, isProfessionalView = false }: BookingsListProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  if (bookings.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">
            {isProfessionalView 
              ? "You don't have any bookings yet."
              : "You haven't booked any services yet."
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <div className="flex bg-muted p-2">
              {getStatusIcon(booking.status)}
              <div className="ml-2 flex-grow">
                {getStatusBadge(booking.status)}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(booking.created_at), "MMM d, yyyy")}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Booking #{booking.id.slice(0, 8)}</CardTitle>
              <CardDescription>
                {format(new Date(booking.booking_date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {isProfessionalView && booking.client && (
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{booking.client.first_name} {booking.client.last_name}</span>
                  </div>
                  {booking.client.location && (
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{booking.client.location}</span>
                    </div>
                  )}
                  {booking.client.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{booking.client.phone}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewDetails(booking)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Booking #{selectedBooking.id.slice(0, 8)}</h3>
                {getStatusBadge(selectedBooking.status)}
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Appointment Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(selectedBooking.booking_date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                </div>
                
                {isProfessionalView && selectedBooking.client && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">Client Information</h4>
                    
                    <div className="flex gap-3 items-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Name</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedBooking.client.first_name} {selectedBooking.client.last_name}
                        </div>
                      </div>
                    </div>
                    
                    {selectedBooking.client.location && (
                      <div className="flex gap-3 items-center">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedBooking.client.location}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedBooking.client.phone && (
                      <div className="flex gap-3 items-center">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedBooking.client.phone}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isProfessionalView && selectedBooking.status === 'pending' && (
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" className="w-full">
                      Reject
                    </Button>
                    <Button className="w-full">
                      Confirm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsList;
