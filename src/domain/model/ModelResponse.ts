import FunctionCall from "src/domain/function/FunctionCall.ts";

export default class ModelResponse {
    constructor(
        public readonly message: string,
        public readonly functionCalls: FunctionCall[]
    ) {
    }
}