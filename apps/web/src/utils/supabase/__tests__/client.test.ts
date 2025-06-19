import { createClient } from "../client";

describe("Supabase Client Environment Validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original process.env after each test
    process.env = originalEnv;
  });

  it("should throw error when NEXT_PUBLIC_SUPABASE_URL is missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-key";

    expect(() => createClient()).toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should throw error when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:3000";
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(() => createClient()).toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should throw error when both environment variables are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    expect(() => createClient()).toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should create client successfully when both environment variables are present", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:3000";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-key";

    expect(() => createClient()).not.toThrow();
    const client = createClient();
    expect(client).toBeDefined();
  });
});
