module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testTimeout: 10000,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!src/main.ts",
    "!src/requestInstance.ts",
  ],
  coveragePathIgnorePatterns: ["rollup.config.ts"],
  // coverageThreshold: {
  //   global: {
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageReporters: ["json", "lcov", "text", "clover"],
};
