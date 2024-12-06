import FunctionResult from "src/domain/function/FunctionResult.ts";

export default interface FunctionCallable {
    readonly name: string;
    call: (parameters: object) => string;
    getSchema: () => object;
}