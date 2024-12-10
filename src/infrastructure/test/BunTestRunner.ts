import TestRunner from "src/domain/spi/test/TestRunner.ts";
import TestResult from "src/domain/test/TestResult.ts";
import { spawnSync } from "bun";

export default class BunTestRunner implements TestRunner {
  constructor(
    public readonly testCommand: string,
    public readonly testFilePath: string | null,
  ) {}
  run(): TestResult {
    let testCommandSplit = this.testCommand.split(" ");
    if (this.testFilePath !== null) {
      testCommandSplit.push(this.testFilePath);
    }

    const proc = spawnSync(this.testCommand.split(" "));

    return new TestResult(
      proc.stdout.toString(),
      proc.stderr.toString(),
      proc.exitCode,
    );
  }
}
