import { describe, it, expect } from "bun:test";
import generatePrimeNumbers from "../src";

describe("generatePrimeNumbers", () => {
  it("should return an empty array for limit less than 2", () => {
    const result = generatePrimeNumbers(1);
    expect(result).toEqual([]);
  });

  it("should return [2] for limit = 2", () => {
    const result = generatePrimeNumbers(2);
    expect(result).toEqual([2]);
  });

  it("should return the correct prime numbers up to 10", () => {
    const result = generatePrimeNumbers(10);
    expect(result).toEqual([2, 3, 5, 7]);
  });

  it("should return the correct prime numbers up to 20", () => {
    const result = generatePrimeNumbers(20);
    expect(result).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });

  it("should handle large limits without errors", () => {
    const primes = generatePrimeNumbers(100);
    expect(primes.length).toBeGreaterThan(0);
    expect(primes.includes(97)).toBe(true);
  });
});