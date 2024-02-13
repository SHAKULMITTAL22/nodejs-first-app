// Test generated by RoostGPT for test aman12Feb using AI Type Open AI and AI Model gpt-4


const features = require('./features');

describe("generateLovePercent method", () => {

  test("should return a string", () => {
    expect(typeof features.generateLovePercent()).toBe('string');
  });

  test("should return a percentage", () => {
    expect(features.generateLovePercent()).toMatch(/\d+%$/);
  });

  test("should return a percentage between 0 and 100", () => {
    const percent = parseInt(features.generateLovePercent().replace('%', ''), 10);
    expect(percent).toBeGreaterThanOrEqual(0);
    expect(percent).toBeLessThanOrEqual(100);
  });

});
