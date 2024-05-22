import { createClient } from '@supabase/supabase-js';

// Reemplaza 'YOUR_SUPABASE_URL' y 'YOUR_SUPABASE_KEY' con tus propias credenciales de Supabase
const supabaseUrl = 'https://svaixygzaxgxymjxnwsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2YWl4eWd6YXhneHltanhud3NrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjM3MTc1MCwiZXhwIjoyMDMxOTQ3NzUwfQ.OFE617VXM1SQxx9pvfzDkhD4pw1007jf4giDMRNQM58';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
