import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";

interface Parameters {
  filePath: string;
  content: string;
}

export default class ReplaceFileFunction implements FunctionCallable {
  public readonly name: string = "replace_file";

  constructor(private readonly fileManipulator: FileManipulator) {}

  async call(parameters: Parameters): Promise<string> {
    this.fileManipulator.replace(parameters.filePath, parameters.content);

    return `File : ${parameters.filePath} has been replaced`;
  }

  getSchema(): object {
    return {
      name: "replace_file",
      description: "Replace the full content of a file",
      parameters: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "The path of the file",
          },
          content: {
            type: "string",
            description: "The full content of the file",
          },
        },
        required: ["filePath", "content"],
      },
    };
  }
}
