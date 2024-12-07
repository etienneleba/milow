import FunctionCall from "src/domain/function/FunctionCall.ts";


export default class AssistantToolCalls  {
    readonly role: string = "assistant";
    private readonly _content: string;

    constructor(
        public readonly functionCalls: FunctionCall[]
    ) {
    }


    get content(): string {
        for (const functionCall of this.functionCalls) {
            return [
                "-------",
                "id : " + functionCall.id,
                "name : " + functionCall.name,
                "parameters" + functionCall.parameters
            ].join("\n")
        }
    }
}