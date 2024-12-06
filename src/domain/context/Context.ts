import FunctionResult from "src/domain/function/FunctionResult.ts";
import ConversationItem from "src/domain/context/ConversationItem.ts";

export default class Context {

    public consversations: Array<ConversationItem> = [];

    push(functionResult: FunctionResult) {
        this.consversations.push(functionResult);
    }
}