import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import ConfigProvider from "src/domain/config/ConfigProvider.ts";
import TestRunner from "src/domain/spi/test/TestRunner.ts";

interface Parameters {
}
export default class TestFunction implements FunctionCallable {

    readonly name: string = "test";

    constructor(
        private readonly testRunner: TestRunner,
    ) {
    }
    call(parameters: Parameters): string {
        const testResult = this.testRunner.run();
        return [
            "stdout :",
            testResult.stdout,
            "stderr :",
            testResult.stderr,
            "exist : ",
            testResult.exitCode
        ].join("\n");

    }

    getSchema(): object {
        return {};
    }



}