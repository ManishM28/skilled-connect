
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { categories } from '@/data/categories';
import { useToast } from '@/components/ui/use-toast';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Plus, X, Phone } from 'lucide-react';

const profileFormSchema = z.object({
  hourly_rate: z.string()
    .refine(value => !isNaN(Number(value)), { message: 'Hourly rate must be a number' })
    .refine(value => Number(value) > 0, { message: 'Hourly rate must be greater than 0' }),
  years_experience: z.string()
    .refine(value => !isNaN(Number(value)), { message: 'Years of experience must be a number' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  availability: z.string().min(1, { message: 'Please specify your availability' }),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' }),
  location: z.string().min(1, { message: 'Please enter your location' }),
  first_name: z.string().min(1, { message: 'Please enter your first name' }),
  last_name: z.string().min(1, { message: 'Please enter your last name' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfessionalProfileForm = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [newSpecialty, setNewSpecialty] = useState('');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      hourly_rate: '',
      years_experience: '',
      category: '',
      availability: '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone: profile?.phone || '',
    },
  });

  // Load existing professional data if available
  useEffect(() => {
    const loadProfessionalData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('professionals')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error loading professional data:', error);
          return;
        }
        
        if (data) {
          form.setValue('hourly_rate', data.hourly_rate?.toString() || '');
          form.setValue('years_experience', data.years_experience?.toString() || '');
          form.setValue('category', data.category || '');
          form.setValue('availability', data.availability || '');
          setSpecialties(data.specialties || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfessionalData();
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update profile information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          location: values.location,
          phone: values.phone,
          bio: values.bio,
          is_professional: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (profileError) {
        throw profileError;
      }
      
      // Check if professional entry exists
      const { data: existingPro, error: checkError } = await supabase
        .from('professionals')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // Not found error
        throw checkError;
      }
      
      // Insert or update professional information
      const professionalData = {
        id: user.id,
        category: values.category,
        hourly_rate: parseFloat(values.hourly_rate),
        years_experience: parseInt(values.years_experience),
        availability: values.availability,
        specialties,
      };
      
      if (existingPro) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('professionals')
          .update(professionalData)
          .eq('id', user.id);
        
        if (updateError) {
          throw updateError;
        }
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('professionals')
          .insert([professionalData]);
        
        if (insertError) {
          throw insertError;
        }
      }
      
      toast({
        title: "Profile updated",
        description: "Your professional profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  if (!user) {
    return <div className="text-center p-6">Please log in to access this page.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Professional Profile</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Phone Number
                    <Phone className="ml-2 h-4 w-4 text-primary" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your phone number will be visible to clients who can call you directly through our platform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell clients about yourself, your experience, and why they should hire you..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hourly_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input placeholder="50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="years_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Input placeholder="Weekdays, 9am-5pm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <Label htmlFor="specialties">Specialties</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {specialties.map((specialty, index) => (
                <div 
                  key={index} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center"
                >
                  <span className="mr-1">{specialty}</span>
                  <button 
                    type="button"
                    onClick={() => removeSpecialty(specialty)}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                id="specialties"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add a specialty..."
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={addSpecialty}
                disabled={!newSpecialty.trim()}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-muted/40 rounded-lg border border-border">
            <h3 className="text-sm font-medium flex items-center mb-2">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              Phone Calling Feature
            </h3>
            <p className="text-sm text-muted-foreground">
              By providing your phone number, clients will be able to call you directly from our platform. 
              Ensure your phone number is accurate and up-to-date.
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfessionalProfileForm;
