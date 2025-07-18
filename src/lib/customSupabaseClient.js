import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://crixrsaggnfyibivwrzq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaXhyc2FnZ25meWliaXZ3cnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTEwODgsImV4cCI6MjA2Nzk2NzA4OH0.5JrqNcnRso3pEN-pQstMP0lA0q6B9ONKQKywSNx-NSI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);