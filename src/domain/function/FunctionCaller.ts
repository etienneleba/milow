import Context from "src/domain/context/Context.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";
import FunctionResolver from "src/domain/function/FunctionResolver.ts";
import FunctionResult from "src/domain/function/FunctionResult.ts";

export default class FunctionCaller {

    constructor(
        private readonly functionResolver: FunctionResolver
    ) {
    }

    public call(context: Context, functionCalls: FunctionCall[]): Context {

        for (const functionCall of functionCalls) {
            const functionCallable = this.functionResolver.resolve(functionCall.name);
            const functionResult = functionCallable.call(functionCall.parameters);
            context.push(new FunctionResult(
                functionCall.id,
                "tool",
                functionResult
            ));
        }

        return context;
    }
}