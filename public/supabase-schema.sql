-- WormGPT Supabase Database Schema
-- Run this in Supabase SQL Editor to create the necessary tables

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'anonymous',
    title TEXT NOT NULL DEFAULT 'New Chat',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'model')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles Table (For Credit System)
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY,
    plan_type TEXT NOT NULL DEFAULT 'none', -- 'none', 'starter', 'pro', 'elite'
    daily_limit INTEGER NOT NULL DEFAULT 0, -- No access by default
    credits_used INTEGER NOT NULL DEFAULT 0,
    last_active_date DATE DEFAULT CURRENT_DATE,
    plan_expiry TIMESTAMPTZ, -- Null means no expiry (or limited by plan logic)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Enable Row Level Security (optional - disable if you want anonymous access)
-- ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (if RLS is enabled)
-- CREATE POLICY "Allow all operations" ON chat_sessions FOR ALL USING (true);
-- CREATE POLICY "Allow all operations" ON messages FOR ALL USING (true);
-- CREATE POLICY "Allow all operations" ON user_profiles FOR ALL USING (true);
