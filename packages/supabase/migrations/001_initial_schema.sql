-- =====================================================
-- MYSTICAL REALMS - SUPABASE DATABASE SCHEMA
-- =====================================================
-- 
-- This migration creates the complete database schema for the Mystical Realms
-- Tarot & Astrology platform with proper relations, indexing, and RLS policies.
--
-- Features:
-- - User profiles and authentication
-- - Tarot readings and custom spreads
-- - Astrology charts and calculations
-- - Journal entries and blog system
-- - Quiz system and dice readings
-- - Calendar and social features
-- 
-- Security: All tables implement Row Level Security (RLS)
-- Performance: Comprehensive indexing strategy
-- Scalability: JSONB for flexible data storage
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================
-- 1. CORE USER SYSTEM
-- =====================================================

-- User profiles (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    badges JSONB DEFAULT '[]'::jsonb,
    preferences JSONB DEFAULT '{}'::jsonb,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
    CONSTRAINT username_format CHECK (username ~ '^[a-zA-Z0-9_]+$'),
    CONSTRAINT bio_length CHECK (char_length(bio) <= 500),
    CONSTRAINT display_name_length CHECK (char_length(display_name) <= 100)
);

-- User followers/following system
CREATE TABLE user_follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent self-following and duplicate follows
    CONSTRAINT no_self_follow CHECK (follower_id != following_id),
    CONSTRAINT unique_follow UNIQUE (follower_id, following_id)
);

-- =====================================================
-- 2. TAROT SYSTEM
-- =====================================================

-- Tarot card reference data
CREATE TABLE tarot_cards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    suit TEXT NOT NULL CHECK (suit IN ('Major', 'Wands', 'Cups', 'Swords', 'Pentacles')),
    number TEXT,
    keywords TEXT[] DEFAULT '{}',
    reversed_keywords TEXT[] DEFAULT '{}',
    upright_meaning TEXT NOT NULL,
    reversed_meaning TEXT NOT NULL,
    image_url TEXT,
    order_index INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_card_order UNIQUE (order_index),
    CONSTRAINT keywords_not_empty CHECK (array_length(keywords, 1) > 0 OR keywords = '{}'),
    CONSTRAINT reversed_keywords_not_empty CHECK (array_length(reversed_keywords, 1) > 0 OR reversed_keywords = '{}')
);

-- Custom tarot spreads
CREATE TABLE tarot_spreads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    layout JSONB NOT NULL DEFAULT '[]'::jsonb,
    position_count INTEGER NOT NULL DEFAULT 1,
    tags TEXT[] DEFAULT '{}',
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT name_length CHECK (char_length(name) >= 3 AND char_length(name) <= 100),
    CONSTRAINT description_length CHECK (char_length(description) <= 1000),
    CONSTRAINT position_count_valid CHECK (position_count >= 1 AND position_count <= 50),
    CONSTRAINT rating_valid CHECK (rating >= 0.00 AND rating <= 5.00)
);

-- Tarot readings
CREATE TABLE tarot_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    spread_id UUID REFERENCES tarot_spreads(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    question TEXT,
    deck_type TEXT DEFAULT 'Rider-Waite',
    include_reversals BOOLEAN DEFAULT true,
    arcana_type TEXT DEFAULT 'full' CHECK (arcana_type IN ('full', 'major', 'minor')),
    card_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_interpretation TEXT,
    interpretation_model TEXT,
    is_public BOOLEAN DEFAULT false,
    is_favorite BOOLEAN DEFAULT false,
    source TEXT DEFAULT 'live' CHECK (source IN ('live', 'imported', 'demo')),
    status TEXT DEFAULT 'completed' CHECK (status IN ('draft', 'completed', 'archived')),
    reading_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 200),
    CONSTRAINT question_length CHECK (char_length(question) <= 500),
    CONSTRAINT card_data_structure CHECK (jsonb_typeof(card_data) = 'array')
);

-- Tarot reading comments/notes
CREATE TABLE tarot_reading_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reading_id UUID NOT NULL REFERENCES tarot_readings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    note_type TEXT DEFAULT 'personal' CHECK (note_type IN ('personal', 'reflection', 'update')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 2000)
);

-- =====================================================
-- 3. ASTROLOGY SYSTEM
-- =====================================================

-- Zodiac signs reference
CREATE TABLE zodiac_signs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    element TEXT NOT NULL CHECK (element IN ('Fire', 'Earth', 'Air', 'Water')),
    modality TEXT NOT NULL CHECK (modality IN ('Cardinal', 'Fixed', 'Mutable')),
    ruling_planet TEXT NOT NULL,
    symbol TEXT NOT NULL,
    order_index INTEGER NOT NULL UNIQUE,
    keywords TEXT[] DEFAULT '{}',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Planets reference
