require("@testing-library/jest-dom");

global.localStorage = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
};
