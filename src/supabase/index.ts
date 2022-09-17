import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xsirlwdiqebswffkrqky.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaXJsd2RpcWVic3dmZmtycWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0Mjg2ODYsImV4cCI6MTk3OTAwNDY4Nn0.lEO15o7dRjbbwoU3Cni49uvti8FbETduIfLWjPk6-WE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