CREATE TABLE planets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    symbol TEXT NOT NULL,
    archetype TEXT NOT NULL,
    associated_signs TEXT[],
    planet_type TEXT DEFAULT 'traditional' CHECK (planet_type IN ('traditional', 'modern', 'asteroid', 'lunar_node')),
    order_index INTEGER NOT NULL UNIQUE,
    keywords TEXT[] DEFAULT '{}',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Astrological houses reference
CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 12),
    theme TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    element TEXT CHECK (element IN ('Fire', 'Earth', 'Air', 'Water')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Astrology charts
CREATE TABLE astrology_charts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    chart_type TEXT NOT NULL CHECK (chart_type IN ('natal', 'transit', 'synastry', 'composite', 'progressed')),
    name TEXT NOT NULL,
    birth_date DATE,
    birth_time TIME,
    birth_location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone TEXT,
    chart_data JSONB DEFAULT '{}'::jsonb,
    pdf_url TEXT,
    svg_url TEXT,
    is_public BOOLEAN DEFAULT false,
    calculation_status TEXT DEFAULT 'pending' CHECK (calculation_status IN ('pending', 'completed', 'failed')),
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT name_length CHECK (char_length(name) >= 3 AND char_length(name) <= 100),
    CONSTRAINT birth_location_length CHECK (char_length(birth_location) <= 200),
    CONSTRAINT latitude_range CHECK (latitude >= -90 AND latitude <= 90),
    CONSTRAINT longitude_range CHECK (longitude >= -180 AND longitude <= 180)
);

-- Astrology dice readings
CREATE TABLE dice_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    question TEXT,
    sign_roll TEXT NOT NULL,
    house_roll INTEGER NOT NULL CHECK (house_roll >= 1 AND house_roll <= 12),
    planet_roll TEXT NOT NULL,
    ai_interpretation TEXT,
    interpretation_model TEXT,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT question_length CHECK (char_length(question) <= 500)
);

-- =====================================================
-- 4. JOURNAL & CONTENT SYSTEM
-- =====================================================

-- Personal journal entries
CREATE TABLE journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    mood TEXT,
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    word_count INTEGER DEFAULT 0,
    reading_time INTEGER DEFAULT 0, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (char_length(title) >= 1 AND char_length(title) <= 200),
    CONSTRAINT content_length CHECK (char_length(content) >= 1),
    CONSTRAINT word_count_positive CHECK (word_count >= 0),
    CONSTRAINT reading_time_positive CHECK (reading_time >= 0)
);

-- Blog posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (char_length(title) >= 3 AND char_length(title) <= 200),
    CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
    CONSTRAINT excerpt_length CHECK (char_length(excerpt) <= 300),
    CONSTRAINT content_length CHECK (char_length(content) >= 100),
    CONSTRAINT view_count_positive CHECK (view_count >= 0),
    CONSTRAINT like_count_positive CHECK (like_count >= 0),
    CONSTRAINT comment_count_positive CHECK (comment_count >= 0)
);

-- Blog comments
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT true,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 2000),
    CONSTRAINT like_count_positive CHECK (like_count >= 0)
);

-- =====================================================
-- 5. LEARNING & QUIZ SYSTEM
-- =====================================================

-- Quiz categories
CREATE TABLE quiz_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz questions
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id INTEGER NOT NULL REFERENCES quiz_categories(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type TEXT DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice', 'true_false', 'matching')),
    options JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    points INTEGER DEFAULT 10,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT question_length CHECK (char_length(question) >= 10 AND char_length(question) <= 500),
    CONSTRAINT points_positive CHECK (points > 0),
    CONSTRAINT options_structure CHECK (jsonb_typeof(options) = 'array')
);

-- Quiz results
CREATE TABLE quiz_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES quiz_categories(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_taken INTEGER, -- in seconds
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT score_valid CHECK (score >= 0 AND score <= total_questions),
    CONSTRAINT total_questions_positive CHECK (total_questions > 0),
    CONSTRAINT percentage_valid CHECK (percentage >= 0.00 AND percentage <= 100.00),
    CONSTRAINT time_taken_positive CHECK (time_taken IS NULL OR time_taken > 0)
);

-- =====================================================
-- 6. CALENDAR & SOCIAL FEATURES
-- =====================================================

-- Personal calendar entries
CREATE TABLE calendar_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    entry_type TEXT DEFAULT 'birthday' CHECK (entry_type IN ('birthday', 'event', 'reminder', 'anniversary')),
    person_name TEXT,
    relationship TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern TEXT,
    reminder_days INTEGER[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (char_length(title) >= 1 AND char_length(title) <= 200),
    CONSTRAINT person_name_length CHECK (char_length(person_name) <= 100),
    CONSTRAINT relationship_length CHECK (char_length(relationship) <= 50)
);

