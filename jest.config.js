const tsPreset = require("ts-jest/jest-preset");
const mongodbPreset = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
