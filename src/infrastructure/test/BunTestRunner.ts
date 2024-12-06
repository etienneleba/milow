import TestRunner from "src/domain/spi/test/TestRunner.ts";
import TestResult from "src/domain/test/TestResult.ts";
import {spawnSync} from "bun";


export default class BunTestRunner implements TestRunner {
    run(testCommand: string): TestResult {
        const proc = spawnSync([testCommand]);

        return new TestResult(proc.stdout.toString(), proc.stderr.toString(), proc.exitCode);
    }

}