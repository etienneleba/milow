import TestRunner from "src/domain/spi/test/TestRunner.ts";
import TestResult from "src/domain/test/TestResult.ts";
import {spawnSync} from "bun";


export default class BunTestRunner implements TestRunner {
    constructor(
        public readonly testCommand: string
    ) {
    }
    run(): TestResult {
        const proc = spawnSync(this.testCommand.split(" "));

        return new TestResult(proc.stdout.toString(), proc.stderr.toString(), proc.exitCode);
    }

}