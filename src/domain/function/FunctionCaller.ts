import FunctionCall from "src/domain/function/FunctionCall.ts";
import FunctionResolver from "src/domain/function/FunctionResolver.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";

export default class FunctionCaller {

    constructor(
        private readonly functionResolver: FunctionResolver
    ) {
    }

    async call(functionCalls: FunctionCall[]): Promise<FunctionResult[]> {
        let functionResults = [];

        for (const functionCall of functionCalls) {
            const functionCallable = this.functionResolver.resolve(functionCall.name);

            const functionResult = await functionCallable.call(functionCall.parameters);
            functionResults.push(new FunctionResult(
                functionCall.id,
                functionResult,
                )
            );
        }


        return functionResults;
    }
}