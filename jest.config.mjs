import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env.development"),
});

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest/presets/default-esm", 
  testEnvironment: "node",
  verbose: false,
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: undefined,
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(spec|test).?([mc])[jt]s?(x)",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^(\\.{1,2}\/.+)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default config;