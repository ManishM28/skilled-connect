
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  is_professional: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone?: string, isProfessional?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isProfessional: boolean;
  becomeProvider: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function getInitialSession() {
      setLoading(true);
      
      // Get session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        // Fetch user profile
        const { data, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(data);
        }
      }
      
      setLoading(false);
    }

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        
        if (session?.user) {
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfile(data);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Successfully signed in",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone?: string, isProfessional = false) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone || null,
            is_professional: isProfessional,
          },
        },
      });

      if (error) throw error;
      
      // If user is a professional, create a record in the professionals table
      if (isProfessional) {
        // This will be handled by a trigger after the user confirms their email
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account. After confirmation, you'll be ready to offer your services!",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Become a service provider
  const becomeProvider = async () => {
    try {
      if (!user) throw new Error("You must be logged in to become a provider");
      
      // Update the profile to indicate they're a professional
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_professional: true })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Create a record in the professionals table
      const { error: proError } = await supabase
        .from('professionals')
        .insert({
          id: user.id,
          category: 'other',
          hourly_rate: 0,
          specialties: [],
        });
      
      if (proError) throw proError;
      
      // Update the local state
      setProfile(prev => prev ? {...prev, is_professional: true} : null);
      
      toast({
        title: "Success!",
        description: "You are now registered as a service provider.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error becoming provider:', error);
    }
  };

  const value = {
    session,
    user,
    profile,
    signIn,
    signUp,
    signOut,
    loading,
    isProfessional: profile?.is_professional || false,
    becomeProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
