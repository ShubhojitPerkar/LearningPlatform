/*
  # Secure E-Learning Video Platform Schema

  ## Overview
  Complete database schema for a secure e-learning video platform with role-based access control,
  supporting Students, Teachers, Parents, and Admins.

  ## 1. New Tables

  ### `profiles`
  - `id` (uuid, FK to auth.users)
  - `email` (text)
  - `full_name` (text)
  - `role` (text: 'student', 'teacher', 'parent', 'admin')
  - `avatar_url` (text, nullable)
  - `phone` (text, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `meetings`
  - `id` (uuid, PK)
  - `title` (text)
  - `description` (text, nullable)
  - `teacher_id` (uuid, FK to profiles)
  - `meeting_link` (text, unique)
  - `scheduled_at` (timestamptz)
  - `duration_minutes` (integer)
  - `status` (text: 'scheduled', 'live', 'ended', 'cancelled')
  - `is_recording_enabled` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `meeting_participants`
  - `id` (uuid, PK)
  - `meeting_id` (uuid, FK to meetings)
  - `user_id` (uuid, FK to profiles)
  - `joined_at` (timestamptz, nullable)
  - `left_at` (timestamptz, nullable)
  - `status` (text: 'waiting', 'approved', 'joined', 'left', 'removed')
  - `attendance_marked` (boolean)

  ### `parent_student_links`
  - `id` (uuid, PK)
  - `parent_id` (uuid, FK to profiles)
  - `student_id` (uuid, FK to profiles)
  - `relationship` (text: 'father', 'mother', 'guardian')
  - `created_at` (timestamptz)

  ### `class_notes`
  - `id` (uuid, PK)
  - `meeting_id` (uuid, FK to meetings)
  - `title` (text)
  - `content` (text, nullable)
  - `file_url` (text, nullable)
  - `uploaded_by` (uuid, FK to profiles)
  - `created_at` (timestamptz)

  ### `recordings`
  - `id` (uuid, PK)
  - `meeting_id` (uuid, FK to meetings)
  - `title` (text)
  - `video_url` (text)
  - `duration_seconds` (integer)
  - `created_at` (timestamptz)

  ### `notifications`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles)
  - `title` (text)
  - `message` (text)
  - `type` (text: 'meeting', 'attendance', 'assignment', 'system')
  - `is_read` (boolean)
  - `created_at` (timestamptz)

  ### `security_logs`
  - `id` (uuid, PK)
  - `user_id` (uuid, FK to profiles, nullable)
  - `action` (text)
  - `ip_address` (text, nullable)
  - `user_agent` (text, nullable)
  - `status` (text: 'success', 'failed')
  - `created_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Users can read their own profile
  - Teachers can create and manage their meetings
  - Students can view meetings and join them
  - Parents can view their linked students' data
  - Admins can view all data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
  avatar_url text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  teacher_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meeting_link text UNIQUE NOT NULL,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
  is_recording_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can create meetings"
  ON meetings FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = teacher_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'teacher'
    )
  );

CREATE POLICY "Teachers can manage their meetings"
  ON meetings FOR UPDATE
  TO authenticated
  USING (auth.uid() = teacher_id)
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Users can view meetings"
  ON meetings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage all meetings"
  ON meetings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create meeting_participants table
CREATE TABLE IF NOT EXISTS meeting_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at timestamptz,
  left_at timestamptz,
  status text NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'approved', 'joined', 'left', 'removed')),
  attendance_marked boolean DEFAULT false,
  UNIQUE(meeting_id, user_id)
);

ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their participation"
  ON meeting_participants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Teachers can manage participants in their meetings"
  ON meeting_participants FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings
      WHERE meetings.id = meeting_participants.meeting_id
      AND meetings.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can join meetings"
  ON meeting_participants FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'student'
    )
  );

-- Create parent_student_links table
CREATE TABLE IF NOT EXISTS parent_student_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  relationship text NOT NULL CHECK (relationship IN ('father', 'mother', 'guardian')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view their links"
  ON parent_student_links FOR SELECT
  TO authenticated
  USING (auth.uid() = parent_id);

CREATE POLICY "Students can view their parent links"
  ON parent_student_links FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Admins can manage parent links"
  ON parent_student_links FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create class_notes table
CREATE TABLE IF NOT EXISTS class_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  file_url text,
  uploaded_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE class_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can create notes"
  ON class_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uploaded_by
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'teacher'
    )
  );

CREATE POLICY "Users can view notes"
  ON class_notes FOR SELECT
  TO authenticated
  USING (true);

-- Create recordings table
CREATE TABLE IF NOT EXISTS recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  title text NOT NULL,
  video_url text NOT NULL,
  duration_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recordings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view recordings"
  ON recordings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can create recordings"
  ON recordings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings
      WHERE meetings.id = recordings.meeting_id
      AND meetings.teacher_id = auth.uid()
    )
  );

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('meeting', 'attendance', 'assignment', 'system')),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create security_logs table
CREATE TABLE IF NOT EXISTS security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  ip_address text,
  user_agent text,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view security logs"
  ON security_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
