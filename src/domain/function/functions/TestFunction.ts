import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import ConfigProvider from "src/domain/config/ConfigProvider.ts";

interface Parameters {
}
export default class TestFunction implements FunctionCallable {

    readonly name: string = "test_function";

    constructor(
        private readonly testRunner: TestRunner,
        private readonly configProvider: ConfigProvider,
    ) {
    }
    call(parameters: Parameters): string {
        return this.testRunner.run(this.configProvider.testCommand);
    }

    getSchema(): object {
        return {};
    }



}