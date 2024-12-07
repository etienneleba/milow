import FunctionCallable from "src/domain/function/functions/FunctionCallable.ts";
import UserInteraction from "src/domain/spi/user/UserInteraction.ts";

interface Parameters {
    question: string
}
export default class AskSupervisorFunction implements FunctionCallable {
    readonly name: string = "ask_supervisor";
    constructor(
        private readonly userInteraction: UserInteraction
    ) {
    }
    async call(parameters: Parameters): Promise<string> {
        return this.userInteraction.ask(parameters.question);
    }

    getSchema(): object {
        return {
            name: "ask_supervisor",
            description: "Ask a question to the supervisor when you are stuck, you need more context or the tests are green and it's time to refactor",
            parameters: {
                type: "object",
                properties: {
                    question: {
                        type: "string",
                        description: "The question you need to ask"
                    }
                },
                required: ["question"]
            }

        };
    }

}