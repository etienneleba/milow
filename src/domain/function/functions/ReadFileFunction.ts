import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import FileReader from "src/domain/spi/file/FileReader.ts";

interface Parameters {
    filePath: string
};
export default class ReadFileFunction implements FunctionCallable {

    readonly name = "read_file";

    constructor(
        private fileReader: FileReader
    ) {
    }
    call(parameters: Parameters): string {
        return this.fileReader.read(parameters.filePath);
    }

    getSchema(): object {
        return {
            name: "read_file",
            description: "Read a file of the project",
            parameters: {
                type: "object",
                properties: {
                    filePath: {
                        type: "string",
                        description: "The path of the file"
                    }
                },
                required: ["filePath"]
            }

        };
    }



}