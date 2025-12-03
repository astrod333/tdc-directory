import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Checking environment variables...');
if (!supabaseUrl) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL is not defined.');
} else {
    console.log('NEXT_PUBLIC_SUPABASE_URL is defined.');
}

if (!supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.');
} else {
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY is defined.');
}

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables. Exiting.');
    process.exit(1);
}

console.log('Initializing Supabase client...');
try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client initialized.');

    console.log('Testing connection...');
    supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
            console.error('Connection failed:', error.message);
        } else {
            console.log('Connection successful. Session data retrieved.');
        }
    }).catch((err) => {
        console.error('Unexpected error during connection test:', err);
    });

} catch (error) {
    console.error('Failed to initialize Supabase client:', error);
}
