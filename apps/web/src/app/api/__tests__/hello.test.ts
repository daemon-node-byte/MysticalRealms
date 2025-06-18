// Dummy API handler for demonstration
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "hello" });
};

// Mocking node-mocks-http for API route testing
import { createMocks } from "node-mocks-http";

test("returns hello", async () => {
  const { req, res } = createMocks({ method: "GET" });
  await handler(req, res);
  expect(res._getStatusCode()).toBe(200);
});
