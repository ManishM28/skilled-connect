
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { Service, createBooking } from '@/services/professionalService';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  bookingDate: z.date({
    required_error: "Please select a date and time",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BookServiceFormProps {
  service: Service;
  professionalId: string;
  onSuccess: () => void;
}

const BookServiceForm = ({ service, professionalId, onSuccess }: BookServiceFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to book a service",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const booking = await createBooking({
        professional_id: professionalId,
        client_id: user.id,
        service_id: service.id,
        booking_date: data.bookingDate.toISOString(),
        status: 'pending',
      });
      
      if (booking) {
        toast({
          title: "Booking successful",
          description: `Your booking for ${service.title} has been submitted.`,
        });
        onSuccess();
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error booking this service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">{service.title}</h4>
          <p className="text-sm text-muted-foreground">{service.description}</p>
          <div className="text-sm">
            <span className="font-medium">Price:</span> ${service.price.toFixed(2)}
          </div>
          <div className="text-sm">
            <span className="font-medium">Duration:</span> {service.duration} minutes
          </div>
        </div>

        <FormField
          control={form.control}
          name="bookingDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Booking Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP p")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Book Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookServiceForm;
