const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"]
};
export default config;
