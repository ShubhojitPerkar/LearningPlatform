import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  teacher_id: string;
  meeting_link: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  is_recording_enabled: boolean;
  created_at: string;
  updated_at: string;
}
