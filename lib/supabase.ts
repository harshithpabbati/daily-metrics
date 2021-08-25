import { createClient } from '@supabase/supabase-js';

const url: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// eslint-disable-next-line import/no-mutable-exports
let supabase: any;
if (url !== undefined && key !== undefined) supabase = createClient(url, key);

export default supabase;
