import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";

interface Parameters {
  filePath: string;
  content: string;
}

export default class CreateFileFunction implements FunctionCallable {
  public readonly name: string = "create_file";

  constructor(private readonly fileManipulator: FileManipulator) {}

  async call(parameters: Parameters): Promise<string> {
    this.fileManipulator.create(parameters.filePath, parameters.content);

    return `${parameters.filePath} has been created`;
  }

  getSchema(): object {
    return {
      name: "create_file",
      description: "Create a file with some content inside",
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
