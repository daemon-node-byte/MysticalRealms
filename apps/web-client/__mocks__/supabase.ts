export const supabase = {
  auth: {
    getUser: jest.fn(() =>
      Promise.resolve({ data: { user: { id: "user123" } }, error: null })
    )
  },
  from: jest.fn(() => ({
    select: jest.fn(() => Promise.resolve({ data: [], error: null })),
    insert: jest.fn(() => Promise.resolve({ data: [], error: null }))
  }))
};
export const createClient = jest.fn(() => supabase);
