import FunctionResult from "src/domain/context/FunctionResult.ts";

export default interface FunctionCallable {
    readonly name: string;
    call: (parameters: object) => Promise<string>;
    getSchema: () => object;
}