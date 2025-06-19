import { createClient } from "../server";

// Mock the Next.js cookies function
jest.mock("next/headers", () => ({
  cookies: jest.fn(() =>
    Promise.resolve({
      getAll: jest.fn(() => []),
      set: jest.fn()
    })
  )
}));

describe("Supabase Server Client Environment Validation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original process.env after each test
    process.env = originalEnv;
  });

  it("should throw error when NEXT_PUBLIC_SUPABASE_URL is missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-key";

    await expect(createClient()).rejects.toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should throw error when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:3000";
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    await expect(createClient()).rejects.toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should throw error when both environment variables are missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    await expect(createClient()).rejects.toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
        "Please add it to your .env.local file or environment configuration."
    );
  });

  it("should create client successfully when both environment variables are present", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:3000";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-key";

    await expect(createClient()).resolves.toBeDefined();
    const client = await createClient();
    expect(client).toBeDefined();
  });
});
