// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://odzlobveyeynryqseite.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kemxvYnZleWV5bnJ5cXNlaXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMDg1NjUsImV4cCI6MjA1NjY4NDU2NX0.oHOEK0hLtn3AOWaGgnvZAG4uoBz7SnEGpq6tbq30wFs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);