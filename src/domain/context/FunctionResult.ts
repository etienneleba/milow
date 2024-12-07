export default class FunctionResult {
    public readonly role: string = "tool";
    constructor(
        public readonly tool_call_id: string,
        public readonly content: string
    ) {
    }


}