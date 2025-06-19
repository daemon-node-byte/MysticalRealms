// This file defines the TypeScript types for your Supabase database.
// Update this according to your Supabase schema (see docs/wiki/database_supabase.md).

export type Database = {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
  };
};
