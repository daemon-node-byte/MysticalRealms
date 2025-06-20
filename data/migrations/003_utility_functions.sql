-- =====================================================
-- MYSTICAL REALMS - ADDITIONAL SQL UTILITIES
-- =====================================================
-- 
-- This file contains additional utility functions and queries
-- for enhanced development, debugging, and maintenance.
-- Run these after the main schema migrations.
-- =====================================================

-- =====================================================
-- 1. DEVELOPMENT UTILITIES
-- =====================================================

-- Function to reset user data (development only)
CREATE OR REPLACE FUNCTION reset_user_data(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Only allow in development environment
    IF current_setting('app.environment', true) != 'development' THEN
        RAISE EXCEPTION 'This function can only be run in development environment';
    END IF;
    
    -- Delete user data in correct order to avoid foreign key violations
    DELETE FROM notifications WHERE user_id = user_uuid;
    DELETE FROM activities WHERE user_id = user_uuid;
    DELETE FROM calendar_entries WHERE user_id = user_uuid;
    DELETE FROM quiz_results WHERE user_id = user_uuid;
    DELETE FROM blog_comments WHERE author_id = user_uuid;
    DELETE FROM blog_posts WHERE author_id = user_uuid;
    DELETE FROM journal_entries WHERE user_id = user_uuid;
    DELETE FROM dice_readings WHERE user_id = user_uuid;
    DELETE FROM astrology_charts WHERE user_id = user_uuid;
    DELETE FROM tarot_reading_notes WHERE user_id = user_uuid;
    DELETE FROM tarot_readings WHERE user_id = user_uuid;
    DELETE FROM tarot_spreads WHERE user_id = user_uuid;
    DELETE FROM user_follows WHERE follower_id = user_uuid OR following_id = user_uuid;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate sample data for testing
CREATE OR REPLACE FUNCTION generate_sample_data(user_uuid UUID, reading_count INTEGER DEFAULT 10)
RETURNS BOOLEAN AS $$
DECLARE
    i INTEGER;
    card_ids INTEGER[] := ARRAY[1,2,3,4,5,15,16,17,18,19,35,36,37,38,39];
    questions TEXT[] := ARRAY[
        'What does my future hold?',
        'How can I improve my relationships?',
        'What should I focus on this month?',
        'What obstacles should I be aware of?',
        'How can I achieve my goals?'
    ];
BEGIN
    IF current_setting('app.environment', true) != 'development' THEN
        RAISE EXCEPTION 'This function can only be run in development environment';
    END IF;
    
    -- Generate sample tarot readings
    FOR i IN 1..reading_count LOOP
        INSERT INTO tarot_readings (
            user_id,
            title,
            question,
            deck_type,
            card_data
        ) VALUES (
            user_uuid,
            'Sample Reading ' || i,
            questions[((i-1) % array_length(questions, 1)) + 1],
            'Rider-Waite',
            jsonb_build_array(
                jsonb_build_object(
                    'position', 1,
                    'card_id', card_ids[((i-1) % array_length(card_ids, 1)) + 1],
                    'is_reversed', (i % 3 = 0),
                    'interpretation', 'Sample interpretation for position ' || i
                )
            )
        );
    END LOOP;
    
    -- Generate sample journal entries
    FOR i IN 1..5 LOOP
        INSERT INTO journal_entries (
            user_id,
            title,
            content,
            tags
        ) VALUES (
            user_uuid,
            'Sample Journal Entry ' || i,
            'This is a sample journal entry with some mystical insights and reflections on recent experiences. The journey of self-discovery continues...',
            ARRAY['mystical', 'reflection', 'sample']
        );
    END LOOP;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 2. DEBUGGING UTILITIES
-- =====================================================

-- Function to get comprehensive user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
    metric TEXT,
    count INTEGER,
    details JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 'tarot_readings'::TEXT, COUNT(*)::INTEGER, 
           jsonb_build_object(
               'public_count', COUNT(*) FILTER (WHERE is_public = true),
               'favorite_count', COUNT(*) FILTER (WHERE is_favorite = true),
               'latest', MAX(created_at)
           )
    FROM tarot_readings WHERE user_id = user_uuid
    
    UNION ALL
    
    SELECT 'journal_entries'::TEXT, COUNT(*)::INTEGER,
           jsonb_build_object(
               'public_count', COUNT(*) FILTER (WHERE is_public = true),
               'total_words', SUM(word_count),
               'latest', MAX(created_at)
           )
    FROM journal_entries WHERE user_id = user_uuid
    
    UNION ALL
    
    SELECT 'astrology_charts'::TEXT, COUNT(*)::INTEGER,
           jsonb_build_object(
               'completed', COUNT(*) FILTER (WHERE calculation_status = 'completed'),
               'pending', COUNT(*) FILTER (WHERE calculation_status = 'pending'),
               'chart_types', jsonb_agg(DISTINCT chart_type)
           )
    FROM astrology_charts WHERE user_id = user_uuid
    
    UNION ALL
    
    SELECT 'followers'::TEXT, COUNT(*)::INTEGER,
           jsonb_build_object('latest_follow', MAX(created_at))
    FROM user_follows WHERE following_id = user_uuid
    
    UNION ALL
    
    SELECT 'following'::TEXT, COUNT(*)::INTEGER,
           jsonb_build_object('latest_follow', MAX(created_at))
    FROM user_follows WHERE follower_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to analyze tarot card usage patterns
CREATE OR REPLACE FUNCTION analyze_card_usage(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    card_name TEXT,
    suit TEXT,
    draw_count BIGINT,
    reversed_count BIGINT,
    upright_percentage DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tc.name,
        tc.suit,
        COUNT(*) as draw_count,
        COUNT(*) FILTER (WHERE (cards.value->>'is_reversed')::boolean = true) as reversed_count,
        ROUND(
            (COUNT(*) FILTER (WHERE (cards.value->>'is_reversed')::boolean = false) * 100.0 / COUNT(*))::decimal, 
            2
        ) as upright_percentage
    FROM tarot_readings tr,
         jsonb_array_elements(tr.card_data) as cards,
         tarot_cards tc
    WHERE (cards.value->>'card_id')::integer = tc.id
      AND tr.created_at >= NOW() - (days_back || ' days')::interval
    GROUP BY tc.id, tc.name, tc.suit
    ORDER BY draw_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. MAINTENANCE UTILITIES
-- =====================================================

-- Function to cleanup old activities
CREATE OR REPLACE FUNCTION cleanup_old_activities(days_to_keep INTEGER DEFAULT 180)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM activities 
    WHERE created_at < NOW() - (days_to_keep || ' days')::interval
      AND activity_type NOT IN ('follow', 'quiz'); -- Keep some activities longer
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Update statistics
    ANALYZE activities;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user engagement scores
CREATE OR REPLACE FUNCTION update_engagement_scores()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE profiles 
    SET preferences = jsonb_set(
        COALESCE(preferences, '{}'::jsonb),
        '{engagement_score}',
        to_jsonb(
            COALESCE((
                SELECT 
                    COUNT(*) * 1.0 + 
                    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') * 2.0 +
                    COUNT(*) FILTER (WHERE is_public = true) * 0.5
                FROM activities 
                WHERE user_id = profiles.id
            ), 0)
        )
    )
    WHERE last_active_at >= NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to vacuum and analyze all tables
CREATE OR REPLACE FUNCTION maintenance_vacuum_analyze()
RETURNS TEXT AS $$
DECLARE
    table_record RECORD;
    result_text TEXT := '';
BEGIN
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT LIKE '%_old'
    LOOP
        EXECUTE 'VACUUM ANALYZE ' || quote_ident(table_record.tablename);
        result_text := result_text || table_record.tablename || ' ';
    END LOOP;
    
    RETURN 'Vacuumed and analyzed: ' || result_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4. MONITORING QUERIES
-- =====================================================

-- View for database health monitoring
CREATE OR REPLACE VIEW database_health AS
SELECT 
    'database_size' as metric,
    pg_size_pretty(pg_database_size(current_database())) as value,
    current_timestamp as checked_at
    
UNION ALL

SELECT 
    'active_connections' as metric,
    COUNT(*)::text as value,
    current_timestamp as checked_at
FROM pg_stat_activity 
WHERE state = 'active'

UNION ALL

SELECT 
    'total_users' as metric,
    COUNT(*)::text as value,
    current_timestamp as checked_at
FROM profiles

UNION ALL

SELECT 
    'active_users_30d' as metric,
    COUNT(*)::text as value,
    current_timestamp as checked_at
FROM profiles 
WHERE last_active_at >= NOW() - INTERVAL '30 days';

-- View for popular content
CREATE OR REPLACE VIEW popular_content AS
WITH ranked_content AS (
    -- Tarot readings
    SELECT 
        'tarot_reading' as content_type,
        id,
        title,
        created_at,
        CASE WHEN is_favorite THEN 10 ELSE 1 END +
        CASE WHEN is_public THEN 5 ELSE 0 END as score
    FROM tarot_readings
    WHERE created_at >= NOW() - INTERVAL '30 days'
    
    UNION ALL
    
    -- Blog posts
    SELECT 
        'blog_post' as content_type,
        id,
        title,
        published_at as created_at,
        view_count + (like_count * 2) + (comment_count * 3) as score
    FROM blog_posts
    WHERE status = 'published' 
    AND published_at >= NOW() - INTERVAL '30 days'
    
    UNION ALL
    
    -- Tarot spreads
    SELECT 
        'tarot_spread' as content_type,
        id,
        name as title,
        created_at,
        usage_count + (rating * 10) as score
    FROM tarot_spreads
    WHERE is_public = true 
    AND created_at >= NOW() - INTERVAL '30 days'
)
SELECT *
FROM ranked_content
ORDER BY score DESC, created_at DESC;

-- =====================================================
-- 5. PERFORMANCE ANALYSIS
-- =====================================================

-- Function to analyze slow queries
CREATE OR REPLACE FUNCTION analyze_slow_queries(min_calls INTEGER DEFAULT 100)
RETURNS TABLE (
    query_text TEXT,
    total_calls BIGINT,
    avg_time_ms NUMERIC,
    total_time_ms NUMERIC,
    hit_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        LEFT(query, 100) as query_text,
        calls as total_calls,
        ROUND((total_time/calls)::numeric, 2) as avg_time_ms,
        ROUND(total_time::numeric, 2) as total_time_ms,
        ROUND((100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0))::numeric, 2) AS hit_percentage
    FROM pg_stat_statements 
    WHERE calls >= min_calls
    ORDER BY total_time DESC 
    LIMIT 20;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check index usage
CREATE OR REPLACE FUNCTION check_unused_indexes()
RETURNS TABLE (
    schema_name TEXT,
    table_name TEXT,
    index_name TEXT,
    index_size TEXT,
    times_used BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        schemaname::TEXT,
        tablename::TEXT,
        indexname::TEXT,
        pg_size_pretty(pg_relation_size(indexrelid))::TEXT as index_size,
        idx_scan as times_used
    FROM pg_stat_user_indexes 
    WHERE idx_scan < 10  -- Less than 10 uses
    AND schemaname = 'public'
    ORDER BY pg_relation_size(indexrelid) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 6. BACKUP AND RECOVERY HELPERS
-- =====================================================

-- Function to export user data (GDPR compliance)
CREATE OR REPLACE FUNCTION export_user_data(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    user_data JSONB := '{}'::jsonb;
BEGIN
    -- Verify user access
    IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = user_uuid AND id = auth.uid()) THEN
        RAISE EXCEPTION 'Access denied or user not found';
    END IF;
    
    -- Collect all user data
    SELECT jsonb_build_object(
        'profile', (SELECT row_to_json(p) FROM profiles p WHERE id = user_uuid),
        'tarot_readings', (SELECT jsonb_agg(tr) FROM tarot_readings tr WHERE user_id = user_uuid),
        'journal_entries', (SELECT jsonb_agg(je) FROM journal_entries je WHERE user_id = user_uuid),
        'astrology_charts', (SELECT jsonb_agg(ac) FROM astrology_charts ac WHERE user_id = user_uuid),
        'calendar_entries', (SELECT jsonb_agg(ce) FROM calendar_entries ce WHERE user_id = user_uuid),
        'quiz_results', (SELECT jsonb_agg(qr) FROM quiz_results qr WHERE user_id = user_uuid),
        'exported_at', NOW()
    ) INTO user_data;
    
    RETURN user_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- UTILITY FUNCTIONS COMPLETE
-- =====================================================

COMMENT ON SCHEMA public IS 'Mystical Realms Database Schema v1.1.0 - With Enhanced Utilities';
