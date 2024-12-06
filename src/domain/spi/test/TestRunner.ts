import TestResult from "src/domain/test/TestResult.ts";

export default interface TestRunner {
    run: (testCommand: string) => TestResult
}