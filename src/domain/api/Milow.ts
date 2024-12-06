import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import FunctionCaller from "src/domain/function/FunctionCaller.ts";
import {sleepSync} from "bun";
import FunctionResolver from "src/domain/function/FunctionResolver.ts";
import FileReader from "src/domain/spi/file/FileReader.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";

export default class Milow {
    constructor(
        private readonly model: Model,
        private readonly fileReader: FileReader,
        private readonly fileManipulator: FileManipulator
    ) {
        this.model = model
    }
    fixTests() {
        let context = new Context();

        const functionCaller = new FunctionCaller(new FunctionResolver(
            this.fileReader,
            this.fileManipulator
        ));

        while(true) {
            const modelResponse = this.model.call(context);

            console.log(modelResponse.message);

            context = functionCaller.call(context, modelResponse.functionCalls);

            for (const conversationItem of context.consversations) {
                console.log("--------------")
                console.log(conversationItem.role + " : " + conversationItem.content);
            }

            sleepSync(5000);
        }



    }
}
