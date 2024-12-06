import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import ReadFileFunction from "src/domain/function/functions/ReadFileFunction.ts";
import FileReader from "src/domain/spi/file/FileReader.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";
import CreateFileFunction from "src/domain/function/functions/CreateFileFunction.ts";
import ReplaceFileFunction from "src/domain/function/functions/ReplaceFileFunction.ts";

export default class FunctionResolver {

    private readonly functions: Array<FunctionCallable>
    constructor(
        fileReader: FileReader,
        fileManipulator: FileManipulator
    ) {
        this.functions = [
            new ReadFileFunction(fileReader),
            new CreateFileFunction(fileManipulator),
            new ReplaceFileFunction(fileManipulator)
        ]
    }
    resolve(name: string): FunctionCallable {
        for(const functionCallable of this.functions) {
            if(name === functionCallable.name) {
                return functionCallable
            }
        }
    }
}
