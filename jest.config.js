const path = require("path");
const tsPreset = require("ts-jest/jest-preset");
const mongodbPreset = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  //preset: "@shelf/jest-mongodb",
  // testEnvironment: path.join(
  //   __dirname,
  //   "src/prisma",
  //   "prisma-test-environment.js"
  // ),
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["js", "json", "ts"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
