// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://crivtzpxjivqcotidqph.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaXZ0enB4aml2cWNvdGlkcXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2ODIxMTAsImV4cCI6MjA2NTI1ODExMH0.bF053qL7vwstNyQ8wADpPNOKXcsTWft7z76wo7nPA3M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);