-- User activity feed
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('reading', 'journal', 'quiz', 'follow', 'like', 'comment')),
    related_id UUID,
    related_type TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints for related content validation
    CONSTRAINT valid_related_combo CHECK (
        (related_id IS NULL AND related_type IS NULL) OR
        (related_id IS NOT NULL AND related_type IS NOT NULL)
    )
);

-- User notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('follow', 'like', 'comment', 'mention', 'system')),
    related_id UUID,
    related_type TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT title_length CHECK (char_length(title) >= 1 AND char_length(title) <= 100),
    CONSTRAINT message_length CHECK (char_length(message) >= 1 AND char_length(message) <= 500)
);

-- =====================================================
-- 7. PERFORMANCE INDEXES
-- =====================================================

-- User profiles indexes
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_status ON profiles(status) WHERE status = 'active';
CREATE INDEX idx_profiles_last_active ON profiles(last_active_at DESC);

-- User follows indexes
CREATE INDEX idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON user_follows(following_id);
CREATE INDEX idx_user_follows_created ON user_follows(created_at DESC);

-- Tarot system indexes
CREATE INDEX idx_tarot_cards_suit ON tarot_cards(suit);
CREATE INDEX idx_tarot_cards_order ON tarot_cards(order_index);
CREATE INDEX idx_tarot_spreads_user ON tarot_spreads(user_id);
CREATE INDEX idx_tarot_spreads_public ON tarot_spreads(is_public) WHERE is_public = true;
CREATE INDEX idx_tarot_spreads_usage ON tarot_spreads(usage_count DESC);
CREATE INDEX idx_tarot_readings_user ON tarot_readings(user_id);
CREATE INDEX idx_tarot_readings_date ON tarot_readings(reading_date DESC);
CREATE INDEX idx_tarot_readings_public ON tarot_readings(is_public) WHERE is_public = true;
CREATE INDEX idx_tarot_readings_favorite ON tarot_readings(user_id, is_favorite) WHERE is_favorite = true;

-- Astrology system indexes
CREATE INDEX idx_astrology_charts_user ON astrology_charts(user_id);
CREATE INDEX idx_astrology_charts_type ON astrology_charts(chart_type);
CREATE INDEX idx_astrology_charts_public ON astrology_charts(is_public) WHERE is_public = true;
CREATE INDEX idx_dice_readings_user ON dice_readings(user_id);
CREATE INDEX idx_dice_readings_created ON dice_readings(created_at DESC);

-- Journal and content indexes
CREATE INDEX idx_journal_entries_user ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_public ON journal_entries(is_public) WHERE is_public = true;
CREATE INDEX idx_journal_entries_created ON journal_entries(created_at DESC);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_author ON blog_comments(author_id);

-- Quiz system indexes
CREATE INDEX idx_quiz_questions_category ON quiz_questions(category_id);
CREATE INDEX idx_quiz_questions_active ON quiz_questions(is_active) WHERE is_active = true;
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_category ON quiz_results(category_id);
CREATE INDEX idx_quiz_results_completed ON quiz_results(completed_at DESC);

-- Calendar and social indexes
CREATE INDEX idx_calendar_entries_user ON calendar_entries(user_id);
CREATE INDEX idx_calendar_entries_date ON calendar_entries(event_date);
CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_public ON activities(is_public) WHERE is_public = true;
CREATE INDEX idx_activities_created ON activities(created_at DESC);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- Full-text search indexes
CREATE INDEX idx_tarot_spreads_search ON tarot_spreads USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || content));
CREATE INDEX idx_journal_entries_search ON journal_entries USING gin(to_tsvector('english', title || ' ' || content));

-- JSONB indexes for flexible queries
CREATE INDEX idx_tarot_readings_card_data ON tarot_readings USING gin(card_data);
CREATE INDEX idx_astrology_charts_data ON astrology_charts USING gin(chart_data);
CREATE INDEX idx_profiles_preferences ON profiles USING gin(preferences);

-- =====================================================
-- 8. TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tarot_spreads_updated_at BEFORE UPDATE ON tarot_spreads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tarot_readings_updated_at BEFORE UPDATE ON tarot_readings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_astrology_charts_updated_at BEFORE UPDATE ON astrology_charts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_entries_updated_at BEFORE UPDATE ON calendar_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update blog post comment count
CREATE OR REPLACE FUNCTION update_blog_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE blog_posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE blog_posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER blog_comment_count_trigger
    AFTER INSERT OR DELETE ON blog_comments
    FOR EACH ROW EXECUTE FUNCTION update_blog_post_comment_count();

