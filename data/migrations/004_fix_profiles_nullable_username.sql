-- Fix profiles table to allow NULL username for initial signup
-- Users will complete username during profile setup

ALTER TABLE profiles 
ALTER COLUMN username DROP NOT NULL;

-- Update the constraint to only check length when username is not NULL
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS username_length;

ALTER TABLE profiles 
ADD CONSTRAINT username_length 
CHECK (username IS NULL OR (char_length(username) >= 3 AND char_length(username) <= 30));

-- Update the format constraint to only check when username is not NULL
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS username_format;

ALTER TABLE profiles 
ADD CONSTRAINT username_format 
CHECK (username IS NULL OR (username ~ '^[a-zA-Z0-9_]+$'));
