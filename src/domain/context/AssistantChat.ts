export default class AssistantChat{
    public readonly role: string = "assistant";

    constructor(
        public readonly content: string
    ) {
    }
}