import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import TestRunner from "src/domain/spi/test/TestRunner.ts";

interface Parameters {}

export default class TestFunction implements FunctionCallable {
  readonly name: string = "test";

  constructor(private readonly testRunner: TestRunner) {}

  async call(parameters: Parameters): Promise<string> {
    const testResult = this.testRunner.run();
    return [
      "stdout :",
      testResult.stdout,
      "stderr :",
      testResult.stderr,
      "exist : ",
      testResult.exitCode,
    ].join("\n");
  }

  getSchema(): object {
    return {
      name: "test",
      description: "Run the test of the project. Return the test result",
      parameters: {
        type: "object",
        properties: {
          filter: {
            type: "string",
            description: "The path of the test file",
          },
        }
      },
    };
  }
}
