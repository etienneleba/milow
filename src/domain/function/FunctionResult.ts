import ConversationItem from "src/domain/context/ConversationItem.ts";

export default class FunctionResult implements ConversationItem{
    constructor(
        public readonly id: string,
        public readonly role: string,
        public readonly content: string
    ) {
    }


}