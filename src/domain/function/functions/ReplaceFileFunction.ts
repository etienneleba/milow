import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";

interface Parameters {
    path: string;
    content: string;
}

export default class ReplaceFileFunction implements FunctionCallable {

    public readonly name: string = "replace_file";
    constructor(
        private readonly fileManipulator: FileManipulator
    ) {
    }
    call(parameters: Parameters): string {
        this.fileManipulator.replace(parameters.path, parameters.content);

        return `File : ${parameters.path} has been replaced`
    }

    getSchema(): object {
        return undefined;
    }

}