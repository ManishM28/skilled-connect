
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addProfessionalService } from '@/services/professionalService';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Service title must be at least 3 characters.",
  }).max(100),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  duration: z.coerce.number().int().positive({
    message: "Duration must be a positive number in minutes.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddServiceFormProps {
  professionalId: string;
  onSuccess: () => void;
}

const AddServiceForm = ({ professionalId, onSuccess }: AddServiceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: 60,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const newService = await addProfessionalService({
        professional_id: professionalId,
        title: data.title,
        description: data.description,
        price: data.price,
        duration: data.duration,
      });
      
      if (newService) {
        toast({
          title: "Service added",
          description: "Your service has been added successfully.",
        });
        onSuccess();
      } else {
        throw new Error("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        title: "Error",
        description: "There was an error adding your service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Home Plumbing Repair" {...field} />
              </FormControl>
              <FormDescription>
                A concise title for your service
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what's included in this service..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Detailed explanation of what the service includes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" min="15" step="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
            {isSubmitting ? "Adding..." : "Add Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddServiceForm;