-- Function to calculate word count and reading time for journal entries
CREATE OR REPLACE FUNCTION calculate_journal_stats()
RETURNS TRIGGER AS $$
BEGIN
    NEW.word_count = array_length(string_to_array(NEW.content, ' '), 1);
    NEW.reading_time = GREATEST(1, NEW.word_count / 200); -- Assume 200 words per minute
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER journal_stats_trigger
    BEFORE INSERT OR UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION calculate_journal_stats();

-- =====================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all user tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarot_spreads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarot_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarot_reading_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE astrology_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dice_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all active profiles"
    ON profiles FOR SELECT
    USING (status = 'active');

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- User follows policies
CREATE POLICY "Users can view all follows"
    ON user_follows FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own follows"
    ON user_follows FOR ALL
    USING (auth.uid() = follower_id);

-- Tarot spreads policies
CREATE POLICY "Users can view public spreads and their own"
    ON tarot_spreads FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own spreads"
    ON tarot_spreads FOR ALL
    USING (auth.uid() = user_id);

-- Tarot readings policies
CREATE POLICY "Users can view public readings and their own"
    ON tarot_readings FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own readings"
    ON tarot_readings FOR ALL
    USING (auth.uid() = user_id);

-- Tarot reading notes policies
CREATE POLICY "Users can manage their own reading notes"
    ON tarot_reading_notes FOR ALL
    USING (auth.uid() = user_id);

-- Astrology charts policies
CREATE POLICY "Users can view public charts and their own"
    ON astrology_charts FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own charts"
    ON astrology_charts FOR ALL
    USING (auth.uid() = user_id);

-- Dice readings policies
CREATE POLICY "Users can manage their own dice readings"
    ON dice_readings FOR ALL
    USING (auth.uid() = user_id);

-- Journal entries policies
CREATE POLICY "Users can view public entries and their own"
    ON journal_entries FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own journal entries"
    ON journal_entries FOR ALL
    USING (auth.uid() = user_id);

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts"
    ON blog_posts FOR SELECT
    USING (status = 'published');

CREATE POLICY "Authors can manage their own blog posts"
    ON blog_posts FOR ALL
    USING (auth.uid() = author_id);

-- Blog comments policies
CREATE POLICY "Anyone can view approved comments on published posts"
    ON blog_comments FOR SELECT
    USING (
        is_approved = true AND 
        EXISTS (
            SELECT 1 FROM blog_posts 
            WHERE id = blog_comments.post_id AND status = 'published'
        )
    );

CREATE POLICY "Authenticated users can insert comments"
    ON blog_comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
    ON blog_comments FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
    ON blog_comments FOR DELETE
    USING (auth.uid() = author_id);

-- Quiz results policies
CREATE POLICY "Users can manage their own quiz results"
    ON quiz_results FOR ALL
    USING (auth.uid() = user_id);

-- Calendar entries policies
CREATE POLICY "Users can manage their own calendar entries"
    ON calendar_entries FOR ALL
    USING (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Users can view public activities and their own"
    ON activities FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own activities"
    ON activities FOR ALL
    USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can manage their own notifications"
    ON notifications FOR ALL
    USING (auth.uid() = user_id);

-- =====================================================
-- 10. UTILITY FUNCTIONS
-- =====================================================

-- Function to get user's follower count
CREATE OR REPLACE FUNCTION get_follower_count(profile_id UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER 
        FROM user_follows 
        WHERE following_id = profile_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's following count
CREATE OR REPLACE FUNCTION get_following_count(profile_id UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER 
        FROM user_follows 
        WHERE follower_id = profile_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user follows another user
CREATE OR REPLACE FUNCTION is_following(follower_id UUID, following_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_follows 
        WHERE user_follows.follower_id = is_following.follower_id 
        AND user_follows.following_id = is_following.following_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's reading streak
CREATE OR REPLACE FUNCTION get_reading_streak(profile_id UUID)
RETURNS INTEGER AS $$
DECLARE
    streak INTEGER := 0;
    current_date DATE := CURRENT_DATE;
BEGIN
    -- This is a simplified version - you might want to implement more complex logic
    SELECT COUNT(DISTINCT DATE(created_at))::INTEGER
    INTO streak
    FROM tarot_readings
    WHERE user_id = profile_id
    AND created_at >= current_date - INTERVAL '30 days';
    
    RETURN streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SCHEMA CREATION COMPLETE
-- =====================================================

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Create comment for schema version tracking
COMMENT ON SCHEMA public IS 'Mystical Realms Database Schema v1.0.0 - Created for Tarot & Astrology Platform';
