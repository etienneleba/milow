import {expect, test} from "bun:test";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import TestResult from "src/domain/test/TestResult.ts";

test("should run a command", async () => {
  const testRunner = new BunTestRunner("ls");
  const testResult = testRunner.run();
  expect(testResult).toBeInstanceOf(TestResult);
});