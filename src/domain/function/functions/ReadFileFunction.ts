import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import FunctionResult from "src/domain/function/FunctionResult.ts";
import FileReader from "src/domain/spi/file/FileReader.ts";

interface Parameters {
    path: string
};
export default class ReadFileFunction implements FunctionCallable {

    readonly name = "read_file";

    constructor(
        private fileReader: FileReader
    ) {
    }
    call(parameters: Parameters): string {
        return this.fileReader.read(parameters.path);
    }

    getSchema(): object {
        return {};
    }



}