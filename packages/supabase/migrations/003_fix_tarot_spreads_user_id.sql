-- =====================================================
-- FIX TAROT SPREADS USER_ID CONSTRAINT
-- =====================================================
-- 
-- This migration fixes the user_id column in tarot_spreads table
-- to allow NULL values for public/system spreads
-- =====================================================

-- Make user_id nullable for tarot_spreads to allow public spreads
ALTER TABLE tarot_spreads 
ALTER COLUMN user_id DROP NOT NULL;

-- Update the foreign key constraint to allow NULL
-- (This is already correct, but ensuring it's properly set)
ALTER TABLE tarot_spreads 
DROP CONSTRAINT IF EXISTS tarot_spreads_user_id_fkey,
ADD CONSTRAINT tarot_spreads_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Add comment to clarify the purpose
COMMENT ON COLUMN tarot_spreads.user_id IS 'User who created the spread. NULL for public/system spreads.';

-- Verify the change
SELECT 
    column_name, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'tarot_spreads' 
AND column_name = 'user_id';
